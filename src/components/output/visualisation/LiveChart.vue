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
            lastUpdate: 0,
        }
    },

    mounted() {
        this.liveLineChart = dc.compositeChart('#liveChart');
        this.liveLineChart
            .width(800).height(300)
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([0, 100]))
            .brushOn(false)
            .transitionDuration(0);
        this.liveLineChart.render();
    },

    methods: {
        initLiveLineChart() {
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
                
            // console.log("redrawing");
            liveLineChart.redraw();
        },
    },

    watch: {
        'liveData.chart.values'(newValue, oldValue) {
            if (newValue.length < oldValue.length || oldValue.length === 0) {
                this.liveValuesBuffer = [];
                this.initLiveLineChart();
                return;
            }

            this.liveValuesBuffer.push(newValue[newValue.length - 1]);

            if (performance.now() - this.lastUpdate > 50 || newValue.length === newValue.noValues) {
                this.updateLiveLineChart();
                this.lastUpdate = performance.now();
            }
        },
    }
}
</script>
