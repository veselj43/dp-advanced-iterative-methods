<template>
    <div class="paramsSelection">
        <form class="form-horizontal">

            <div class="form-group">
                <label class="col-md-4 control-label" for="problemKey">Problem</label>
                <div class="col-md-8">
                    <select class="form-control" id="problemKey" v-model="problemKey">
                        <option v-for="problem in problemEnum" :value="problem.id">{{problem.text}}</option>
                    </select>
                </div>
            </div>

            <keep-alive>
                <component :is="methodKey"></component>
            </keep-alive>

        </form>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import AnnealingParams from "./methodParams/Annealing"
import GeneticParams from "./methodParams/Genetic"
import TabuParams from "./methodParams/Tabu"

export default {
    components: {
        'Annealing': AnnealingParams,
        'Genetic': GeneticParams,
        'Tabu': TabuParams
    },

    computed: {
        problemKey: {
            get () {
                return this.$store.state.inputParams.params.problem.id
            },
            set (value) {
                this.$store.commit('selectProblem', value)
            }
        },
        ...mapState({
            methodKey: (state) => state.inputParams.params.method.id
        }),
        ...mapGetters([
            'problemEnum'
        ])
    }
}
</script>

<style scoped>
    .paramsSelection {
        padding: 1em;
    }
</style>
