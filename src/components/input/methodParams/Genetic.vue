<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-population-size')}">
            <label class="" for="population-size">Population size</label>
            <span class="form-tooltip" v-tooltip.right="'Number of individuals in each generation'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input class="form-control" type="number" min="1" max="1000"
                   id="population-size" name="genetic-population-size" v-model="params.populationSize"
                   data-vv-as="population size" v-validate.initial="{ required: true, min_value: 1, max_value: 1000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('genetic-population-size')" class="help-block">{{ errors.first('genetic-population-size') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-generation-count')}">
            <label class="" for="generation-count">Number of generations</label>
            <span class="form-tooltip" v-tooltip.right="'Number of generations/steps in genetic algorithm '"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input class="form-control" type="number" min="1"
                   id="generation-count" name="genetic-generation-count" v-model="params.noGenerations"
                   data-vv-as="number of generations" v-validate.initial="{ required: true, min_value: 1, max_value: 10000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('genetic-generation-count')" class="help-block">{{ errors.first('genetic-generation-count') }}</span>
        </div>
        <div id="selection">
            <div class="form-group">
                <label class="" for="selection-type">Selection type</label>
                <!--TODO stukturovany tooltip do vice radku-->
                <span class="form-tooltip" v-tooltip.right="'Selection type tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <select class="form-control" id="selection-type" v-model="params.selectionType"> <!--v-on:change="selectionChange(this)"-->
                    <option value="roulette">Roulette</option>
                    <option value="tourney">Tourney</option>
                </select>
            </div>

            <div class="form-group" id="roulette" v-if="params.selectionType === 'roulette'">
                <label class="">Linear scaling</label>
                <span class="form-tooltip" v-tooltip.right="'Linear scaling tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <!--TODO min a max do jednoho radku/nahradit sliderem-->
                <div class="">
                    <label class="" for="scale-min">Min</label>
                    <input class="form-control" type="number" id="scale-min" v-model="params.scaleMin">
                    <label class="" for="scale-max">Max</label>
                    <input class="form-control" type="number" id="scale-max" v-model="params.scaleMax">
                </div>
            </div>


            <div class="form-group" id="tourney" v-if="params.selectionType === 'tourney'" v-bind:class="{'has-error': errors.has('genetic-tourney-size')}">
                <label class="" for="tourney-size">Tourney size</label>
                <span class="form-tooltip" v-tooltip.right="'Tourney size tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input class="form-control" type="number" min="1" step="0.5"
                       id="tourney-size" name="genetic-tourney-size" v-model="params.tourneySize"
                       data-vv-as="number of generations" v-validate.initial="{ required: true, min_value: 1, max_value: params.populationSize, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-tourney-size')" class="help-block">{{ errors.first('genetic-tourney-size') }}</span>
            </div>
        </div>
        <div id="crossover">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-cross-prob')}">
                <label class="" for="crossover-prob">Crossover probability</label>
                <span class="form-tooltip" v-tooltip.right="'Crossover probability tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input class="form-control" type="number" min="0" max="1" step="0.05"
                       id="crossover-prob" name="genetic-cross-prob" v-model="params.crossoverProb"
                       data-vv-as="crossover probability" v-validate.initial="{ required: true, min_value: 0, max_value: 1, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-cross-prob')" class="help-block">{{ errors.first('genetic-cross-prob') }}</span>
            </div>

            <div class="form-group">
                <label class="" for="crossover-type">Crossover type</label>
                <!--TODO stukturovany tooltip do vice radku-->
                <span class="form-tooltip" v-tooltip.right="'Crossover type tooltip TODO text'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <select class="form-control" id="crossover-type" v-model="params.crossoverType">
                    <option value="1">one-point</option>
                    <option value="2">two-point</option>
                    <option value="3">uniform</option>
                </select>
            </div>
        </div>
        <div id="mutation">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-mutation-rate')}">
                <label class="" for="mutation-rate">Mutation rate</label>
                <span class="form-tooltip" v-tooltip.right="'Mutation rate specifies with which probability is each bit inveterted'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <input class="form-control" type="number" min="0" max="1" step="0.01"
                       id="mutation-rate" name="genetic-mutation-rate" v-model="params.mutationRate"
                       data-vv-as="mutation rate" v-validate.initial="{ required: true, min_value: 0, max_value: 1, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-mutation-rate')" class="help-block">{{ errors.first('genetic-mutation-rate') }}</span>
            </div>
        </div>
        <div id="new-generation">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-elitism')}">
                <label class="" for="elitism">Elitism</label>
                <span class="form-tooltip" v-tooltip.right="'How many best individuals are copied from previous generation to the new one. Note that the greater elitism is the lower new individuals are created.'"><span class="glyphicon glyphicon-question-sign"></span></span>
                <div class="">
                    <input class="form-control" type="number" min="0"
                           id="elitism" name="genetic-elitism" v-model="params.elitism"
                           data-vv-as="elitism" v-validate.initial="{ required: true, min_value: 0, max_value: params.populationSize, regex: /^[0-9]+$/ }"
                    >
                    <span v-show="errors.has('genetic-elitism')" class="help-block">{{ errors.first('genetic-elitism') }}</span>
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
            },
            errors: {
                handler: function (errors) {
                    this.$store.commit('updateParamsValidation', {id: 'genetic', data: errors.items.length === 0});
                },
                deep: true
            }
        }
    }

</script>
