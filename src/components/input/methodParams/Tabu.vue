<template>
    <div class="params">
        <div class="form-group">
            <label class="" for="multiplierLimit">Iteration limit</label>
            <div class="">
                <input class="form-control" type="number" id="multiplierLimit" v-model="params.multiplierLimit" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="multiplierTabuSize">State tabu size</label>
            <div class="">
                <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.multiplierTabuSize" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="tabuSize2">Changes tabu size</label>
            <div class="">
                <input class="form-control" type="number" id="tabuSize2" v-model="params.tabuSize2" placeholder="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            params: _.cloneDeep(this.$store.state.inputParams.params.methodParams.tabu)
        };
    },
    watch: {
        params: {
            handler: function (params) {
                this.$store.commit('updateParams', {id: 'tabu', data: params});
            },
            deep: true
        }
    }
}
</script>
