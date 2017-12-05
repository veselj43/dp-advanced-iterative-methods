<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuIterationLimit')}">
            <label class="" for="multiplierLimit">Iteration limit</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="multiplierLimit" v-model="params.multiplierLimit" name="tabuIterationLimit" v-validate.initial="{ required: true, max_value: 1000, regex: /^[0-9]+$/ }">
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSize')}">
            <label class="" for="multiplierTabuSize">State tabu size</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.multiplierTabuSize" name="tabuSize" v-validate.initial="{ required: true, max_value: 1000, regex: /^[0-9]+$/ }">
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSize2')}">
            <label class="" for="tabuSize2">Changes tabu size</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="tabuSize2" v-model="params.tabuSize2" name="tabuSize2" v-validate.initial="{ required: true, max_value: 1000, regex: /^[0-9]+$/ }">
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
        },
        errors: {
            handler: function (errors) {
                this.$store.commit('updateParamsValidation', {data: errors.items.length === 0});
            },
            deep: true
        }
    }
}
</script>
