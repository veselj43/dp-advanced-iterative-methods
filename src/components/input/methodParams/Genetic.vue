<template>
    <div class="params">
        <div class="form-group">
            <label class="" for="generation-size" data-toggle="tooltip"
                   title="Number of individuals in each generation">Number of individuals</label>
            <div class="">
                <input class="form-control" type="number" id="generation-size" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="" for="generation-count">Number of generations</label>
            <div class="">
                <input class="form-control" type="number" id="generation-count" placeholder="">
            </div>
        </div>
        <div id="selection">
            <div class="form-group">
                <label class="" for="selection-type">Selection type</label>
                <div class="">
                    <select class="form-control" id="selection-type" v-model="params.param1"> <!--v-on:change="selectionChange(this)"-->
                        <option value="1">Roulette</option>
                        <option value="2">Tourney</option>
                    </select>
                </div>
            </div>


            <div class="form-group" id="tourney" v-if="params.param1 === '2'">
                <label class="" for="tourney-size">Tourney size</label>
                <div class="">
                    <input class="form-control" type="number" id="tourney-size" v-model="params.param2" placeholder="">
                </div>
            </div>
        </div>
        <!--
        <div class="form-group">
            <label class="" for="param1">Param1</label>
            <div class="">
                <input class="form-control" type="number" id="param1" v-model="params.param1" placeholder="">
            </div>
        </div>
        -->
        <div id="crossover">
            <div class="form-group">
                <label class="" for="crossover-type">Crossover type</label>
                <div class="">
                    <select class="form-control" id="crossover-type">
                        <option value=1>one-point</option>
                        <option value=2>two-point</option>
                        <option value=3>uniform</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="mutation">
            <div class="form-group">
                <label class="" for="mutation-rate">Mutation rate</label>
                <div class="">
                    <input class="form-control" type="number" id="mutation-rate" placeholder="">
                </div>
            </div>
        </div>
        <div id="new-generation">
            <div class="form-group">
                <label class="" for="elitism">Elitism</label>
                <div class="">
                    <input class="form-control" type="number" id="elitism" placeholder="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                params: _.cloneDeep(this.$store.state.inputParams.params.methodParams.genetic)
            }
        },
        watch: {
            params: {
                handler: function (params) {
                    this.$store.commit('updateParams', {id: 'genetic', data: params})
                },
                deep: true
            }
        }
    }

</script>
