<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuIterationLimit')}">
            <label class="" for="iterationLimit">Iteration limit</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input type="number" min="1"
                class="form-control" id="iterationLimit" name="tabuIterationLimit"
                v-model="params.iterationLimit"
                data-vv-as="iteration limit" v-validate.initial="{ required: true, min_value: 1, max_value: 10000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuIterationLimit')" class="help-block">{{ errors.first('tabuIterationLimit') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSize')}">
            <label class="" for="tabuSize">State tabu size</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input type="number" min="0" max="1000"
                class="form-control" id="tabuSize" name="tabuSize"
                v-model="params.tabuSize"
                data-vv-as="state tabu size" v-validate.initial="{ required: true, min_value: 0, max_value: 1000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuSize')" class="help-block">{{ errors.first('tabuSize') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSizeShort')}">
            <label class="" for="tabuSizeShort">Changes tabu size</label>
            <span class="form-tooltip" v-tooltip.right="'Tooltip text'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input type="number" min="0" max="1000"
                class="form-control" id="tabuSizeShort" name="tabuSizeShort"
                v-model="params.tabuSizeShort"
                data-vv-as="changes tabu size" v-validate.initial="{ required: true, min_value: 0, max_value: 1000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuSizeShort')" class="help-block">{{ errors.first('tabuSizeShort') }}</span>
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
