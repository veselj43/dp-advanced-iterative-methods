<template>
    <div id="liveChart"></div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    data() {
        return {
            liveData: this.$store.state.liveData.data,
            liveValuesBuffer: [],
            lastUpdatedIndex: -1, //0
            lastUpdate: 0,
            redrawDebounce: 0,
            options: {
                minWidth: 100,
                width: 800,
                height: 300,
                margin: {
                    right: 200,
                },
            },
        }
    },

    mounted() {
        window.addEventListener("resize", this.windowResize);

        this.updateElementWidth();
        var options = this.options;

        this.liveSeriesChart = dc.seriesChart('#liveChart');

        this.ndx = crossfilter([]);
        var dim = this.ndx.dimension(d => [d.type, +d.index]);
        var grp = dim.group().reduceSum(d => +d.value);

        this.liveSeriesChart
            .width(options.width).height(options.height)
            .x(d3.scale.linear().domain([0, 100]))
            .xAxisLabel("Generation")
            .yAxisLabel("Fitness")
            .elasticY(true)
            .yAxisPadding('10%')
            .brushOn(false)
            // .xyTipsOn(false)
            .renderHorizontalGridLines(true)
            .transitionDuration(0)
            // .colors('red')
            .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5))
            .seriesAccessor(function(d) {return d.key[0];})
            .keyAccessor(d => +d.key[1])
            .valueAccessor(d => +d.value)
            .chart(function(c) {
                return dc.lineChart(c).xyTipsOn(false);
            })
            .dimension(dim)
            .group(grp);

        this.liveSeriesChart.yAxis().tickFormat(d3.format('s'));

        this.liveSeriesChart.margins().right = options.margin.right;
        this.liveSeriesChart.margins().bottom += 5;

        this.liveSeriesChart.render();
    },

    methods: {
        updateElementWidth() {
            var activeWidth = document.getElementById('liveChart').offsetWidth;
            if (activeWidth) {
                this.options.width = Math.max(this.options.minWidth + this.options.margin.right, activeWidth);
            }
        },

        windowResize() {
            this.updateElementWidth();
            var options = this.options;

            this.liveSeriesChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.liveSeriesChart.redraw();
        },

        initliveSeriesChart() {
            this.windowResize();
            this.ndx.remove();
            this.indexOffset = 0;

            this.liveSeriesChart
                .x(d3.scale.linear().domain([0, this.liveData.chart.noValues-1]));

            this.liveSeriesChart.redraw();
        },

        updateliveSeriesChart() {
            var filterData = [];
            this.liveValuesBuffer.forEach((d, i) => {
                filterData.push(
                    ...Object.keys(d).map(key => {
                        return {
                            index: this.indexOffset + i,
                            type: key,
                            value: +d[key]
                        }
                    })
                )
            });
            this.indexOffset += this.liveValuesBuffer.length;
            this.ndx.add(filterData);
            this.liveValuesBuffer = [];
            this.liveSeriesChart.redraw();
        },
    },

    watch: {
        'liveData.chart.values'(newValue, oldValue) {

            if (newValue.length < oldValue.length || oldValue.length === 0) {
                this.liveValuesBuffer = [];
                this.lastUpdatedIndex = -1;
                this.redrawDebounce = 10;
                this.initliveSeriesChart();
            }
            this.liveValuesBuffer.push(...newValue.slice(this.lastUpdatedIndex + 1, newValue.length));
            this.lastUpdatedIndex = newValue.length - 1;

            if (performance.now() - this.lastUpdate > this.redrawDebounce || newValue.length >= this.liveData.chart.noValues) {
                var beforeUpdate = performance.now();
                this.updateliveSeriesChart();
                this.lastUpdate = performance.now();
                var updateTime = (this.lastUpdate - beforeUpdate) * 4;
                if (this.redrawDebounce < updateTime) this.redrawDebounce = updateTime / 2;
            }
        },
    }
}
</script>

<style scoped>
    #liveChart {
        width: 100%;
    }
</style>
