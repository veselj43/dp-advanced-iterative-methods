<template>
    <div class="params">
        <div class="form-group">
            <label class="col-md-8 control-label" for="multiplierLimit">multiplierLimit</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="multiplierLimit" v-model="params.multiplierLimit" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-8 control-label" for="multiplierTabuSize">multiplierTabuSize</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.multiplierTabuSize" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-8 control-label" for="tabuSize2">tabuSize2</label>
            <div class="col-md-4">
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
