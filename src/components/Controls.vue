<template>
    <div class="controls __above-disable-layer">
        <span class="status">Status: <b>{{status.text}}</b></span>
        <span class="control-buttons">
            <button v-show="!computingIsRunning" class="btn btn-success" :disabled="!getIsValidParams" v-on:click="start">
                <i class="fas fa-play"></i> Start run
            </button>
            <button v-show="computingIsRunning" class="btn btn-danger" v-on:click="stop">
                <i class="fas fa-stop"></i> Cancel run
            </button>
        </span>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { WorkerManager } from '@/computing/WorkerManager.js';
import IterativeMethodWorker from '@/computing/IterativeMethodWorker.js';
import { getDbFileContent } from "@/services/fileReader";

export default {
    data() {
        return {
            status: this.$store.getters.getComputingStatus,
            params: this.$store.state.inputParams.params
        }
    },
    computed: {
        ...mapGetters([
            'getIsValidParams',
            'getSelectedFile',
            'computingIsRunning',
            'selectedMethodId'
        ])
    },
    mounted () {
        this.workerManager = new WorkerManager(this, IterativeMethodWorker);

        this.workerManager
            .setHandler('message', this.$notifier.push)
            .setHandler('init', this.dataInit)
            .setHandler('progressBuffered', (data) => {
                this.dataProgressBuffered({methodId: this.selectedMethodId, data});
            })
            .setHandler('result', this.done)
            .setHandler('error', (message, type) => {
                this.done(null);
                this.$notifier.push(message, "error");
            });
    },
    methods: {
        start: function() {
            var fileDbObj = this.getSelectedFile;

            if (this.workerManager.inProgress) {
                this.$notifier.put("workerInfo", "Work is in progress.", "info");
                return;
            }

            getDbFileContent(fileDbObj).then((content) => {
                this.workerManager.sendWork('work', content, this.params);
                this.setStatusRunning(fileDbObj.file);
            }, (errorMsg) => {
                this.$notifier.put("inFile", errorMsg);
            });
        },

        stop: function() {
            if (!this.workerManager.inProgress) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.workerManager.terminate();
            this.setStatusStopped();
        },

        done: function(result) {
            this.workerManager.terminate();

            if (result === null) {
                // TODO handle errors ?
                this.setStatusError();
            }
            else {
                this.pushResult(result);
                this.setStatusProcessingResults(result);
            }
        },

        ...mapMutations([
            'setStatusRunning',
            'setStatusProcessingResults',
            'setStatusStopped',
            'setStatusDone',
            'setStatusError',
            'dataInit',
            'dataProgressBuffered',
        ]),
        ...mapActions([
            'pushResult'
        ])
    }
}
</script>

<style scoped>
    .controls {
        display: inline-block;
        width: 100%;
        height: 4em;
        padding: 0 1em;
        line-height: 4em;
        border: #ccc 1px solid;
        border-width: 1px 0;
        background-color: inherit;
    }

    .controls .status {
        float: left;
    }

    .controls .control-buttons {
        float: right;
    }
</style>
