<template>
    <div class="generator">
        <form class="form">
            <div class="form-group">
                <label for="genParam1">generator parameter 1</label>
                <span class="form-tooltip" v-tooltip="'Tooltip text p1'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input type="number" class="form-control" id="genParam1" v-model="generatorParams.genParam1" placeholder="">
            </div>

            <div class="form-group">
                <label for="genParam2">generator parameter 2</label>
                <span class="form-tooltip" v-tooltip="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input type="number" class="form-control" id="genParam2" v-model="generatorParams.genParam2" placeholder="">
            </div>

            <div class="form-group">
                <label for="instanceName">Instance name</label>
                <span class="form-tooltip" v-tooltip="'Name that will be shown in instance list'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input type="text" class="form-control" id="instanceName" v-model="generatorParams.instanceName" placeholder="">
            </div>

            <div class="form-group">
                <button v-if="!isGenerating" class="btn btn-success" v-on:click="generate">Generate</button>
                <button v-else class="btn btn-danger" v-on:click="stop">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { WorkerManager } from '../../computing/WorkerManager.js';

export default {
    data() {
        return {
            isGenerating: false,
            generatorParams: {
                instanceName: "instance"
            }
        }
    },
    mounted () {
        var myWorker = require("worker-loader!../../computing/GeneratorWorker.js");
        this.workerManager = new WorkerManager(this, myWorker);
        this.workerManager
            .setHandler('message', this.$notifier.push)
            .setHandler('result', this.result);
    },
    methods: {
        generate: function() {
            if (this.workerManager.inProgress) {
                this.$notifier.put("worker-info", "Work is in progress.", "info");
                return;
            }
            this.workerManager.sendWork('work', this.generatorParams);
            this.isGenerating = true;
        },

        stop: function() {
            if (this.workerManager.terminated) {
                this.$notifier.put("stop", "Nothing to stop.", "info");
                return;
            }
            this.workerManager.terminate();
            this.isGenerating = false;
        },

        result: function(result) {
            this.workerManager.terminate();
            this.isGenerating = false;
            if (result === null) {
                this.$notifier.push("Error while generating instance.", "error");
            }
            else {
                this.addGeneratedInstances([{name: this.generatorParams.instanceName, content: result}]);
                this.$notifier.push("Instance added to list.", "success");
            }
        },

        ...mapActions([
            'addGeneratedInstances'
        ])
    }
}
</script>

<style scoped>
    .generator {
        text-align: left;
    }

    .form-tooltip {
        display: inline-block;
        padding-left: .3em;
    }
</style>
