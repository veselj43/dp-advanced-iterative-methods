<template>
    <div id="chart"></div>
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
        this.chart = dc.lineChart("#chart");
        
        this.ndx = crossfilter([]);
        let runDimension = this.ndx.dimension(function(d) {return +d[0];});
        let speedSumGroup = runDimension.group().reduceSum(function(d) {return +d[1];});

        this.chart
            .width(600)
            .height(400)
            .x(d3.scaleLinear().domain([0, 10]))
            .elasticX(true)
            .elasticY(true)
            .brushOn(false)
            .yAxisLabel("This is the Y Axis!")
            .xAxisPadding('10%')
            .yAxisPadding('10%')
            .dimension(runDimension)
            .transitionDuration(0)
            .xyTipsOn(false)
            .group(speedSumGroup)
            .on('renderlet', function(chart) {
                chart.selectAll('rect').on("click", function(d) {
                    console.log("click!", d);
                });
            });
        this.chart.render();

        setTimeout(this.update, 0);
    },

    methods: {
        update() {
            let index = this.ndx.size();
            let newData = [];

            if (index >= 10000) return;

            for (let i = index; i < index + 100; i++) {
                newData.push([i, Math.round(Math.random() * (300 + index)) + 500 - index]);
            }

            this.ndx.add(newData);
            this.chart.redraw();

            setTimeout(this.update, 0);
        }
    }
}
</script>
