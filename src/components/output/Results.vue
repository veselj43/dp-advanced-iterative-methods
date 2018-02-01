<template>
    <div class="results">
        <h3>Results <small v-if="computingIsProcessingResults">{{computingStatus.text}}</small></h3>
        <img v-if="computingIsProcessingResults" src="/static/img/loading_01.svg" alt="Processing results">

        <button class="btn btn-default" v-on:click="addData">addData</button>

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
            var simpleData = this.dataForMultipleLineChart.dataSets[0].data;
            var simpleData2 = this.dataForMultipleLineChart.dataSets[1].data;

            var chart2 = dc.compositeChart('#lineChart');

            var dataFilter1 = crossfilter(simpleData);
            var dim1 = dataFilter1.dimension((d, c) => c);
            var group1 = dim1.group().reduceSum((d) => d);

            var dataFilter2 = crossfilter(simpleData2);
            var dim2 = dataFilter2.dimension((d, c) => c);
            var group2 = dim2.group().reduceSum((d) => (d - 10));

            chart2
                .width(800).height(300)
                .margins({ top: 10, right: 10, bottom: 20, left: 40 })
                .dimension(dim1)
                .compose([
                    dc.lineChart(chart2)
                        .group(group1)
                        .colors('#f00'),
                    dc.lineChart(chart2)
                        .group(group2)
                        .colors('#00f')
                ])
                .x(d3.scale.linear().domain([0, this.dataForMultipleLineChart.labels.length]))
                .y(d3.scale.linear().domain([0, 100]))
                .elasticX(true)
                .brushOn(false)
                .transitionDuration(0);

            chart2.render();
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
