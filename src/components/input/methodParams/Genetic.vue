<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-population-size')}">
            <label class="" for="population-size">Population size</label>
            <span class="form-tooltip" v-tooltip.right="'Number of individuals in each generation.'"><i class="fas fa-question-circle"></i></span>
            <input class="form-control" type="number" min="1"
                   id="population-size" name="genetic-population-size" v-model="params.populationSize"
                   data-vv-as="population size" v-validate.initial="{ required: true, min_value: 1, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('genetic-population-size')" class="help-block">{{ errors.first('genetic-population-size') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-generation-count')}">
            <label class="" for="generation-count">Number of generations</label>
            <span class="form-tooltip" v-tooltip.right="'Number of generations/steps in genetic algorithm.'"><i class="fas fa-question-circle"></i></span>
            <input class="form-control" type="number" min="1"
                   id="generation-count" name="genetic-generation-count" v-model="params.noGenerations"
                   data-vv-as="number of generations" v-validate.initial="{ required: true, min_value: 1, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('genetic-generation-count')" class="help-block">{{ errors.first('genetic-generation-count') }}</span>
        </div>
        <div id="selection">
            <div class="form-group">
                <label class="" for="selection-type">Selection type</label>
                <span class="form-tooltip" v-tooltip.right="{content: 'Defines selection mechanism:\nTournament - Selects individuals uniformly in \n     tournament the best one is selected.\n Roulette - Each individual is selected based on \n     portions in roulette.\n', class: 'tooltip-whitespace-wrap' }"><i class="fas fa-question-circle"></i></span>
                <select class="form-control" id="selection-type" v-model="params.selectionType"> <!--v-on:change="selectionChange(this)"-->
                    <option :value="SelectionEnum.ROULETTE_RANK">Roulette with ranking</option>
                    <option :value="SelectionEnum.ROULETTE_LINEAR">Roulette with linear scaling</option>
                    <option :value="SelectionEnum.TOURNAMENT">Tournament</option>
                </select>
            </div>

            <div class="form-group" v-bind:class="{'has-error': (errors.has('genetic-scale-min') || errors.has('genetic-scale-max'))}" id="roulette" v-if="params.selectionType === SelectionEnum.ROULETTE_RANK || params.selectionType === SelectionEnum.ROULETTE_LINEAR">
                <div v-if="params.selectionType === SelectionEnum.ROULETTE_RANK">
                <label class="">Rank scale</label>
                <span class="form-tooltip" v-tooltip.right="'Roulette portions are linearly scaled from min to max according to rank.'"><i class="fas fa-question-circle"></i></span>
                </div>
                <div v-if="params.selectionType === SelectionEnum.ROULETTE_LINEAR">
                <label class="">Linear scaling</label>
                <span class="form-tooltip" v-tooltip.right="'Roulette portions are linearly scaled from min to max according to fitness.'"><i class="fas fa-question-circle"></i></span>
                </div>
                <div class="input-group">
                    <div class="input-group-addon">Min</div>
                    <input class="form-control" type="number" min="0" id="scale-min" name="genetic-scale-min" v-model="params.scaleMin"
                           data-vv-as="minimum scale" v-validate.initial="{ required: true, min_value: 0, regex: /^([0-9]*[.])?[0-9]+$/ }">
                    <div class="input-group-addon">-</div>
                    <input class="form-control" type="number" min="1" id="scale-max" name="genetic-scale-max" v-model="params.scaleMax"
                           data-vv-as="maximum scale" v-validate.initial="{ required: true, min_value: (1 > params.scaleMin) ? 1 : params.scaleMin, regex: /^([0-9]*[.])?[0-9]+$/ }">
                    <div class="input-group-addon">Max</div>
                </div>
                <span v-show="errors.has('genetic-scale-min')" class="help-block">{{ errors.first('genetic-scale-min') }}</span>
                <span v-show="errors.has('genetic-scale-max')" class="help-block">{{ errors.first('genetic-scale-max') }}</span>
            </div>


            <div class="form-group" id="tournament" v-if="params.selectionType === SelectionEnum.TOURNAMENT" v-bind:class="{'has-error': errors.has('genetic-tournament-size')}">
                <label class="" for="tournament-size">Tournament size</label>
                <span class="form-tooltip" v-tooltip.right="'Defines how many individuals compete in single tournament. If number isn\'t integer sizes of tournaments varies based on decimal part.'"><i class="fas fa-question-circle"></i></span>
                <input class="form-control" type="number" min="1" step="0.25"
                       id="tournament-size" name="genetic-tournament-size" v-model="params.tournamentSize"
                       data-vv-as="tournament size" v-validate.initial="{ required: true, min_value: 1, max_value: params.populationSize, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-tournament-size')" class="help-block">{{ errors.first('genetic-tournament-size') }}</span>
            </div>
        </div>
        <div id="crossover">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-cross-prob')}">
                <label class="" for="crossover-prob">Crossover probability</label>
                <span class="form-tooltip" v-tooltip.right="'Probability that individual goes into crossover after selection.'"><i class="fas fa-question-circle"></i></span>
                <input class="form-control" type="number" min="0" max="1" step="0.05"
                       id="crossover-prob" name="genetic-cross-prob" v-model="params.crossoverProb"
                       data-vv-as="crossover probability" v-validate.initial="{ required: true, min_value: 0, max_value: 1, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-cross-prob')" class="help-block">{{ errors.first('genetic-cross-prob') }}</span>
            </div>

            <div class="form-group">
                <label class="" for="crossover-type">Crossover type</label>
                <span v-if="problemType === ProblemTypeEnum.BINARY" class="form-tooltip" v-tooltip.right="{content: 'Defines crossover mechanism:\nOne-point - Individuals are split at one point and\n     recombined.\nTwo-point - Individuals are split at two points and\n     recombined.\nUniform - Each bit of parent goes into first or\n     second offspring with equal probability.', class: 'tooltip-whitespace-wrap' }"><i class="fas fa-question-circle"></i></span>
                <span v-if="problemType === ProblemTypeEnum.PERMUTATION" class="form-tooltip" v-tooltip.right="{content: 'Defines crossover mechanism:\nOrder - Individual is copied to random point then \n     it starts copying values from second parent if \n     possible to preserve permutation.\nPartially matched - Two random points designates\n     section where values on corresponding\n     positions are swapped.\nCycle - Cycle starts at random point in first parent.\n     Next position of cycle is where gene has same\n     value as value at corresponding position in\n     other parent. Continue until the cycle is closed.\n     Leave the cycle how it is and swap all other\n     values between 2 parents.', class: 'tooltip-whitespace-wrap' }"><i class="fas fa-question-circle"></i></span>
                <select class="form-control" id="crossover-type" v-model="params.crossoverType">
                    <!--binary-->
                    <template v-if="problemType === ProblemTypeEnum.BINARY">
                        <option :value="CrossoverEnum.ONE_POINT">One-point</option>
                        <option :value="CrossoverEnum.TWO_POINT">Two-point</option>
                        <option :value="CrossoverEnum.UNIFORM">Uniform</option>
                    </template>
                    <!--permutation-->
                    <template v-if="problemType === ProblemTypeEnum.PERMUTATION">
                        <option :value="CrossoverEnum.ORDER">Order</option>
                        <option :value="CrossoverEnum.PMX">Partially matched</option>
                        <option :value="CrossoverEnum.CYCLE">Cycle</option>
                    </template>
                </select>
            </div>
        </div>
        <div id="mutation">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-mutation-rate')}">
                <label class="" for="mutation-rate">Mutation rate</label>
                <span v-if="problemType === ProblemTypeEnum.BINARY" class="form-tooltip" v-tooltip.right="'Mutation rate specifies with which probability is each bit inverted.'"><i class="fas fa-question-circle"></i></span>
                <span v-if="problemType === ProblemTypeEnum.PERMUTATION" class="form-tooltip" v-tooltip.right="'Mutation rate specifies with which probability is each value swapped with another.'"><i class="fas fa-question-circle"></i></span>
                <input class="form-control" type="number" min="0" max="1" step="0.001"
                       id="mutation-rate" name="genetic-mutation-rate" v-model="params.mutationRate"
                       data-vv-as="mutation rate" v-validate.initial="{ required: true, min_value: 0, max_value: 1, regex: /^([0-9]*[.])?[0-9]+$/ }"
                >
                <span v-show="errors.has('genetic-mutation-rate')" class="help-block">{{ errors.first('genetic-mutation-rate') }}</span>
            </div>
        </div>
        <div id="new-generation">
            <div class="form-group" v-bind:class="{'has-error': errors.has('genetic-elitism')}">
                <label class="" for="elitism">Elitism</label>
                <span class="form-tooltip" v-tooltip.right="'How many best individuals are copied from previous generation to the new one. Note that the greater elitism is the fewer new individuals are created.'"><i class="fas fa-question-circle"></i></span>
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
    import { getProblemClassFromId } from '@/services/classResolver';
    import { mapGetters, mapMutations } from 'vuex';
    import { SelectionEnum } from '@/computing/methods/genetic/Selection';
    import { CrossoverEnum } from '@/computing/methods/genetic/Crossover';
    import { ProblemTypeEnum } from '@/computing/problems/Problem';

    const methodId = 'genetic';

    export default {
        data () {
            return {
                SelectionEnum: SelectionEnum,
                CrossoverEnum: CrossoverEnum,
                ProblemTypeEnum: ProblemTypeEnum,
                $storeUnsubscribe: null,
                problemType: "" ,// drzi aktualni typ problemu
                params: this.$store.getters.getMethodParams(methodId)
            }
        },

        watch: {
            params: {
                handler: function (params) {
                    this.$store.commit('updateParams', {id: methodId, data: params})
                },
                deep: true
            },
            errors: {
                handler: function (errors) {
                    this.$store.commit('updateParamsValidation', {id: methodId, data: errors.items.length === 0});
                },
                deep: true
            }
        },
        //problem
        computed: {
            ...mapGetters([
                'selectedProblemId'
            ])
        },
        mounted() {
            this.updateProblemType(); // inicializace

            this.$storeUnsubscribe = this.$store.subscribe((mutation) => {
                // vyvolano pri zmene stavu ve vuex
                if (mutation.type === 'selectProblem') {
                    this.updateProblemType(); // update pri zmene
                }
            });
        },

        destroyed() {
            if (this.$storeUnsubscribe) this.$storeUnsubscribe();
        },
        methods: {
            updateProblemType() {
                var type = this.problemType;
                this.problemType = getProblemClassFromId(this.selectedProblemId).prototype.getType();
                if (type !== this.problemType) {
                    //reset crossover method
                    switch (this.problemType) {
                        case ProblemTypeEnum.BINARY:
                            this.params.crossoverType = CrossoverEnum.ONE_POINT;
                            break;
                        case ProblemTypeEnum.PERMUTATION:
                            this.params.crossoverType = CrossoverEnum.ORDER;
                            break;
                    }
                }
            }
        }
    }

</script>
