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
export default {
    props: ['handlers'],
    data() {
        return {
            worker: null,
            status: "Ready"
        }
    },

    methods: {
        start: function() {
            var context = this;

            if (typeof(Worker) === "undefined") {
                context.$notifier.put("worker-err", "Workers not supported.", "error");
                return;
            }

            if (this.worker !== null) {
                context.$notifier.put("worker-info", "Work is in progress.", "info");
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
                var myWorker = require("worker-loader!./computing/worker.js");
                context.worker = new myWorker();

                context.worker.onmessage = function(e) {
                    if (!_.isArray(e.data)) {
                        console.warn("[Main] Cannot understand worker message.");
                    }
                    else if (e.data[0] === "message") {
                        context.$notifier.push(e.data[1], e.data[2]);
                    }
                    else if (e.data[0] === "init") {
                        context.handlers.init(e.data[1]);
                    }
                    else if (e.data[0] === "progress") {
                        context.handlers.progress(e.data[1]);
                    }
                    else if (e.data[0] === "result") {
                        context.worker.terminate();
                        context.worker = null;

                        if (e.data[1] === null) {
                            context.status = "Error";
                        }
                        else {
                            context.status = "Done";
                            e.data[1].status = context.status;
                            context.handlers.result(e.data[1]);
                        }

                    }
                };

                context.worker.postMessage([data, context.params]);

                context.status = "In progress";
            };

            var params;
            var files;
            $eventBus.$emit("getParams", data => {params = data});
            $eventBus.$emit("getFiles", data => {files = data});
            processInput(params, files);
        },

        stop: function() {
            if (this.worker === null) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.worker.terminate();
            this.worker = null;

            this.status = "Stopped";

            this.handlers.interrupt(this.status);
        }
    }
}
</script>
