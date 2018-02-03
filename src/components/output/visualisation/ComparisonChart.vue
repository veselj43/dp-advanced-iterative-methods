<template>
    <div id="comparisonChart"></div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    data() {
        return {
            comparingResults: this.$store.state.outputData.comparingResults
        }
    },

    mounted() {
        this.multipleLineChart = dc.compositeChart('#comparisonChart');
        this.multipleLineChart
            .width(800).height(300)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .elasticX(true)
            .elasticY(true)
            .brushOn(false)
            .transitionDuration(0);
        this.multipleLineChart.render();
    },

    methods: {
        updateMultipleLineChart(options) {
            var multipleLineChart = this.multipleLineChart;
            var dataSets = this.comparingResults.chart.dataSets;

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
        'comparingResults.info.items'(newValue, oldValue) {
            var itemRemoved = (this.activeCount && this.activeCount > this.comparingResults.info.activeCount);
            this.activeCount = this.comparingResults.info.activeCount;
            
            var oldMaxDatasetLength = this.maxDatasetLength;
            this.maxDatasetLength = Math.max(...this.comparingResults.chart.dataSets.map(d => d.data.length));

            if (
                this.comparingResults.info.activeCount === 0 ||
                itemRemoved ||
                oldMaxDatasetLength < this.maxDatasetLength
            ) {
                this.updateMultipleLineChart({ render: true });
            }
            else {
                this.updateMultipleLineChart();
            }
        }
    },
}
</script>
