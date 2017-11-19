<template>
    <div class="problemSelect">
        <form class="form">

            <div class="form-group">
                <label for="problemKey">Problem</label>
                <select class="form-control" id="problemKey" v-model="problemKey">
                    <option v-for="(problem, index) in problemEnum" :value="index">{{problem.text}}</option>
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
    .problemSelect {
    }
</style>
