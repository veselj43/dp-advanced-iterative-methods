<template>
    <div class="results">
        <h3>Results</h3>

        <live-line-chart class="chart"
            v-bind="liveData.chart"
            :height="300"
        ></live-line-chart>

        <div class="best">

            <table v-if="!computingStatus.bestResult" class="table table-bordered table-hover">
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

            <table v-else class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Fitness</th>
                        <th>States checked</th>
                        <th>Processing time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{computingStatus.bestResult.cost}}</td>
                        <td>{{computingStatus.bestResult.counter}}</td>
                        <td>{{computingStatus.bestResult.processTime | parseTime}}</td>
                    </tr>
                </tbody>
            </table>

            <conf-visual :resultObj="computingStatus.bestResult"></conf-visual>

        </div>
    </div>
</template>

<script>
import LiveLineChart from './visualisation/LiveLineChart';
import ConfVisual from './visualisation/Configuration';

export default {
    components: {
        LiveLineChart,
        ConfVisual
    },

    data() {
        return {
            computingStatus: this.$store.state.liveData.computingStatus,
            liveData: this.$store.state.liveData.data
        }
    }
}
</script>

<style scoped>
    .chart {
        padding: 1em 0;
    }
</style>
