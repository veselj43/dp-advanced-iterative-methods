<template>
    <div class="generator">
        <problem-select></problem-select>

        <div class="form">
            <div v-if="problemKey === 0">

                <div class="form-group">
                    <label for="genParam1">Number of clausules</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p1'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[0].noClausules" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Number of variables</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[0].noVariables" placeholder="">
                </div>

            </div>

            <div v-if="problemKey === 1">

                <div class="form-group">
                    <label for="genParam1">Number of nodes</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p1'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[1].noNodes" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Number of edges</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].noEdges" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Number of nodes to visit</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].noNodesToVisit" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Maximum price of an edge</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].maxPrice" placeholder="">
                </div>

            </div>

            <div v-if="problemKey === 2">

                <div class="form-group">
                    <label for="genParam1">Capacity</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p1'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[2].capacity" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Number of items</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[2].noItems" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Sum of items weights</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam3" v-model="generatorParams[2].sumOfWeights" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Max value</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam4" v-model="generatorParams[2].maxValue" placeholder="">
                </div>

                <div class="form-group">
                    <label for="genParam2">Granularity</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p2'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam5" v-model="generatorParams[2].granularity" placeholder="">
                </div>

            </div>

            <div v-if="problemKey === 3">

                <div class="form-group">
                    <label for="genParam1">Number of nodes</label>
                    <span class="form-tooltip" v-tooltip.right="'Tooltip text p1'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[3].size" placeholder="">
                </div>

            </div>

            <div class="form-group">
                <label for="instanceName">Instance name</label>
                <span class="form-tooltip" v-tooltip.right="'Name that will be shown in instance list'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input type="text" class="form-control" id="instanceName" v-model="generatorParams.instanceName" placeholder="">
            </div>

            <div class="form-group">
                <button v-if="!isGenerating" class="btn btn-success" v-on:click="generate">Generate</button>
                <button v-else class="btn btn-danger" v-on:click="stop">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { WorkerManager } from '../../computing/WorkerManager.js';

import ProblemSelect from './ProblemSelect';

export default {
    components: {
        ProblemSelect
    },

    data() {
        return {
            isGenerating: false,
            generatorParams: {
                instanceName: "instance",
                0: {
                    noVariables: 4,
                    noClausules: 7
                },
                1: {
                    noNodes: 5,
                    noEdges: 6,
                    noNodesToVisit: 2,
                    maxPrice: 10
                },
                2: {
                    capacity: 100,
                    noItems: 5,
                    sumOfWeights: 200,
                    maxValue: 200,
                    granularity: 1
                },
                3: {
                    size : 10
                }

            }
        }
    },

    computed: {
        ...mapState({
            problemKey: (state) => state.inputParams.params.problem.id
        })
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
            this.workerManager.sendWork('work', this.generatorParams, this.problemKey);
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
