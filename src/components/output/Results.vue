<template>
    <div class="results">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-if="computingIsProcessingResults" src="/static/img/loading_01.svg" alt="Processing results">

        <div id="lineChart"></div>

        <!-- <div v-if="computingIsRunning || computingIsProcessingResults">

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

        <div v-else>
            <p>Compute an instance or check instances to compare from the right panel.</p>
        </div> -->

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LiveLineChart from './visualisation/LiveLineChart';
import MultipleLineChart from './visualisation/MultipleLineChart';
import ConfVisual from './visualisation/Configuration';

import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    components: {
        LiveLineChart,
        MultipleLineChart,
        ConfVisual
    },

    data() {
        return {
            maxDatasetLength: 0,

            computingStatus: this.$store.state.liveData.computingStatus,
            liveData: this.$store.state.liveData.data,
            comparingResultsInfo: this.$store.state.outputData.comparingResults.info,
            dataForMultipleLineChart: this.$store.state.outputData.comparingResults.chart
        }
    },

    computed: {
        ...mapGetters([
            'computingIsRunning',
            'computingIsProcessingResults'
        ])
    },

    mounted() {
        this.compositeChart = dc.compositeChart('#lineChart');
        this.compositeChart
            .width(800).height(300)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .elasticX(true)
            .elasticY(true)
            .brushOn(false)
            .transitionDuration(0);
        this.compositeChart.render();
    },

    methods: {
        updateCompositeChart(options) {
            var compositeChart = this.compositeChart;
            var dataSets = this.dataForMultipleLineChart.dataSets;

            if (dataSets.length === 0) return;

            var colors = ['#f00', '#00f', '#f0f', '#ff0', '#0ff'];
            var maxLengthIndex = 0;

            dataSets = dataSets.map((dataSet) => dataSet.data);
            dataSets = dataSets.map((dataSet, i) => {
                maxLengthIndex = (dataSet.length > dataSets[maxLengthIndex].length) ? maxLengthIndex : i;
                var cf = crossfilter(dataSet);
                return cf.dimension((d, c) => c);
            });
            
            var dim = dataSets[maxLengthIndex];

            dataSets = dataSets.map((dataSet, i) => {
                var grp = dataSet.group().reduceSum((d) => d);
                return dc.lineChart(compositeChart).group(grp).colors(colors[i % colors.length]);
            });

            compositeChart
                .dimension(dim)
                .compose(dataSets);

            if (options && options.render) {
                compositeChart.render();
            }
            else {
                compositeChart.redraw();
            }
        }
    },

    watch: {
        'dataForMultipleLineChart.dataSets.length'(newValue, oldValue) {
            var oldMaxDatasetLength = this.maxDatasetLength;
            this.maxDatasetLength = Math.max(...this.dataForMultipleLineChart.dataSets.map(d => d.data.length));
            if (
                newValue < oldValue || 
                oldValue === 0 ||
                oldMaxDatasetLength < this.maxDatasetLength
            ) {
                this.updateCompositeChart({ render: true });
            }
            else {
                this.updateCompositeChart();
            }
        }
    }
}
</script>

<style scoped>
    .chart {
        padding: 1em 0;
    }

    div.dc-chart {
        float: unset;
    }
</style>
