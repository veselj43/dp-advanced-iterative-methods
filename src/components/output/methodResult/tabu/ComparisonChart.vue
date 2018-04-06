<script>
import dc from 'dc';
import ComparisonChartBase from '../_common/ComparisonChartBase';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

export default {
    extends: ComparisonChartBase,

    data() {
        return {
            options:{
                xAxisLabel: "States checked",
                yAxisLabel: "Value",
            }
        }
    },

    methods: {
        // methods that needs to be implemented for ComparisonChartBase
        processDataMapping(data, datasetId) {
            return data.map((value, j) => ({dataset: datasetId, index: j, value: value}));
        },

        seriesAccessor(context) {
            return (d) => context.labels[d.key[0]] + " (" + d.key[0] + ")";
        },

        idFromSeriesLegend(legend) {
            return +legend.split('(')[1].split(')')[0];
        },

        beforeInitRender(chart) {
            let runDimension = this.ndx.dimension(d => [+d.dataset, +d.index]);
            let runGroup = runDimension.group().reduceSum(d => +d.value);
            
            chart
                .seriesAccessor(this.seriesAccessor(this))
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    return dc.lineChart(c).xyTipsOn(false);
                })
                .dimension(runDimension)
                .group(runGroup);
        },
    }
}
</script>

