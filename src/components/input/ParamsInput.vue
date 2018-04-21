<template>
    <div class="paramsSelection">
        <form novalidate>
            <keep-alive>
                <component :is="selectedMethodId"></component>
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
        ...mapGetters([
            'selectedMethodId'
        ])
    }
}
</script>

<style scoped>
</style>
