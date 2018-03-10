<template>
    <div class="results" id="chartBaseContainer">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-show="computingIsProcessingResults" src="@/assets/loading_01.svg" alt="Processing results">

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
import { mapGetters } from 'vuex';
import ConfVisual from './visualisation/Configuration';
import Tabu from './methodResult/tabu/Tabu';
// TODO import and add to components other methods

export default {
    components: {
        ConfVisual,
        Annealing: Tabu, // change here (delete Tabu)
        Genetic: Tabu, // change here (delete Tabu)
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

    h3, img {
        display: inline-block;
    }

    img {
        height: 1.5em;
        vertical-align: text-bottom;
    }

    div.dc-chart {
        padding: 1em 0;
        float: unset;
    }
</style>
