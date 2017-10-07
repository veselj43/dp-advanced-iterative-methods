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
import { WorkerManager } from '../../computing/WorkerManager.js';

export default {
    data() {
        return {
            status: "Ready",
            fileData: null
        }
    },
    mounted () {
        var myWorker = require("worker-loader!../../computing/GeneratorWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);

        this.workerManager
            .setHandler('message', function(id, content) {
                this.$notifier.push(id, content);
            })
            .setHandler('result', function(result) {
                this.workerManager.terminate();
                if (result === null) {
                    this.status = "Error";
                }
                else {
                    this.status = "Done";
                    this.result(result);
                }
            });
    },
    methods: {
        generate: function() {
            if (this.workerManager.inProgress) {
                this.$notifier.put("worker-info", "Work is in progress.", "info");
                return;
            }

            this.workerManager.sendWork('work', "Hello file!");

            this.status = "In progress";
        },

        stop: function() {
            if (this.workerManager.terminated) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.workerManager.terminate();

            this.status = "Stopped";
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
