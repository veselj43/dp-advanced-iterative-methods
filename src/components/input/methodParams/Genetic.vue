<template>
    <div class="params">
        <div class="form-group">
            <label class="" for="generation-size" data-toggle="tooltip">Number of individuals</label>
            <span class="form-tooltip" v-tooltip.right="'Number of individuals in each generation'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="generation-size" v-model="params.noIndividuals" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="generation-count">Number of generations</label>
            <span class="form-tooltip" v-tooltip.right="'Number of generations'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="generation-count" v-model="params.noGenerations" placeholder="">
            </div>
        </div>
        <div id="selection">
            <div class="form-group">
                <label class="" for="selection-type">Selection type</label>
                <span class="form-tooltip" v-tooltip.right="'Selection type tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <select class="form-control" id="selection-type" v-model="params.selectionType"> <!--v-on:change="selectionChange(this)"-->
                        <option value="1">Roulette</option>
                        <option value="2">Tourney</option>
                    </select>
                </div>
            </div>


            <div class="form-group" id="tourney" v-if="params.selectionType === '2'">
                <label class="" for="tourney-size">Tourney size</label>
                <span class="form-tooltip" v-tooltip.right="'Tourney size tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <input class="form-control" type="number" id="tourney-size" v-model="params.tourneySize" placeholder="">
                </div>
            </div>
        </div>
        <!--
        <div class="form-group">
            <label class="" for="param1">Param1</label>
            <div class="">
                <input class="form-control" type="number" id="param1" v-model="params.param1" placeholder="">
            </div>
        </div>
        -->
        <div id="crossover">
            <div class="form-group">
                <label class="" for="crossover-type">Crossover type</label>
                <span class="form-tooltip" v-tooltip.right="'Crossover type tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <select class="form-control" id="crossover-type" v-model="params.crossoverType">
                        <option value="1">one-point</option>
                        <option value="2">two-point</option>
                        <option value="3">uniform</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="mutation">
            <div class="form-group">
                <label class="" for="mutation-rate">Mutation rate</label>
                <span class="form-tooltip" v-tooltip.right="'Mutation rate tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <input class="form-control" type="number" min="0" max="1" step="0.01" id="mutation-rate" v-model="params.mutationRate" placeholder="">
                </div>
            </div>
        </div>
        <div id="new-generation">
            <div class="form-group">
                <label class="" for="elitism">Elitism</label>
                <span class="form-tooltip" v-tooltip.right="'Elitism tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <input class="form-control" type="number" min="0" max="1" step="0.01" id="elitism" v-model="params.elitism" placeholder="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                params: _.cloneDeep(this.$store.state.inputParams.params.methodParams.genetic)
            }
        },
        watch: {
            params: {
                handler: function (params) {
                    this.$store.commit('updateParams', {id: 'genetic', data: params})
                },
                deep: true
            }
        }
    }

</script>
