<template>
    <div class="params">
        <div class="form-group" v-bind:class="{'has-error': errors.has('startTemp')}">
            <label class="" for="param1">Starting temperature</label>
            <span class="form-tooltip" v-tooltip.right="'Temperature at the start of calculation'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="input-group">
                <input class="form-control" type="number" min="0" step="1" id="param1" v-model="params.start_temp" placeholder=""
                name="startTemp"
                data-vv-as="starting temperature"
                v-validate.initial="{ required: true, min_value: +params.min_temp, regex: /^[0-9]+$/ }"
                >
                <div class="input-group-addon btn btn-default" v-on:click="calcTemp" v-tooltip.right="'Automatically calculate'">Set</div>
            </div>
            <span v-show="errors.has('startTemp')" class="help-block">{{ errors.first('startTemp') }}</span>
            <div id="loading">
              <img id="loading-image" style="display: none;" src="@/assets/loading_01.svg" alt="Loading..." />
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('coolingCoef')}">
            <label class="" for="param2">Cooling coefficient</label>
            <span class="form-tooltip" v-tooltip.right="'How fast is the cooling, next temperature = current temperature * cooling coefficient'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <input class="form-control" type="number" min="0" max="1" step="0.001" id="param2" v-model="params.cool_coef" placeholder=""
            name="coolingCoef"
            data-vv-as="cooling coefficient"
            v-validate.initial="{ required: true, min_value: 0.001, max_value: 1, regex: /^(0(\.\d+)?|1(\.0+)?)$/ }"
            >
            <span v-show="errors.has('coolingCoef')" class="help-block">{{ errors.first('coolingCoef') }}</span>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('minTemp')}">
            <label class="" for="param3">Minimal temperature</label>
            <span class="form-tooltip" v-tooltip.right="'When the method reaches this temperatue it stops'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="">
                <input class="form-control" type="number" min="0.0001" step="0.01" id="param3" v-model="params.min_temp" placeholder=""
                name="minTemp"
                data-vv-as="minimal temperature"
                v-validate.initial="{ required: true, min_value: 0.0001, max_value: +params.start_temp, regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/ }"
                >
                <span v-show="errors.has('minTemp')" class="help-block">{{ errors.first('minTemp') }}</span>
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('equil')}">
            <label class="" for="param4">Inner cycle</label>
            <span class="form-tooltip" v-tooltip.right="'Size of the inner cyrcle, how many configurations the algorithm tries before changing temperature'"><span class="glyphicon glyphicon-question-sign"></span></span>
            <div class="input-group">
                <input class="form-control" type="number" min="1" step="1" id="param4" v-model="params.innerCycle" placeholder=""
                name="equil"
                data-vv-as="inner cycle"
                v-validate.initial="{ required: true, min_value: 1, regex: /^[0-9]+$/ }"
                >
                <div class="input-group-addon btn btn-default" v-on:click="calcInnerCycle" v-tooltip.right="'Automatically calculate'">Set</div>
            </div>
            <span v-show="errors.has('equil')" class="help-block">{{ errors.first('equil') }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WorkerManager } from '@/computing/WorkerManager.js';
import IterativeMethodWorker from '@/computing/IterativeMethodWorker.js';
import { getDbFileContent } from "@/services/fileReader";
import * as Annealing from '@/computing/methods/Annealing';
import * as Vertex from '@/computing/problems/MinimalVertexCover';
import * as Salesman from '@/computing/problems/TravellingSalesman';
import * as SAT from '@/computing/problems/SAT';
import * as Knapsack from '@/computing/problems/Knapsack';

const methodId = 'annealing';

export default {
    data () {
        return {
            params: this.$store.getters.getMethodParams(methodId)
        };
    },
    computed: {
        ...mapGetters([
            'getSelectedFile',
            'selectedMethodId',
            'selectedProblemId'
        ])
    },
    mounted () {
        this.workerManager = new WorkerManager(this, IterativeMethodWorker);

        this.workerManager
            .setHandler('result', this.onResult)
    },
    methods: {
        /**
         * Calculate starting temp for selected instance problem
         * @return {null} returns nothing
         */
        calcTemp() {
            document.getElementById('loading').style.display = 'block';
            if (this.workerManager.inProgress) {
                this.$notifier.put("workerInfo", "Already computing starting temperature.", "info");
                return;
            }

            getDbFileContent(this.getSelectedFile).then((content) => {
                this.workerManager.sendWork('computeStartingTemp', content, this.selectedProblemId);
            }, (errorMsg) => {
                this.$notifier.put("inFile", errorMsg);
            });
        },

        /**
         * Called when starting temp is calculated to set it to the calculated value, terminates the worker
         * @param  {int} result calculated value
         * @return {null}  has no return
         */
        onResult(result) {
            this.workerManager.terminate();
            this.params.start_temp = result;
            this.params.min_temp = result / 10;
        },

        /**
         * Set value for inner cycle based on selected instance size
         */
        calcInnerCycle() {
          var params = this.getSelectedFile.params;

          if(this.selectedProblemId === 0) {
              this.params.innerCycle = params.noVariables * 2;
          }

          else if(this.selectedProblemId === 1) {
              if(params.type === "Shortest") this.params.innerCycle = params.noNodesToVisit * 2;
              else this.params.innerCycle = params.noNodes * 2
          }

          else if(this.selectedProblemId === 2) {
              this.params.innerCycle = params.noItems * 2;
          }

          else if(this.selectedProblemId === 3) {
              this.params.innerCycle = params.size * 2;
          }

          else if(this.selectedProblemId === 4) {
              this.params.innerCycle = params.noCities * 2;
          }
        }
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
