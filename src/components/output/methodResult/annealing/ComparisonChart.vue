<script>
import { mapGetters } from 'vuex';
import dc from 'dc';
import _round from 'lodash/round';
import ComparisonChartBase from '../_common/ComparisonChartBase';

export default {
    extends: ComparisonChartBase,

    data() {
        return {
            options:{
                xAxisLabel: "Step",
                yAxisLabel: "Value of optimization criterion",
            }
        }
    },

    computed: {
        ...mapGetters([
            'comparingResultsItems'
        ]),
    },

    methods: {
        // methods that needs to be implemented for ComparisonChartBase
        processDataMapping(data, datasetId) {
            return data.map((value, j) => ({dataset: datasetId, index: j, value: value}));
        },

        seriesAccessor(context) {
            return (d) => `[${d.key[0]}] ${context.labels[d.key[0]]}`;
        },

        idFromSeriesLegend(legend) {
            return +legend.match(/^\[[0-9]+\]/)[0].slice(1, -1);
        },

        beforeInitRender(chart) {
            let runDimension = this.ndx.dimension(d => [+d.dataset, +d.index]);
            let runGroup = runDimension.group().reduceSum(d => +d.value);

            let makeChartNonZero = this.utilMakeChartNonZero;

            chart
                .seriesAccessor(this.seriesAccessor(this))
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    let serie = dc.lineChart(c).xyTipsOn(false);
                    makeChartNonZero(c, serie);
                    return serie;
                })
                .dimension(runDimension)
                .group(runGroup);
        },

        // methods that overrides ComparisonChartBase methods
        htmlCoordsBuildItem(color, valueObj, xValue) {
            return `<tr style="color: ${color}">
                <td>[${valueObj.id}]</td>
                <td>Value of optimization criterion</td>
                <td class="text-right">${valueObj.value}</td>
            </tr>
            <tr style="color: ${color}">
                <td>[${valueObj.id}]</td>
                <td>Temperature</td>
                <td class="text-right">${this.computeTemperature(valueObj.id, xValue)}</td>
            </tr>`;
        },

        // component specific methods
        computeTemperature(datasetId, xValue) {
            let params = this.comparingResultsItems[datasetId].params;
            return _round(params.start_temp * Math.pow(params.cool_coef, xValue), 1);
        }
    }
}
</script>
