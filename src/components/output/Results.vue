<template>
    <div class="results">
        <h3>Results</h3>

        <div v-if="computingStatus.isRunning">

            <live-line-chart class="chart"
                v-bind="liveData.chart"
                :height="300"
            ></live-line-chart>

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

        <div v-else-if="comparingResultsInfo.activeCount > 0">

            <multiple-line-chart class="chart"
                v-bind="dataForMultipleLineChart"
                :height="300"
            ></multiple-line-chart>

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
                    <tr v-for="item in comparingResultsInfo.items">
                        <td>{{item.instance}}</td>
                        <td>{{item.result.cost}}</td>
                        <td>{{item.result.counter}}</td>
                        <td>{{item.result.processTime | parseTime}}</td>
                    </tr>
                </tbody>
            </table>

            <conf-visual></conf-visual>

        </div>

        <div v-else>
            <p>Compute an instance or check instances to compare from the right panel.</p>
        </div>

    </div>
</template>

<script>
import LiveLineChart from './visualisation/LiveLineChart';
import MultipleLineChart from './visualisation/MultipleLineChart';
import ConfVisual from './visualisation/Configuration';

export default {
    components: {
        LiveLineChart,
        MultipleLineChart,
        ConfVisual
    },

    data() {
        return {
            computingStatus: this.$store.state.liveData.computingStatus,
            liveData: this.$store.state.liveData.data,
            comparingResultsInfo: this.$store.state.outputData.comparingResults.info,
            dataForMultipleLineChart: this.$store.state.outputData.comparingResults.chart
        }
    }
}
</script>

<style scoped>
    .chart {
        padding: 1em 0;
    }
</style>
