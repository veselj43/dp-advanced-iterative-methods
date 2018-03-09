<template>
    <div class="paramsSelection">
        
        <keep-alive>
            <component :is="methodKey"></component>
        </keep-alive>
            
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
        ...mapState({
            methodKey: (state) => state.inputParams.params.method.id
        })
    }
}
</script>

<style scoped>
</style>
