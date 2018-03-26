<template>
    <div class="generator">
        <problem-select></problem-select>

        <div class="form">
            <div v-if="problemKey === 0">

                <div class="form-group" v-bind:class="{'has-error': errors.has('numberOfVariables')}">
                    <label for="genParam2">Number of variables</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of variables in the generated instance'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[0].noVariables" placeholder=""
                    name="numberOfVariables"
                    data-vv-as="number of variable"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 300, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('numberOfVariables')" class="help-block">{{ errors.first('numberOfVariables') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('numberOfClausules')}">
                    <label for="genParam1">Number of clausules</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of clausules in the generated instance'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[0].noClausules" placeholder=""
                    name="numberOfClausules"
                    data-vv-as="number of clausules"
                    v-validate.initial="{ required: true, min_value: 1, max_value: Math.pow(2, generatorParams[0].noVariables - 1), regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('numberOfClausules')" class="help-block">{{ errors.first('numberOfClausules') }}</span>
                </div>

            </div>

            <div v-if="problemKey === 1">

                <div class="form-group" v-bind:class="{'has-error': errors.has('numberOfNodes')}">
                    <label for="genParam1">Number of nodes</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of vertexes(nodes) in the generated problem'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[1].noNodes" placeholder=""
                    name="numberOfNodes"
                    data-vv-as="number of nodes"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 300, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('numberOfNodes')" class="help-block">{{ errors.first('numberOfNodes') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('numberOfEdges')}">
                    <label for="genParam2">Number of edges</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of edges, the actual number is 2 times this value, because the edges are not oriented'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].noEdges" placeholder=""
                    name="numberOfEdges"
                    data-vv-as="number of edges"
                    v-validate.initial="{ required: true, min_value: generatorParams[1].noNodes - 1, max_value: generatorParams[1].noNodes * (generatorParams[1].noNodes - 1), regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('numberOfEdges')" class="help-block">{{ errors.first('numberOfEdges') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('numberOfNodesToVisit')}">
                    <label for="genParam2">Number of nodes to visit</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of the nodes, that the salesman has to visit, must be max number of nodes -1, beacuse one node is starting node'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].noNodesToVisit" placeholder=""
                    name="numberOfNodesToVisit"
                    data-vv-as="number of nodes to visit"
                    v-validate.initial="{ required: true, min_value: 1, max_value: generatorParams[1].noNodes - 1, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('numberOfNodesToVisit')" class="help-block">{{ errors.first('numberOfNodesToVisit') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('maximumEdgePrice')}">
                    <label for="genParam2">Maximum price of an edge</label>
                    <span class="form-tooltip" v-tooltip.right="'Maximum price of each edge'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[1].maxPrice" placeholder=""
                    name="maximumEdgePrice"
                    data-vv-as="maximum price of an edge"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 10000, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('maximumEdgePrice')" class="help-block">{{ errors.first('maximumEdgePrice') }}</span>
                </div>

            </div>

            <div v-if="problemKey === 2">

                <div class="form-group" v-bind:class="{'has-error': errors.has('Capacity')}">
                    <label for="genParam1">Capacity</label>
                    <span class="form-tooltip" v-tooltip.right="'Capacity of the knapsack, should be lower than sum of weights'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[2].capacity" placeholder=""
                    name="Capacity"
                    data-vv-as="capacity"
                    v-validate.initial="{ required: true, min_value: 1, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('Capacity')" class="help-block">{{ errors.first('Capacity') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('noItems')}">
                    <label for="genParam2">Number of items</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of items in the instance'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam2" v-model="generatorParams[2].noItems" placeholder=""
                    name="noItems"
                    data-vv-as="number of items"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 300, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('noItems')" class="help-block">{{ errors.first('noItems') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('sumOfWeights')}">
                    <label for="genParam2">Sum of items weights</label>
                    <span class="form-tooltip" v-tooltip.right="'Sum of the weights of all items'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam3" v-model="generatorParams[2].sumOfWeights" placeholder=""
                    name="sumOfWeights"
                    data-vv-as="sum of item weights"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 300, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('sumOfWeights')" class="help-block">{{ errors.first('sumOfWeights') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('maxValue')}">
                    <label for="genParam2">Max value</label>
                    <span class="form-tooltip" v-tooltip.right="'Maximum value of each item'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam4" v-model="generatorParams[2].maxValue" placeholder=""
                    name="maxValue"
                    data-vv-as="max value"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 10000, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('maxValue')" class="help-block">{{ errors.first('maxValue') }}</span>
                </div>

                <div class="form-group" v-bind:class="{'has-error': errors.has('granularity')}">
                    <label for="genParam2">Granularity</label>
                    <span class="form-tooltip" v-tooltip.right="'For number > 0 the instance will contain more heavier things, for < 0 more lighter things. Each item has 1/(maxWeight - weight)^granularity chance to be in the instance for heavier things and 1/weight^(-granularity) for lighter things. WARNING!!! for realy high numbers(or really low for lighter things) the generation take a lot of time because most things will be thrown away. So for best result use number between <-1, 1>. For 0 the generating is random.'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam5" v-model="generatorParams[2].granularity" placeholder=""
                    name="granularity"
                    data-vv-as="granularity"
                    v-validate.initial="{ required: true, min_value: -10, max_value: 10, regex: /^-?\d+\.?\d*$/ }"
                    >
                    <span v-show="errors.has('granularity')" class="help-block">{{ errors.first('granularity') }}</span>
                </div>

            </div>

            <div v-if="problemKey === 3">

                <div class="form-group" v-bind:class="{'has-error': errors.has('size')}">
                    <label for="genParam1">Number of nodes</label>
                    <span class="form-tooltip" v-tooltip.right="'Number of nodes in the generated graph.'"><span class="glyphicon glyphicon-question-sign"></span></span>
                    <input type="number" class="form-control" id="genParam1" v-model="generatorParams[3].size" placeholder=""
                    name="size"
                    data-vv-as="number of nodes"
                    v-validate.initial="{ required: true, min_value: 1, max_value: 300, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('size')" class="help-block">{{ errors.first('size') }}</span>
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

                <label id="generate-next" class="checkbox"><input type="checkbox" v-model="geterateNext"> Keep generator open</label>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { WorkerManager } from '@/computing/WorkerManager.js';
import GeneratorWorker from "@/computing/GeneratorWorker.js";

import ProblemSelect from './ProblemSelect';

export default {
    components: {
        ProblemSelect
    },

    data() {
        return {
            geterateNext: false,
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
        this.workerManager = new WorkerManager(this, GeneratorWorker);
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

        result: function(result, errorMessage) {
            this.workerManager.terminate();
            this.isGenerating = false;
            if (result === null) {
                this.$notifier.push((errorMessage) ? errorMessage : "Error while generating instance.", "error");
            }
            else {
                this.addGeneratedInstances([{name: this.generatorParams.instanceName, content: result}]);
                this.$notifier.push("Instance added to list.", "success");
                if (!this.geterateNext) {
                    this.$emit('closeGeneratorModal');
                }
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

    #generate-next {
        display: inline-block;
        margin-left: 30px;
        font-weight: normal;
    }
</style>
