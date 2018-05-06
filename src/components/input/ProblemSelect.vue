<template>
    <div class="problemSelect">
        <form class="form">

            <div class="form-group">
                <label for="problemKey">Problem</label>
                <router-link to="/help/Problems" class="form-tooltip" v-tooltip.right="'Problem to be solved by this algorithm. To learn more about problems and input formats see help.'"><i class="fas fa-question-circle"></i></router-link>
                <select class="form-control" id="problemKey" v-model="problemKey">
                    <option v-for="(problem, index) in problemEnum" :key="index" :value="index">{{problem.text}}</option>
                </select>
            </div>

        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        problemKey: {
            get () {
                return this.$store.state.inputParams.params.problem.id
            },
            set (value) {
                this.$store.dispatch('selectProblem', value);
            }
        },
        ...mapGetters([
            'problemEnum'
        ])
    }
}
</script>

<style scoped>
</style>
