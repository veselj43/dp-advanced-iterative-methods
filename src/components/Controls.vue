<template>
    <div class="controls">
        <span class="status">Status: <b>{{status.text}}</b></span>
        <span class="control-buttons">
            <button v-if="!status.isRunning" class="btn btn-success" v-on:click="start">Start</button>
            <button v-else class="btn btn-danger" v-on:click="stop">Stop</button>
        </span>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { WorkerManager } from '../computing/WorkerManager.js';

export default {
    data() {
        return {
            status: this.$store.getters.getComputingStatus,
            params: this.$store.state.inputParams.params
        }
    },
    computed: {
        ...mapGetters([
            'getSelectedFile'
        ])
    },
    mounted () {
        var myWorker = require("worker-loader!../computing/IterativeMethodWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);

        this.workerManager
            .setHandler('message', this.$notifier.push)
            .setHandler('init', this.dataInit)
            .setHandler('progress', this.dataProgress)
            .setHandler('result', this.done)
            .setHandler('error', (message, type) => {
                this.done(null);
                this.$notifier.push(message, "error");
            });
    },
    methods: {
        start: function() {
            var context = this;
            var fileObj = this.getSelectedFile;
            var reader = new FileReader();

            if (this.workerManager.inProgress) {
                this.$notifier.put("workerInfo", "Work is in progress.", "info");
                return;
            }

            if (fileObj && fileObj.name === undefined) {
                context.$notifier.put("inFile", "No input file.");
                return;
            }

            var compute = (fileObj) => (data) => {
                context.workerManager.sendWork('work', data, context.params);
                context.setStatusRunning(fileObj);
            };

            reader.onLoadCallback = compute(fileObj);

            reader.onload = function(event) {
                this.onLoadCallback(event.target.result);
            };

            reader.readAsBinaryString(fileObj);
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
                this.setStatusDone(result);
            }
        },

        ...mapMutations([
            'setStatusRunning',
            'setStatusStopped',
            'setStatusDone',
            'setStatusError',
            'dataInit',
            'dataProgress'
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
    }

    .controls .status {
        float: left;
    }

    .controls .control-buttons {
        float: right;
    }
</style>
