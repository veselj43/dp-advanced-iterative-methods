<template>
    <div class="controls">
        <span class="status">Status: <b>{{status}}</b></span>
        <span class="control-buttons">
            <button class="btn btn-success" v-on:click="start">Start</button>
            &nbsp;
            <button class="btn btn-danger" v-on:click="stop">Stop</button>
        </span>
    </div>
</template>

<script>
import { WorkerManager } from '../computing/WorkerManager.js';

export default {
    props: ['handlers'],
    data() {
        return {
            worker: null,
            status: "Ready"
        }
    },
    mounted () {
        var myWorker = require("worker-loader!../computing/IterativeMethodWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);

        this.workerManager
            .setHandler('message', function(id, content, type) {
                this.$notifier.push(id, content, type);
            })
            .setHandler('init', function(data) {
                this.handlers.init(data);
            })
            .setHandler('progress', function(data) {
                this.handlers.progress(data);
            })
            .setHandler('result', function(result) {
                this.workerManager.terminate();
                if (result === null) {
                    this.status = "Error";
                }
                else {
                    this.status = "Done";
                    result.status = this.status;
                    this.handlers.result(result);
                }
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

                context.status = "In progress";
            };

            var params;
            var files;
            $eventBus.$emit("getParams", data => {params = data});
            $eventBus.$emit("getFiles", data => {files = data});
            processInput(params, files);
        },

        stop: function() {
            if (!this.workerManager.inProgress) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.workerManager.terminate();

            this.status = "Stopped";

            this.handlers.interrupt(this.status);
        }
    }
}
</script>
