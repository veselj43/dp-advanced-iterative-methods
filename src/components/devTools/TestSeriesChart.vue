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
        setTimeout(this.update, 0);
    },

    methods: {
        init() {
            this.chart = dc.seriesChart("#series-test-chart");
            
            this.ndx = crossfilter(this.generateData());
            let runDimension = this.ndx.dimension(function(d) {return [+d[0], d[2]];});
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
                .group(speedSumGroup)
                .on('renderlet', function(chart) {
                    chart.selectAll('rect').on("click", function(d) {
                        console.log("click!", d);
                    });
                })
                .seriesAccessor((d) => `[${d.key[1]}]`)
                .keyAccessor(d => +d.key[0])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    let serie = dc.lineChart(c).xyTipsOn(false);
                    // makeChartNonZero(c, serie);
                    return serie;
                });
            this.chart.render();
        },

        update() {
            let index = this.ndx.size();
            
            if (index >= 10000) return;

            this.ndx.add(this.generateData());
            this.chart.redraw();

            setTimeout(this.update, 0);
        },

        generateData() {
            let index = (this.ndx) ? this.ndx.size() : 0;
            let newData = [];
            for (let i = index; i < index + 100; i++) {
                newData.push([i, Math.sin(i/100), (index < 8000)]);
            }
            return newData;
        }
    }
}
</script>
