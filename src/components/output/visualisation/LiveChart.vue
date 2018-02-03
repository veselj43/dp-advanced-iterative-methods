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
        updateLiveLineChart(options) {
            var liveLineChart = this.liveLineChart;
            var liveData = this.liveData;

            if (options && options.init) {
                liveLineChart
                    .x(d3.scale.linear().domain([0, liveData.chart.labels.length + 100]))
                    .y(d3.scale.linear().domain([0, liveData.best + 10]))
                    .compose([]);
                liveLineChart.render();

                return;
            }

            var dim = crossfilter(liveData.chart.values).dimension((d, c) => c);
            var grp = dim.group().reduceSum((d) => d);

            liveLineChart
                .dimension(dim)
                .compose([
                    dc.lineChart(liveLineChart)
                        .group(grp)
                        .colors('red')
                ]);

            if (options && options.render) {
                liveLineChart.render();
            }
            else {
                liveLineChart.redraw();
            }
        },
    },

    watch: {
        'liveData.chart.values.length'(newValue, oldValue) {
            if (newValue < oldValue || oldValue === 0) {
                this.updateLiveLineChart({ init: true });
            }
            else {
                this.updateLiveLineChart();
            }
        },
    }
}
</script>
