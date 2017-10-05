<template>
    <div class="generator center-panel">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-md-2 control-label" for="genParam1">generator p1:</label>
                <div class="col-md-10">
                    <input type="number" class="form-control" id="genParam1" placeholder="gp1">
                </div>
            </div>

            <div class="col-md-offset-2 col-md-10">
                <button type="submit" class="btn btn-success" v-on:click="generate">Generate</button>
                <button class="btn btn-danger" v-on:click="stop">Cancel</button>
            </div>

            <h2>Result</h2>
            <a v-if="fileData" :href="fileData" download="test.txt">download file</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            worker: null,
            status: "Ready",
            fileData: null
        }
    },

    methods: {
        generate: function() {
            var context = this;

            if (typeof(Worker) === "undefined") {
                context.$notifier.put("worker-err", "Workers not supported.", "error");
                return;
            }

            if (this.worker !== null) {
                context.$notifier.put("worker-info", "Work is in progress.", "info");
                return;
            }

            var myWorker = require("worker-loader!../../computing/GeneratorWorker.js");
            context.worker = new myWorker();

            context.worker.onmessage = function(e) {
                if (!_.isArray(e.data)) {
                    console.warn("[Main] Cannot understand worker message.");
                }
                else if (e.data[0] === "message") {
                    context.$notifier.push(e.data[1], e.data[2]);
                }
                else if (e.data[0] === "result") {
                    context.worker.terminate();
                    context.worker = null;

                    if (e.data[1] === null) {
                        context.status = "Error";
                    }
                    else {
                        context.status = "Done";
                        context.result(e.data[1]);
                    }

                }
            };

            context.worker.postMessage([context.params]);

            context.status = "In progress";
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
        },

        result: function(data) {
            console.log(data);
            this.fileData = "data:application/octet-stream;charset=utf-8;base64," + btoa(data);
        }
    }
}
</script>

<style scoped>
    .generator {
        margin-top: 2em;
    }
</style>
