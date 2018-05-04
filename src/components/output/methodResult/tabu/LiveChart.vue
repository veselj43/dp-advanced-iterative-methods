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
            lastUpdatedIndex: 0,
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

        this.liveLineChart = dc.lineChart('#liveChart');

        this.ndx = crossfilter([]);
        var dim = this.ndx.dimension(d => d.index);
        var grp = dim.group().reduceSum(d => d.value);

        this.liveLineChart
            .width(options.width).height(options.height)
            .x(d3.scale.linear().domain([0, 100]))
            .xAxisLabel("States checked")
            .yAxisLabel("Value of optimization criterion")
            .elasticY(true)
            .yAxisPadding('10%')
            .brushOn(false)
            .xyTipsOn(false)
            .renderHorizontalGridLines(true)
            .transitionDuration(0)
            .colors('red')
            .dimension(dim)
            .group(grp);

        this.liveLineChart.yAxis().tickFormat(d3.format('s'));

        this.liveLineChart.margins().right = options.margin.right;
        this.liveLineChart.margins().bottom += 5;

        this.liveLineChart.render();
    },

    destroyed() {
        window.removeEventListener("resize", this.windowResize);
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

            this.liveLineChart.width(options.width);
            this.liveLineChart.redraw();
        },

        initLiveLineChart() {
            this.windowResize();
            this.ndx.remove();

            this.liveLineChart
                .x(d3.scale.linear().domain([0, this.liveData.chart.noValues]));

            this.liveLineChart.redraw();
        },

        updateLiveLineChart() {
            var indexOffset = this.ndx.size();
            var filterData = this.liveValuesBuffer.map((d, i) => ({
                index: indexOffset + i,
                value: d
            }));

            this.ndx.add(filterData);
            this.liveValuesBuffer = [];
            this.liveLineChart.redraw();
        },
    },

    watch: {
        'liveData.chart.values'(newValue, oldValue) {

            if (newValue.length < oldValue.length || oldValue.length === 0) {
                this.liveValuesBuffer = [];
                this.lastUpdatedIndex = 0;
                this.redrawDebounce = 10;
                this.initLiveLineChart();
                return;
            }

            this.liveValuesBuffer.push(...newValue.slice(this.lastUpdatedIndex, newValue.length));
            this.lastUpdatedIndex = newValue.length;

            if (performance.now() - this.lastUpdate > this.redrawDebounce || newValue.length === this.liveData.chart.noValues) {
                var beforeUpdate = performance.now();
                this.updateLiveLineChart();
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
