<template>
    <div class="params">
        <div class="form-group">
            <label class="" for="param1">Starting temperature</label>
            <span class="form-tooltip" v-tooltip.right="'Temperatue at the start of calculation'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="param1" v-model="params.start_temp" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="param2">Cooling coefficient</label>
            <span class="form-tooltip" v-tooltip.right="'How fast is the cooling, next temperature = current temperature * cooling coefficient'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" min="0" max="1" step="0.001" id="param2" v-model="params.cool_coef" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="param3">Minimal temperature</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="param3" v-model="params.min_temp" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="param4">Equilibrium</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="param4" v-model="params.equil" placeholder="">
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
