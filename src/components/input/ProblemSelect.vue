<template>
    <div class="problemSelect">
        <form class="form-horizontal">

            <div class="form-group">
                <label class="col-md-4 control-label" for="problemKey">Problem</label>
                <div class="col-md-8">
                    <select class="form-control" id="problemKey" v-model="problemKey">
                        <option v-for="(problem, index) in problemEnum" :value="index">{{problem.text}}</option>
                    </select>
                </div>
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
                this.$store.commit('selectProblem', value);
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
