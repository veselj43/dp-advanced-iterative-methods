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
import { mapState } from 'vuex';
import { WorkerManager } from '../computing/WorkerManager.js';

export default {
    props: ['handlers'],
    data() {
        return {
            worker: null,
            status: {
                isRunning: false,
                text: "Ready"
            }
        }
    },
    computed: {
        params: {
            get () {
                return this.$store.state.inputParams.params;
            },
            set (value) {}
        }
    },
    mounted () {
        var myWorker = require("worker-loader!../computing/IterativeMethodWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);

        this.workerManager
            .setHandler('message', this.$notifier.push)
            .setHandler('init', this.handlers.init)
            .setHandler('progress', this.handlers.progress)
            .setHandler('result', this.done)
            .setHandler('error', (message, type) => {
                this.done(null);
                this.$notifier.push(message, "error");
            });
    },
    methods: {
        start: function() {
            var context = this;

            if (Worker === undefined) {
                this.$notifier.put("worker-err", "Workers not supported.", "error");
                return;
            }

            if (this.workerManager.inProgress) {
                this.$notifier.put("worker-info", "Work is in progress.", "info");
                return;
            }

            function processInput(params, fileObj) {
                if (fileObj.file === undefined) {
                    context.$notifier.put("inFile", "No input file.");
                    return;
                }

                context.params = params;

                var reader = new FileReader();
                reader.onLoadCallback = compute(fileObj.file);

                reader.onload = function(event) {
                    this.onLoadCallback(event.target.result);
                };

                reader.readAsBinaryString(fileObj.file);
            }

            var compute = fileObj => data => {
                context.workerManager.sendWork('work', data, context.params);

                context.status.isRunning = true;
                context.status.text = "In progress";
            };

            var files;
            $eventBus.$emit("getFiles", data => {files = data});
            processInput(this.params, files);
        },

        stop: function() {
            if (!this.workerManager.inProgress) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.workerManager.terminate();
            this.status.isRunning = false;
            this.status.text = "Stopped";

            this.handlers.interrupt(this.status);
        },

        done: function(result) {
            this.workerManager.terminate();
            this.status.isRunning = false;

            if (result === null) {
                // TODO handle errors ?
                this.status.text = "Error";
            }
            else {
                this.status.text = "Done";
                result.status = this.status;
                this.handlers.result(result);
            }
        }
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
