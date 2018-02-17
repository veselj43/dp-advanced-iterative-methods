<template>
    <div id="comparisonChart"></div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    props: {
        width: Number
    },

    data() {
        return {
            comparingResults: this.$store.state.outputData.comparingResults,
            lastActiveCount: 0,
            labels: [],
            options: {
                minWidth: 100,
                width: 800,
                height: 300,
                margin: {
                    right: 200,
                }
            },
        }
    },

    mounted() {
        window.addEventListener("resize", this.windowResize);
        
        this.multipleLineChart = dc.seriesChart('#comparisonChart');

        this.initMultipleLineChart();
    },

    methods: {
        windowResize() {
            var options = this.options;
            options.width = Math.max(options.minWidth + options.margin.right, this.width, document.getElementById('comparisonChart').offsetWidth);

            this.multipleLineChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.multipleLineChart.redraw();
        },

        processData(i) {
            var dataSets = this.comparingResults.chart.dataSets;

            if (dataSets.length === 0) return [];

            var labels = dataSets.map((dataSet) => dataSet.label);
            dataSets = dataSets.map((dataSet) => dataSet.data);

            var mergedDatasets = [];
            var data = dataSets[i];

            return data.map((value, j) => ({dataset: i, index: j, value: value}));
        },
        
        initMultipleLineChart() {
            var multipleLineChart = this.multipleLineChart;
            var chartOptions = this.options;

            this.ndx = crossfilter(this.processData(0));

            var runDimension = this.ndx.dimension(d => [+d.dataset, +d.index]);
            var runGroup = runDimension.group().reduceSum(d => +d.value);

            var componentContext = this;

            multipleLineChart
                .width(chartOptions.width).height(chartOptions.height)
                .x(d3.scale.linear().domain([0, 100]))
                .y(d3.scale.linear().domain([0, 100]))
                .yAxisLabel("Fitness")
                .xAxisLabel("States checked")
                .elasticX(true)
                .elasticY(true)
                .brushOn(false)
                // .mouseZoomable(true)
                .renderHorizontalGridLines(true)
                .transitionDuration(0)
                .legend(dc.legend().x(chartOptions.width - chartOptions.margin.right + 15).y(5).itemHeight(13).gap(5))
                .seriesAccessor(function(d) {return componentContext.labels[d.key[0]] + " (" + d.key[0] + ")";})
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    return dc.lineChart(c).xyTipsOn(false);
                })
                .dimension(runDimension)
                .group(runGroup);

            multipleLineChart.margins().right = chartOptions.margin.right;
            multipleLineChart.margins().bottom += 5;

            multipleLineChart.render();
        },
    },

    watch: {
        'comparingResults.info.items'(newValue, oldValue) {
            var newActiveCount = this.comparingResults.info.activeCount;

            // dataset(s) removed - needs to be cleared
            var remove = (this.lastActiveCount && this.lastActiveCount > newActiveCount);

            // dataset replaced with just computed files and the length is the same
            remove = remove || ((
                this.lastActiveCount === 1 && newActiveCount === 1) && 
                (Object.keys(newValue)[0] !== Object.keys(oldValue)[0])
            );

            this.labels = this.comparingResults.chart.dataSets.map((dataSet) => dataSet.label);

            if (remove) {
                this.ndx.remove();
            }
            for (var i = (remove) ? 0 : this.lastActiveCount; i < newActiveCount; i++) {
                this.ndx.add(this.processData(i));
            }

            this.lastActiveCount = newActiveCount;

            this.multipleLineChart.redraw();

            // first load of the component
            if (newActiveCount === 1) {
                this.windowResize();
            }
        }
    },
}
</script>
