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
            comparingResults: this.$store.state.outputData.comparingResults,
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
                .compose([]);

            if (options && options.render) {
                multipleLineChart.render();
            }
            
            multipleLineChart.compose(dataSets);

            multipleLineChart.redraw();
        }
    },

    watch: {
        'comparingResults.info.items'(newValue, oldValue) {
            // nothing is actually rendered
            var redraw = (this.comparingResults.info.activeCount === 0);
            
            // dataset(s) removed - needs to be cleared
            redraw = redraw || (this.activeCount && this.activeCount > this.comparingResults.info.activeCount);

            // dataset replaced with just computed files and the length is the same
            redraw = redraw || ((
                this.activeCount === 1 && this.comparingResults.info.activeCount === 1) && 
                (Object.keys(newValue)[0] !== Object.keys(oldValue)[0])
            );
            this.activeCount = this.comparingResults.info.activeCount;

            // chart needs to be resized
            var oldMaxDatasetLength = this.maxDatasetLength;
            this.maxDatasetLength = Math.max(...this.comparingResults.chart.dataSets.map(d => d.data.length));
            redraw = redraw || oldMaxDatasetLength < this.maxDatasetLength;

            if (redraw) {
                this.updateMultipleLineChart({ render: true });
            }
            else {
                this.updateMultipleLineChart();
            }
        }
    },
}
</script>
