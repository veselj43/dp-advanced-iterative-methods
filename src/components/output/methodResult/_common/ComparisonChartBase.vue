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

export default {
    data() {
        return {
            $storeUnsubscribe: null,
            $componentHasDefinitionError: false,
            lastActiveCount: 0,
            labels: {},
            dcLegend: {},
            options: {
                selector: '#comparisonChart',
                baseContainerId: 'chartBaseContainer',
                xAxisLabel: '',
                yAxesLabel: '',
                minWidth: 200,
                width: 800,
                height: 300,
                margin: {
                    right: 200,
                },
                yAxisLeftOffset: 41
            },
            xHoverLineOptions: {
                class: 'x-hover-line',
                attributes: [
                    {
                        name: 'class',
                        value: 'x-hover-line'
                    },
                    {
                        name: 'style',
                        value: "stroke:rgb(255,0,0); stroke-width:1;"
                    },
                ],
                top: 5,
                bottom: 42,
            }
        }
    },

    computed: {
        ...mapState({
            comparingResults: (state) => state.outputData.comparingResults
        }),
    },

    mounted() {
        // check for mandatory functions and variables
        if (typeof this.processDataMapping !== 'function') {
            console.error(`Mandatory method "processDataMapping" missing.`);
            this.$componentHasDefinitionError = true;
            return;
        }
        if (typeof this.beforeInitRender !== 'function') {
console.error(`
Mandatory method "beforeInitRender" missing.
It should contain definition of following seriesChart methods:
    - seriesAccessor
    - keyAccessor
    - valueAccessor
    - chart
    - dimension
    - group
`);
            this.$componentHasDefinitionError = true;
            return;
        }
        if (typeof this.idFromSeriesLegend !== 'function') {
            console.error(`Mandatory method "idFromSeriesLegend" missing.`);
            this.$componentHasDefinitionError = true;
            return;
        }

        window.addEventListener("resize", this.windowResize);
        
        this.multipleLineChart = dc.seriesChart(this.options.selector);

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
            let actualWidth = document.getElementById(this.options.baseContainerId).offsetWidth;
            if (actualWidth > 0) {
                this.options.width = Math.max(this.options.minWidth + this.options.margin.right, actualWidth);
            }
        },

        windowResize() {
            this.updateElementWidth();
            let options = this.options;

            this.multipleLineChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.multipleLineChart.redraw();
        },

        processData(i, checkDuplicates) {
            let dataSets = this.comparingResults.chart.dataSets;
            let data = dataSets[i].data;
            let id = dataSets[i].itemId;

            if (dataSets.length === 0) return [];

            if (checkDuplicates && this.labels[id]) return [];

            return this.processDataMapping(data, id);
        },
        
        initMultipleLineChart(chart) {
            let chartOptions = this.options;
            this.ndx = crossfilter([]);

            chart
                .width(chartOptions.width).height(chartOptions.height)
                .x(d3.scale.linear().domain([0, 10]))
                .y(d3.scale.linear().domain([0, 10]))
                .xAxisLabel(chartOptions.xAxisLabel)
                .yAxisLabel(chartOptions.yAxisLabel)
                .elasticX(true)
                .elasticY(true)
                .yAxisPadding('10%')
                .brushOn(false)
                // .mouseZoomable(true)
                .renderHorizontalGridLines(true)
                .transitionDuration(0)
                .legend(dc.legend().x(chartOptions.width - chartOptions.margin.right + 15).y(5).itemHeight(13).gap(5));

            chart.yAxis().tickFormat(d3.format('s'));

            chart.margins().right = chartOptions.margin.right;
            chart.margins().bottom += 5;

            this.beforeInitRender(chart);

            chart.render();
        },

        afterMultipleLineChartInit(chart) {
            let context = this;
            let chartOptions = this.options;
            let referencedContainer = chart.svg();

            if (referencedContainer[0][0]) {
                let xHoverLine = 
                    referencedContainer[0][0].getElementsByClassName(context.xHoverLineOptions.class)[0] ||
                    referencedContainer[0][0].firstChild.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'line'));

                context.xHoverLineOptions.attributes.forEach((attribute) => {
                    xHoverLine.setAttribute(attribute.name, attribute.value);
                });

                xHoverLine.setAttribute('y1', context.xHoverLineOptions.top);
                xHoverLine.setAttribute('y2', chartOptions.height - context.xHoverLineOptions.bottom);
                xHoverLine.style.display = "none";

                referencedContainer.on('mousemove', function(d) {
                    let mouseCoords = d3.mouse(this);
                    mouseCoords.map(Math.floor);

                    let chartAreaWidth = chartOptions.width - chartOptions.margin.right - chartOptions.yAxisLeftOffset;
                    let xAxisMax = context.comparingResults.info.maxDatasetLength;
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

                    let yValues = context.comparingResults.chart.dataSets.map(dataset => (dataset.data[xValue]) ? {id: dataset.itemId, value: dataset.data[xValue]} : null);

                    chart.select('.chart-hover-info').html(context.htmlCoordsBuildList.call(context, xValue, yValues));
                });

                referencedContainer.on('mouseleave', function() {
                    xHoverLine.style.display = "none";
                    chart.select('.chart-hover-info').style('display', null);
                });
            }
        },

        htmlCoordsBuildList(xValue, yValues) {
            let htmlCoords = yValues.reverse().reduce((acc, valueObj, i) => {
                if (!valueObj) return acc;
                let color = this.dcLegend[valueObj.id] || '#000';
                return acc + this.htmlCoordsBuildItem(color, valueObj);
            }, `<table class="table table-condensed"><thead><th class="text-center" colspan="2">${xValue}</th></thead><tbody>`);
            htmlCoords += "</tbody></table>";
            return htmlCoords;
        },

        htmlCoordsBuildItem(color, valueObj) {
            return `<tr style="color: ${color}">
                <td class="text-right">${valueObj.value}</td>
            </tr>`;
        },

        resolveDatasetColors() {
            this.dcLegend = {};
            Array.prototype.forEach.call(this.multipleLineChart.select('.dc-legend')[0][0].childNodes, (legendItem) => {
                let legend = legendItem.getElementsByTagName('text')[0].textContent;
                this.dcLegend[this.idFromSeriesLegend(legend)] = legendItem.getElementsByTagName('rect')[0].getAttribute('fill');
            });
            this.updateDatasetColors(this.dcLegend);
        },

        utilMakeChartNonZero(parentChart, childChart) {
            dc.override(childChart, 'yAxisMin', function () {
                var min = d3.min(childChart.data(), function (layer) {
                    return d3.min(layer.values, function (p) {
                        return p.y + p.y0;
                    });
                });
                return dc.utils.subtract(min, parentChart.yAxisPadding());
            });
        }
    },

    watch: {
        'comparingResults.info.items'(newValue, oldValue) {
            if (this.$componentHasDefinitionError === true) return;

            let newActiveCount = this.comparingResults.info.activeCount;

            // dataset(s) removed - needs to be cleared
            let remove = (this.lastActiveCount && this.lastActiveCount > newActiveCount);

            // dataset replaced with just computed files and the length is the same
            remove = remove || (
                (this.lastActiveCount === 1 && newActiveCount === 1) && 
                (Object.keys(newValue)[0] !== Object.keys(oldValue)[0])
            );

            if (remove) {
                this.ndx.remove();
            }
            for (let i = 0; i < newActiveCount; i++) {
                this.ndx.add(this.processData(i, !remove));
            }

            this.labels = {};
            for (let key in newValue) {
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

        & > table {
            margin: 0;
            padding-left: 10px;
            list-style: none;

            &.table>thead>tr>th,
            &.table>tbody>tr>td {
                border: none;
            }

            &.table>tbody>tr>td {
                padding: 2px 5px;
            }
        }
    }
</style>