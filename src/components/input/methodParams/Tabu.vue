<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuIterationLimit')}">
            <label class="" for="iterationLimit">Iteration limit</label>
            <router-link to="/help/Tabu#input" class="form-tooltip" v-tooltip.right="'Limit of states choosed as next step'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <input type="number" min="1"
                class="form-control" id="iterationLimit" name="tabuIterationLimit"
                v-model="params.iterationLimit"
                data-vv-as="iteration limit" v-validate.initial="{ required: true, min_value: 1, max_value: 20000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuIterationLimit')" class="help-block">{{ errors.first('tabuIterationLimit') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuNeighborsToCheck')}">
            <label class="" for="neighborsToCheck">Neighbor states to check</label>
            <router-link to="/help/Tabu#input" class="form-tooltip" v-tooltip.right="'How many neighbor configurations to check in one iteration'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <div class="input-group">
                <input type="number" min="1" max="100"
                    class="form-control" id="neighborsToCheck" name="tabuNeighborsToCheck"
                    v-model="params.neighborsToCheck"
                    data-vv-as="iteration limit" v-validate.initial="{ required: true, min_value: 1, max_value: 100, regex: /^[0-9]+$/ }"
                >
                <div class="input-group-addon">%</div>
            </div>
            <span v-show="errors.has('tabuNeighborsToCheck')" class="help-block">{{ errors.first('tabuNeighborsToCheck') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSize')}">
            <label class="" for="tabuSize">State tabu size</label>
            <router-link to="/help/Tabu#input" class="form-tooltip" v-tooltip.right="'Number of states in tabu queue'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <input type="number" min="0" max="1000"
                class="form-control" id="tabuSize" name="tabuSize"
                v-model="params.tabuSize"
                data-vv-as="state tabu size" v-validate.initial="{ required: true, min_value: 0, max_value: 100000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuSize')" class="help-block">{{ errors.first('tabuSize') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuSizeShort')}">
            <label class="" for="tabuSizeShort">Changes tabu size</label>
            <router-link to="/help/Tabu#input" class="form-tooltip" v-tooltip.right="'Number of iterations for which is configuration variable change tabu'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <input type="number" min="0" max="1000"
                class="form-control" id="tabuSizeShort" name="tabuSizeShort"
                v-model="params.tabuSizeShort"
                data-vv-as="changes tabu size" v-validate.initial="{ required: true, min_value: 0, max_value: 10000, regex: /^[0-9]+$/ }"
            >
            <span v-show="errors.has('tabuSizeShort')" class="help-block">{{ errors.first('tabuSizeShort') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('tabuStartingConfig')}">
            <label class="" for="tabuStartingConfig">Starting configuration</label>
            <router-link to="/help/Tabu#input" class="form-tooltip" v-tooltip.right="'Random or default (ex.: all false or path by node indexes)'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <select class="form-control" id="tabuStartingConfig" v-model="params.randomStart">
                <option :value="false">Default</option>
                <option :value="true">Random</option>
            </select>
            <span v-show="errors.has('tabuStartingConfig')" class="help-block">{{ errors.first('tabuStartingConfig') }}</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

const methodId = 'tabu';

export default {
    data () {
        return {
            params: this.$store.getters.getMethodParams(methodId)
        };
    },

    watch: {
        params: {
            handler: function (params) {
                this.$store.commit('updateParams', {id: methodId, data: params});
            },
            deep: true
        },
        errors: {
            handler: function (errors) {
                this.$store.commit('updateParamsValidation', {id: methodId, data: errors.items.length === 0});
            },
            deep: true
        }
    }
}
</script>
