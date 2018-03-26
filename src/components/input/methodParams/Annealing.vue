<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('startTemp')}">
            <label class="" for="param1">Starting temperature</label>
            <span class="form-tooltip" v-tooltip.right="'Temperatue at the start of calculation'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="input-group">
                <input class="form-control" type="number" id="param1" v-model="params.start_temp" placeholder=""
                name="startTemp"
                data-vv-as="starting temperature"
                v-validate.initial="{ required: true, min_value: +params.min_temp + 1, regex: /^[0-9]+$/ }"
                >
                <div class="input-group-addon btn btn-default" v-on:click="hello" v-tooltip.right="'Automatically calculate'">Set</div>
            </div>
            <span v-show="errors.has('startTemp')" class="help-block">{{ errors.first('startTemp') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('coolingCoef')}">
            <label class="" for="param2">Cooling coefficient</label>
            <span class="form-tooltip" v-tooltip.right="'How fast is the cooling, next temperature = current temperature * cooling coefficient'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input class="form-control" type="number" min="0" max="1" step="0.001" id="param2" v-model="params.cool_coef" placeholder=""
            name="coolingCoef"
            v-validate.initial="{ required: true, min_value: 0.001, max_value: 1, regex: /^(0(\.\d+)?|1(\.0+)?)$/ }"
            >
            <span v-show="errors.has('coolingCoef')" class="help-block">{{ errors.first('coolingCoef') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('minTemp')}">
            <label class="" for="param3">Minimal temperature</label>
            <span class="form-tooltip" v-tooltip.right="'When the method reaches this temperatue it stops'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="param3" v-model="params.min_temp" placeholder=""
                name="minTemp"
                v-validate.initial="{ required: true, min_value: 0.1, max_value: +params.start_temp - 1, regex: /^[0-9]+$/ }"
                >
                <span v-show="errors.has('minTemp')" class="help-block">{{ errors.first('minTemp') }}</span>
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('equil')}">
            <label class="" for="param4">Equilibrium</label>
            <span class="form-tooltip" v-tooltip.right="'Size of the inner cyrcle, how many configurations the algorithm tries before changing temperature'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" id="param4" v-model="params.equil" placeholder=""
                name="equil"
                v-validate.initial="{ required: true, min_value: 1, regex: /^[0-9]+$/ }"
                >
                <span v-show="errors.has('equil')" class="help-block">{{ errors.first('equil') }}</span>
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

    methods: {
        hello() {
            console.log('hello');
        }
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
