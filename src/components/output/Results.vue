<template>
    <div class="results">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-if="computingIsProcessingResults" src="@/assets/loading_01.svg" alt="Processing results">

        <div v-show="computingIsRunning || computingIsProcessingResults">

            <live-chart></live-chart>

            <table class="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <th>Best found fitness</th>
                        <td>{{liveData.best}}</td>
                    </tr>
                    <tr>
                        <th>Actual finess</th>
                        <td>{{liveData.actual}}</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div v-show="comparingResultsInfo.activeCount > 0 && !(computingIsRunning || computingIsProcessingResults)">

            <comparison-chart></comparison-chart>

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Instance</th>
                        <th>Fitness</th>
                        <th>States checked</th>
                        <th>Processing time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in comparingResultsInfo.items" :key="index">
                        <td>{{item.instance}}</td>
                        <td>{{item.result.cost}}</td>
                        <td>{{item.result.counter}}</td>
                        <td>{{item.result.processTime | parseTime}}</td>
                    </tr>
                </tbody>
            </table>

            <conf-visual></conf-visual>

        </div>

        <div v-show="!(comparingResultsInfo.activeCount > 0 && !(computingIsRunning || computingIsProcessingResults))">
            <p>Compute an instance or check instances to compare from the right panel.</p>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LiveChart from './visualisation/LiveChart';
import ComparisonChart from './visualisation/ComparisonChart';
import ConfVisual from './visualisation/Configuration';

import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    components: {
        LiveChart,
        ComparisonChart,
        ConfVisual,
    },

    data() {
        return {
            maxDatasetLength: 0,

            computingStatus: this.$store.state.liveData.computingStatus,
            liveData: this.$store.state.liveData.data,
            comparingResultsInfo: this.$store.state.outputData.comparingResults.info,
            // dataForMultipleLineChart: this.$store.state.outputData.comparingResults.chart
        }
    },

    computed: {
        ...mapGetters([
            'computingIsRunning',
            'computingIsProcessingResults'
        ])
    },
}
</script>

<style scoped>
    div.dc-chart {
        padding: 1em 0;
        float: unset;
    }
</style>
