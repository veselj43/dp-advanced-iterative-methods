<template>
    <div id="comparison-chart"></div>
</template>

<script>
import dc from 'dc';

let d3 = dc.d3;
let crossfilter= dc.crossfilter;

function generateRecord(dataset, x, y) {
    return {
        dataset,
        index: x,
        value: y
    };
}

function generateSinPath(dataset, startIndex, size = 500) {
    let data = [];
    for (let i = startIndex; i < startIndex + size; i++) {
        data.push(
            generateRecord(1, i, Math.sin(i/100))
        );
    }
    return data;
}

export default {
    data() {
        return {
            chartOptions: {
                selector: '#comparison-chart',
                width: 400,
                height: 250,
            }
        }
    },

    mounted() {
        this.createChart(this.chartOptions);
        // this.initDimensions();
        // this.initAccessors();

        setTimeout(this.updateData, 0);

        // setTimeout(function () {
        //     this.updateData(this.comparisonChart, this.ndx, generateSinPath(1, 100));
        // }, 0);
    },

    methods: {
        createChart(options) {
            this.comparisonChart = dc.seriesChart("#comparison-chart");

            this.ndx = crossfilter([]);
            let dimension = this.ndx.dimension(d => [+d.dataset, d.index]);
            let group = dimension.group().reduceSum(d => +d.value);

            this.comparisonChart
                .width(300)
                .height(250)
                .x(d3.scaleLinear().domain([0, 10]))
                .elasticX(true)
                .elasticY(true)
                .xAxisPadding('10%')
                .yAxisPadding('10%')
                .brushOn(false)
                .transitionDuration(0)
                .dimension(dimension)
                .group(group)
                .seriesAccessor(d => "one")
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    let serie = dc.lineChart(c).xyTipsOn(false);
                    // makeChartNonZero(c, serie);
                    return serie;
                });

            this.comparisonChart.render();
        },

        initDimensions() {
            // this.comparisonChart
        },

        initAccessors() {
            // this.comparisonChart
        },

        updateData() {

            let nextData = generateSinPath(1, this.ndx.size(), 200);
            console.log(nextData);
            this.ndx.add(nextData);
            this.comparisonChart.redraw();

            console.log(this.ndx.size());

            if (this.ndx.size() < 400) setTimeout(this.updateData, 0);
        }
    }
}
</script>
