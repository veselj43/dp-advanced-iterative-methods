<template>
    <div class="results" id="chartBaseContainer">
        <div class="row">
            <div class="col-md-6">
                <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
                <img v-show="computingIsProcessingResults" src="@/assets/loading_01.svg" alt="Processing results">
            </div>
            <div class="col-md-6 problem-info text-right">
                <h3>
                    <i v-if="selectedProblem.info.goal === 'min'" 
                        class="material-icons trending-down btn-primary"
                        v-tooltip.left="'Minimalization problem'">
                        trending_down
                    </i>
                    <i v-if="selectedProblem.info.goal === 'max'" 
                        class="material-icons trending-up btn-primary"
                        v-tooltip.left="'Maximalization problem'">
                        trending_up
                    </i>
                    {{selectedProblem.text}} 
                    <small>{{selectedProblem.info.description}}</small>
                </h3>
            </div>
        </div>

        <div v-show="methodResultActiveSection">

            <!-- <keep-alive> -->
                <component
                    :is="methodResultComponent"
                    :activeSection="methodResultActiveSection">
                </component>
            <!-- </keep-alive> -->

            <conf-visual></conf-visual>

        </div>

        <div v-show="!methodResultActiveSection">
            <p>Compute an instance or check instances to compare from the right panel.</p>
        </div>

    </div>
</template>

<script>
import { mapsState, mapGetters, mapState } from 'vuex';
import ConfVisual from './visualisation/Configuration';
import Tabu from './methodResult/tabu/Tabu';
import Genetic from './methodResult/genetic/Genetic';
// TODO import and add to components other methods

export default {
    components: {
        ConfVisual,
        Annealing: Tabu, // change here (delete Tabu)
        Genetic,
        Tabu,
    },

    data() {
        return {
            computingStatus: this.$store.state.liveData.computingStatus,
        }
    },

    computed: {
        ...mapGetters([
            'computingIsRunning',
            'computingIsProcessingResults'
        ]),

        ...mapState({
            selectedProblem(state) {
                return state.inputParams.params.problem;
            }
        }),

        methodResultActiveSection() {
            var isRunning = this.computingIsRunning;
            var isProcessingResult = this.computingIsProcessingResults;
            var activeCount = this.$store.state.outputData.comparingResults.info.activeCount;

            if (isRunning || isProcessingResult) {
                return 'live';
            }
            if (activeCount > 0) {
                return 'comparison';
            }
            return null;
        },

        methodResultComponent() {
            return this.$store.getters.selectedMethodId;
        }
    },
}
</script>

<style scoped>
    #chartBaseContainer {
        width: 100%;
    }

    h3 {
        margin-top: 0;
    }

    h3, img {
        display: inline-block;
    }

    img {
        height: 1.5em;
        vertical-align: text-bottom;
    }

    .problem-info i {
        vertical-align: top;
        cursor: default;
    }

    div.dc-chart {
        padding: 1em 0;
        float: unset;
    }
</style>
