<template>
    <div id="series-test-chart"></div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    data() {
        return {
        }
    },

    mounted() {
        this.init();
        // setTimeout(this.update, 0);
        new Promise((resolve, reject) => {
            this.update();
            resolve();
        });
    },

    methods: {
        init() {
            this.chart = dc.seriesChart("#series-test-chart");
            
            this.ndx = crossfilter([]);
            let runDimension = this.ndx.dimension(d => [+d[0], d[2]]);
            let speedSumGroup = runDimension.group().reduceSum(d => +d[1]);

            this.chart
                .width(600)
                .height(400)
                .x(d3.scaleLinear().domain([0, 10]))
                .elasticX(true)
                .elasticY(true)
                .brushOn(false)
                .yAxisLabel("This is the Y Axis!")
                .xAxisPadding(1)
                .yAxisPadding('10%')
                .transitionDelay(0)
                .transitionDuration(0)
                .dimension(runDimension)
                .group(speedSumGroup)
                .seriesAccessor((d) => `[${d.key[1]}]`)
                .keyAccessor(d => +d.key[0])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    let serie = dc.lineChart(c).xyTipsOn(false);
                    return serie;
                });
                
            this.chart.render();
        },

        update() {
            let index = this.ndx.size();
            
            if (index >= 10000) return;

            this.ndx.add(this.generateData());
            this.chart.redraw();

            // setTimeout(this.update, 0);
            new Promise((resolve, reject) => {
                this.update();
                resolve();
            });
        },

        
    }
}
</script>
