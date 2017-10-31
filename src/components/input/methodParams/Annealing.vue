<template>
    <div class="params">
        <div class="form-group">
            <label class="col-md-8 control-label" for="param1">param1</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="param1" v-model="params.param1" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-8 control-label" for="param2">param2</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="param2" v-model="params.param2" placeholder="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            params: _.cloneDeep(this.$store.state.inputParams.params.methodParams.annealing)
        };
    },
    watch: {
        params: {
            handler: function (params) {
                this.$store.commit('updateParams', {id: 'annealing', data: params});
            },
            deep: true
        }
    }
}
</script>
