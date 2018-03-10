<template>
    <div class="controls __above-disable-layer">
        <span class="status">Status: <b>{{status.text}}</b></span>
        <span class="control-buttons">
            <button v-if="!computingIsRunning" class="btn btn-success" :disabled="!getIsValidParams" v-on:click="start">Start</button>
            <button v-else class="btn btn-danger" v-on:click="stop">Stop</button>
        </span>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { WorkerManager } from '@/computing/WorkerManager.js';

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
        var myWorker = require("worker-loader!@/computing/IterativeMethodWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);

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
            var context = this;
            var fileDbObj = this.getSelectedFile;

            if (!fileDbObj.type) {
                this.$notifier.put("inFile", "No input file.");
                return;
            }

            if (this.workerManager.inProgress) {
                this.$notifier.put("workerInfo", "Work is in progress.", "info");
                return;
            }

            var compute = (fileObj) => (data) => {
                context.workerManager.sendWork('work', data, context.params);
                context.setStatusRunning(fileObj);
            };

            if (fileDbObj.type === 'file') {
                var reader = new FileReader();

                reader.onLoadCallback = compute(fileDbObj.file);
                reader.onload = function(event) {
                    this.onLoadCallback(event.target.result);
                };
                reader.readAsBinaryString(fileDbObj.file);
            }
            else if (fileDbObj.type === 'string') {
                compute(fileDbObj.file)(fileDbObj.file.content);
            }
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
