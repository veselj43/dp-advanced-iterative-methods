<template>
    <div class="paramsSelection">
        <form class="form-horizontal">

            <div class="form-group">
                <label class="col-md-4 control-label" for="problemKey">Problem</label>
                <div class="col-md-8">
                    <select class="form-control" id="problemKey" v-model="params.problemKey">
                        <option v-for="problem in options.problems" v-bind:value="problem.value">{{problem.text}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label" for="methodKey">Method</label>
                <div class="col-md-8">
                    <select class="form-control" id="methodKey" v-model="params.methodKey">
                        <option v-for="method in options.methods" v-bind:value="method.value">{{method.text}}</option>
                    </select>
                </div>
            </div>

            <keep-alive>
                <component :is="params.methodKey" :params.sync="params"></component>
            </keep-alive>

        </form>
    </div>
</template>

<script>
import AnnealingParams from "./methodParams/Annealing"
import GeneticParams from "./methodParams/Genetic"
import TabuParams from "./methodParams/Tabu"

export default {
    components: {
        'Annealing': AnnealingParams,
        'Genetic': GeneticParams,
        'Tabu': TabuParams
    },

    data() {
        return {
            options: {
                methods: [
                    {
                        value: 'Annealing',
                        text: "Simulované ochlazování"
                    }, {
                        value: 'Genetic',
                        text: "Genetický algoritmus"
                    }, {
                        value: 'Tabu',
                        text: "Tabu prohledávání"
                    }
                ],
                problems: [
                    {value: 1, text: "SAT"},
                    {value: 2, text: "Travelling Salesman"},
                    {value: 3, text: "Knapsack"}
                ]
            },
            params: {
                problemKey: 1,
                methodKey: 'Tabu',
                annealing: {
                    param1: 1
                },
                genetic: {
                    param1: 1
                },
                tabu: {
                    multiplierLimit: 2,
                    multiplierTabuSize: 1,
                    tabuSize2: 4
                }
            }
        }
    },

    mounted() {
        var context = this;
        $eventBus.$on("getParams", function(callback) {
            callback(context.params);
        });
    },

    methods: {

    }
}
</script>

<style scoped>
    .paramsSelection {
        padding: 1em;
    }
</style>
