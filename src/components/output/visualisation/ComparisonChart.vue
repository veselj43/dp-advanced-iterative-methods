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
        var options = this.options;
        window.addEventListener("load", this.windowResize);
        window.addEventListener("resize", this.windowResize);
        
        this.multipleLineChart = dc.compositeChart('#comparisonChart');
        this.multipleLineChart
            .width(options.width).height(options.height)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .elasticX(true)
            .elasticY(true)
            .brushOn(false)
            // .mouseZoomable(true)
            .renderHorizontalGridLines(true)
            .transitionDuration(0)
            .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));

        this.multipleLineChart.margins().right = options.margin.right;
        this.multipleLineChart.render();
    },

    methods: {
        windowResize(event) {
            var options = this.options;
            options.width = Math.max(options.minWidth + options.margin.right, document.getElementById('comparisonChart').offsetWidth);

            this.multipleLineChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.multipleLineChart.redraw();
        },
        
        updateMultipleLineChart(options) {
            var multipleLineChart = this.multipleLineChart;
            var dataSets = this.comparingResults.chart.dataSets;

            if (dataSets.length === 0) return;

            var colors = ['#f00', '#00f', '#f0f', '#ff0', '#0ff'];
            var maxLengthIndex = 0;

            var labels = dataSets.map((dataSet) => dataSet.label);
            dataSets = dataSets.map((dataSet) => dataSet.data);
            dataSets = dataSets.map((dataSet, i) => {
                maxLengthIndex = (dataSet.length > dataSets[maxLengthIndex].length) ? maxLengthIndex : i;
                var cf = crossfilter(dataSet);
                return cf.dimension((d, c) => c);
            });
            
            var dim = dataSets[maxLengthIndex];

            dataSets = dataSets.map((dataSet, i) => {
                var grp = dataSet.group().reduceSum((d) => d);
                return dc.lineChart(multipleLineChart)
                    .group(grp, labels[i])
                    .colors(colors[i % colors.length])
                    .brushOn(false)
                    .xyTipsOn(true);
            });

            multipleLineChart
                .dimension(dim)
                .compose([]);

            if (options && options.render) {
                multipleLineChart.render();
            }
            
            multipleLineChart.compose(dataSets);

            multipleLineChart.redraw();
        },
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
