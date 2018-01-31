<template>
    <div class="results">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-if="computingIsProcessingResults" src="/static/img/loading_01.svg" alt="Processing results">

        <button class="btn btn-default" v-on:click="addData">addData</button>

        <div id="scatterChart"></div>
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
    },

    computed: {
        ...mapGetters([
            'computingIsRunning',
            'computingIsProcessingResults'
        ])
    },

    methods: {
        addData() {
            var d3 = dc.d3;
            var crossfilter = dc.crossfilter;

            var simpleData = this.dataForMultipleLineChart.dataSets[0].data;

            simpleData = simpleData.map(function (x, i) {
                return {x: i, y: x};
            });
            
            this.chart1 = dc.scatterPlot('#scatterChart');

            var dataFilter = crossfilter(simpleData);
            var dim1 = dataFilter.dimension(function (d) {
                return [d.x, d.y];
            });
            var group1 = dim1.group();

            this.chart1
                .dimension(dim1)
                .x(dc.d3.scale.linear().domain([0, this.dataForMultipleLineChart.labels.length]))
                .y(dc.d3.scale.linear().domain([0, 110]))
                .group(group1)
                .brushOn(false)
                .transitionDuration(0);
            this.chart1.render();

            // var chart2 = dc.lineChart('#lineChart');

            // var dataFilter2 = crossfilter(this.simpleData);
            // var dim2 = dataFilter2.dimension(function (d, c) {
            //     return d;
            // });
            // var group2 = dim2.group().reduceSum(function (d) {
            //     return d;
            // });

            // chart2
            //     .dimension(dim2)
            //     .x(dc.d3.scale.linear().domain([0, 1000]))
            //     // .y(dc.d3.scale.linear().domain([0, 10]))
            //     .group(group2)
            //     // .x(d3.scale.ordinal())
            //     // .xUnits(dc.units.ordinal)
            //     .valueAccessor(function(kv) { return +kv.key; })
            //     .brushOn(false);

            // chart2.render();
        }
    }
}
</script>

<style scoped>
    .chart {
        padding: 1em 0;
    }
</style>
