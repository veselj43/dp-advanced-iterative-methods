<template>
    <div id="comparisonChart">
        <div class="chart-hover-info"></div>
    </div>
</template>

<script>
import dc from 'dc';
import { mapState, mapMutations } from 'vuex';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

var seriesAccessorFn = (context) => (d) => context.labels[d.key[0]] + " (" + d.key[0] + ")";
var idFromSeriesLegend = (legend) => +legend.split('(')[1].split(')')[0];

export default {
    data() {
        return {
            $storeUnsubscribe: null,
            lastActiveCount: 0,
            labels: {},
            dcLegend: {},
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

    computed: {
        ...mapState({
            comparingResults: (state) => state.outputData.comparingResults
        }),
    },

    mounted() {
        window.addEventListener("resize", this.windowResize);
        
        this.multipleLineChart = dc.seriesChart('#comparisonChart');

        this.updateElementWidth();
        this.initMultipleLineChart(this.multipleLineChart);
        this.afterMultipleLineChartInit(this.multipleLineChart);

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
        ...mapMutations([
            'updateDatasetColors'
        ]),

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
        
        initMultipleLineChart(multipleLineChart) {
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
                .seriesAccessor(seriesAccessorFn(this))
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

        afterMultipleLineChartInit(chart) {
            let componentContext = this;
            let chartOptions = this.options;
            let referencedContainer = chart.svg();

            if (referencedContainer[0][0]) {
                let xHoverLine = 
                    referencedContainer[0][0].getElementsByClassName('x-hover-line')[0] ||
                    referencedContainer[0][0].firstChild.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'line'));

                xHoverLine.setAttribute('class', 'x-hover-line');
                xHoverLine.setAttribute('y1', 5);
                xHoverLine.setAttribute('y2', chartOptions.height - 42);
                xHoverLine.setAttribute('style', "stroke:rgb(255,0,0);stroke-width:1");
                xHoverLine.style.display = "none";

                referencedContainer.on('mousemove', function(d) {
                    let mouseCoords = d3.mouse(this);
                    mouseCoords.map(Math.floor);

                    let chartAreaWidth = chartOptions.width - chartOptions.margin.right - chartOptions.yAxisLeftOffset;
                    let xAxisMax = componentContext.comparingResults.info.maxDatasetLength;
                    let xCoord = mouseCoords[0] - chartOptions.yAxisLeftOffset;
                    let xValue = Math.round(xAxisMax * xCoord / chartAreaWidth);

                    if (xValue < 0 || xValue > xAxisMax) {
                        chart.select('.chart-hover-info').style('display', null);
                        xHoverLine.style.display = "none";
                        return;
                    }

                    let xHoverLinePos = chartOptions.yAxisLeftOffset + Math.round(xValue * chartAreaWidth / xAxisMax);

                    xHoverLine.setAttribute('x1', xHoverLinePos);
                    xHoverLine.setAttribute('x2', xHoverLinePos);
                    xHoverLine.style.display = null;

                    chart.select('.chart-hover-info').style('top', mouseCoords[1] + 20 + 'px');
                    chart.select('.chart-hover-info').style('left', mouseCoords[0] + 20 + 'px');
                    chart.select('.chart-hover-info').style('display', 'block');

                    let yValue = componentContext.comparingResults.chart.dataSets.map(dataset => (dataset.data[xValue]) ? {id: dataset.itemId, value: dataset.data[xValue]} : null);

                    let htmlCoodrs = yValue.reverse().reduce((acc, valueObj, i) => {
                        if (!valueObj) return acc;
                        let color = componentContext.dcLegend[valueObj.id] || '#000';
                        return acc + '<li style="color: ' + color + '">' + valueObj.value + "</li>";
                    }, xValue + ': <ul>');
                    htmlCoodrs += "</ul>";

                    chart.select('.chart-hover-info').html(htmlCoodrs);
                });

                referencedContainer.on('mouseleave', function() {
                    xHoverLine.style.display = "none";
                    chart.select('.chart-hover-info').style('display', null);
                });
            }
        },

        resolveDatasetColors() {
            this.dcLegend = {};
            Array.prototype.forEach.call(this.multipleLineChart.select('.dc-legend')[0][0].childNodes, (legendItem) => {
                let legend = legendItem.getElementsByTagName('text')[0].textContent;
                this.dcLegend[idFromSeriesLegend(legend)] = legendItem.getElementsByTagName('rect')[0].getAttribute('fill');
            });
            this.updateDatasetColors(this.dcLegend);
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
            this.resolveDatasetColors();

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
        display: none;
        top: 0;
        left: 50%;
        padding: 5px;
        background-color: #ffffff;
        border: #ddd 1px solid;

        & > ul {
            margin: 0;
            padding-left: 10px;
            list-style: none;
        }
    }
</style>

