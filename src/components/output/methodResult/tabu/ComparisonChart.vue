<template>
    <div id="comparisonChart">
        <div class="chart-hover-info"></div>
    </div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    data() {
        return {
            $storeUnsubscribe: null,
            comparingResults: this.$store.state.outputData.comparingResults,
            lastActiveCount: 0,
            labels: {},
            options: {
                minWidth: 200,
                width: 800,
                height: 300,
                margin: {
                    right: 200,
                },
                yAxisLeftOffset: 41
            },
        }
    },

    mounted() {
        window.addEventListener("resize", this.windowResize);
        
        this.multipleLineChart = dc.seriesChart('#comparisonChart');

        this.initMultipleLineChart();

        this.$storeUnsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'selectProblem') {
                this.ndx.remove();
                this.labels = {};
            }
        });
    },

    destroyed() {
        if (this.$storeUnsubscribe) this.$storeUnsubscribe();
    },

    methods: {
        updateElementWidth() {
            // it has to be an already rendered container to resize properly
            var actualWidth = document.getElementById('chartBaseContainer').offsetWidth;
            if (actualWidth > 0) {
                this.options.width = Math.max(this.options.minWidth + this.options.margin.right, actualWidth);
            }
        },

        windowResize() {
            this.updateElementWidth();
            var options = this.options;

            this.multipleLineChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.multipleLineChart.redraw();
        },

        processData(i, checkDuplicates) {
            var dataSets = this.comparingResults.chart.dataSets;

            if (dataSets.length === 0) return [];

            var data = dataSets[i].data;
            var id = dataSets[i].itemId;

            if (checkDuplicates && this.labels[id]) {
                return [];
            }

            return data.map((value, j) => ({dataset: id, index: j, value: value}));
        },
        
        initMultipleLineChart() {
            this.updateElementWidth();
            var multipleLineChart = this.multipleLineChart;
            var chartOptions = this.options;

            this.ndx = crossfilter([]);

            var runDimension = this.ndx.dimension(d => [+d.dataset, +d.index]);
            var runGroup = runDimension.group().reduceSum(d => +d.value);

            var componentContext = this;

            multipleLineChart
                .width(chartOptions.width).height(chartOptions.height)
                .x(d3.scale.linear().domain([0, 10]))
                .y(d3.scale.linear().domain([0, 10]))
                .xAxisLabel("States checked")
                .yAxisLabel("Value")
                .elasticX(true)
                .elasticY(true)
                .yAxisPadding(10)
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
                .group(runGroup)
                .on('renderlet', function(chart) {
                    let referencedContainer = chart.select('svg');
                    if (referencedContainer) {
                        let chartAreaWidth = referencedContainer[0][0].width.animVal.value - chartOptions.margin.right - chartOptions.yAxisLeftOffset;
                        let xAxisMax = Math.max(...componentContext.comparingResults.chart.dataSets.map(dataset => dataset.data.length)) - 1;
                        referencedContainer.on('mousemove', function(d) {
                            let mouseCoords = d3.mouse(this);
                            let xCoord = Math.floor(mouseCoords[0]) - chartOptions.yAxisLeftOffset;
                            let xValue = Math.round(xAxisMax * xCoord / chartAreaWidth);
                            if (xValue < 0 || xValue > xAxisMax) {
                                chart.select('.chart-hover-info').style('display', 'none');
                                return;
                            }
                            chart.select('.chart-hover-info').style('display', null);
                            chart.select('.chart-hover-info').style('top', mouseCoords[1]+20 + 'px');
                            chart.select('.chart-hover-info').style('left', mouseCoords[0]+20 + 'px');
                            let yValue = componentContext.comparingResults.chart.dataSets.map(dataset => dataset.data[xValue]);
                            let htmlCoodrs = yValue.reduce((acc, value) => {
                                if (value) {
                                    return acc += "<li>" + value + "</li>";
                                }
                                return acc;
                            }, xValue + ': <ul>');
                            htmlCoodrs += "</ul>";
                            chart.select('.chart-hover-info').html(htmlCoodrs);
                        });

                        referencedContainer.on('mouseout', function() {
                            chart.select('.chart-hover-info').style('display', 'none');
                        });
                    }
                });

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
            remove = remove || (
                (this.lastActiveCount === 1 && newActiveCount === 1) && 
                (Object.keys(newValue)[0] !== Object.keys(oldValue)[0])
            );

            if (remove) {
                this.ndx.remove();
            }
            for (var i = 0; i < newActiveCount; i++) {
                this.ndx.add(this.processData(i, !remove));
            }

            this.labels = {};
            for (var key in newValue) {
                this.labels[key] = newValue[key].instance;
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

<style lang="scss">
    #comparisonChart {
        position: relative;
        width: 100%;
    }

    .chart-hover-info {
        position: absolute;
        top: 0;
        left: 50%;
        padding: 5px;
        background-color: #ffffffdd;
        border: #ddd 1px solid;

        & > ul {
            margin: 0;
            padding-left: 10px;
            list-style: none;
        }
    }
</style>

