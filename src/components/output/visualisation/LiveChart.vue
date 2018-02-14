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
            computingStatus: this.$store.state.liveData.computingStatus,
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
        var options = this.options;
        window.addEventListener("load", this.windowResize);
        window.addEventListener("resize", this.windowResize);

        this.liveLineChart = dc.compositeChart('#liveChart');
        this.liveLineChart
            .width(options.width).height(options.height)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .brushOn(false)
            .renderHorizontalGridLines(true)
            // .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5))
            .transitionDuration(0);

        this.liveLineChart.margins().right = options.margin.right;
        this.liveLineChart.render();
    },

    methods: {
        windowResize(event) {
            var options = this.options;
            options.width = Math.max(options.minWidth + options.margin.right, document.getElementById('liveChart').offsetWidth);

            this.liveLineChart.width(options.width);
            this.liveLineChart.redraw();
        },

        initLiveLineChart() {
            this.windowResize();
            var liveData = this.liveData;
            var liveDataValues = liveData.chart.values;

            this.xFilter = crossfilter(liveDataValues)
            this.dim = this.xFilter.dimension((d, c) => {
                return liveDataValues.length - this.liveValuesBuffer.length + c;
            });
            this.grp = this.dim.group().reduceSum((d) => d);

            this.liveLineChart
                .x(d3.scale.linear().domain([0, liveData.chart.noValues]))
                // .y(d3.scale.linear().domain([0, liveData.best + 10]))
                .compose([]);
            this.liveLineChart.render();
        },

        updateLiveLineChart() {
            var liveLineChart = this.liveLineChart;
            var liveDataValues = this.liveData.chart.values;

            this.xFilter.add(this.liveValuesBuffer);

            this.liveValuesBuffer = [];

            liveLineChart
                .dimension(this.dim)
                .compose([
                    dc.lineChart(liveLineChart)
                        .group(this.grp)
                        .colors('red')
                ]);
                
            liveLineChart.redraw();
        },
    },

    watch: {
        'liveData.chart.values'(newValue, oldValue) {
            if (newValue.length < oldValue.length || oldValue.length === 0) {
                this.liveValuesBuffer = [];
                this.lastUpdatedIndex = 0;
                this.redrawDebounce = 50;
                this.initLiveLineChart();
                return;
            }

            this.liveValuesBuffer.push(...newValue.slice(this.lastUpdatedIndex + 1, newValue.length - 1));
            this.lastUpdatedIndex = newValue.length - 1;

            if (performance.now() - this.lastUpdate > this.redrawDebounce || newValue.length === newValue.noValues) {
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
