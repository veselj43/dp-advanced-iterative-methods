<template>
    <div class="results">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-if="computingIsProcessingResults" src="/static/img/loading_01.svg" alt="Processing results">

        <div v-show="computingIsRunning || computingIsProcessingResults">

            <!-- <live-line-chart class="chart"
                v-bind="liveData.chart"
                :height="300"
            ></live-line-chart> -->
            <div id="liveLineChart"></div>

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

            <!-- <multiple-line-chart class="chart"
                v-bind="dataForMultipleLineChart"
                :height="300"
            ></multiple-line-chart> -->
            <div id="multipleLineChart"></div>

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
        this.multipleLineChart = dc.compositeChart('#multipleLineChart');
        this.multipleLineChart
            .width(800).height(300)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .elasticX(true)
            .elasticY(true)
            .brushOn(false)
            .transitionDuration(0);
        this.multipleLineChart.render();

        this.liveLineChart = dc.compositeChart('#liveLineChart');
        this.liveLineChart
            .width(800).height(300)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .brushOn(false)
            .transitionDuration(0);
        this.liveLineChart.render();
    },

    methods: {
        updateLiveLineChart(options) {
            var liveLineChart = this.liveLineChart;
            var liveData = this.liveData;

            if (options && options.init) {
                liveLineChart
                    .x(d3.scale.linear().domain([0, liveData.chart.labels.length + 100]))
                    .y(d3.scale.linear().domain([0, liveData.best + 10]))
                    .compose([]);
                liveLineChart.render();

                return;
            }

            var dim = crossfilter(liveData.chart.values).dimension((d, c) => c);
            var grp = dim.group().reduceSum((d) => d);

            liveLineChart
                .dimension(dim)
                .compose([
                    dc.lineChart(liveLineChart)
                        .group(grp)
                        .colors('red')
                ]);

            if (options && options.render) {
                liveLineChart.render();
            }
            else {
                liveLineChart.redraw();
            }
        },
        
        updateMultipleLineChart(options) {
            var multipleLineChart = this.multipleLineChart;
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
                return dc.lineChart(multipleLineChart).group(grp).colors(colors[i % colors.length]);
            });

            multipleLineChart
                .dimension(dim)
                .compose(dataSets);

            if (options && options.render) {
                multipleLineChart.render();
            }
            else {
                multipleLineChart.redraw();
            }
        }
    },

    watch: {
        'liveData.chart.values.length'(newValue, oldValue) {
            if (newValue < oldValue || oldValue === 0) {
                this.updateLiveLineChart({ init: true });
            }
            else {
                this.updateLiveLineChart();
            }
        },

        'dataForMultipleLineChart.dataSets.length'(newValue, oldValue) {
            var oldMaxDatasetLength = this.maxDatasetLength;
            this.maxDatasetLength = Math.max(...this.dataForMultipleLineChart.dataSets.map(d => d.data.length));
            if (
                newValue < oldValue || 
                oldValue === 0 ||
                oldMaxDatasetLength < this.maxDatasetLength
            ) {
                this.updateMultipleLineChart({ render: true });
            }
            else {
                this.updateMultipleLineChart();
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
