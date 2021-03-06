<template>
    <div class="results" id="chartBaseContainer">
        <h3>
            <span v-show="selectedProblem.info.goal === 'min'" v-tooltip.left="'Minimalization problem'">
                <i class="square-icon bg-primary fas fa-angle-double-down"></i>
            </span>
            <span v-show="selectedProblem.info.goal === 'max'" v-tooltip.left="'Maximalization problem'">
                <i class="square-icon bg-primary fas fa-angle-double-up"></i>
            </span>
            {{selectedProblem.text}}
            <small>{{selectedProblem.info.description}}</small>
        </h3>
        <img v-show="computingIsProcessingResults" src="@/assets/loading_01.svg" alt="Processing results">

        <div v-show="methodResultActiveSection">

            <component
                :is="methodResultComponent"
                :activeSection="methodResultActiveSection">
            </component>

            <conf-visual v-show="methodResultActiveSection === 'comparison'"></conf-visual>

        </div>

        <div v-show="!methodResultActiveSection">
            <p class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                Start run or check previous runs to compare from the right panel.
            </p>
        </div>

    </div>
</template>

<script>
import { mapsState, mapGetters, mapState } from 'vuex';
import ConfVisual from './visualisation/Configuration';
import Tabu from './methodResult/tabu/Tabu';
import Genetic from './methodResult/genetic/Genetic';
import Annealing from './methodResult/annealing/Annealing';

export default {
    components: {
        ConfVisual,
        Annealing, // change here (delete Tabu)
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

    .square-icon {
        width: 1em;
    }

    h3 {
        margin-top: 0;
        margin-right: .5em;
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
