<template>
    <div id='example-3'>
        <ul id="horizontal-list">
            <li v-for="(valueType, key) in valueTypes" :key="key">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :value="valueType" v-model="checkedTypes"> {{valueType}}
                    </label>
                </div>
            </li>
        </ul>
        <div id="comparisonChart">
            <div class="chart-hover-info"></div>
        </div>
    </div>
</template>

<script>
import dc from 'dc';
import { storage } from '@/services/localStorage';
import ComparisonChartBase from '../_common/ComparisonChartBase';

let storageKeycheckedTypes = 'ga-comparison-checked-types';

function typeIsChecked(typeArray, targetType) {
    return (typeArray && typeArray.length > 0) ? typeArray.filter(type => type === targetType).length > 0 : true;
}

function filterType(sourceGroup, typeArray, typeIsCheckedFn = typeIsChecked) { // funkce vracejici fake_group (objekt)
    return {
        all: function() {
            return sourceGroup.all().filter(function(d) {
                return typeIsCheckedFn(typeArray, d.key[2]);
            });
        }
    };
}

export default {
    extends: ComparisonChartBase,

    data() {
        return {
            options:{
                xAxisLabel: "Generation",
                yAxisLabel: "Fitness",
            },
            valueTypes: [],
            checkedTypes: [],
            runGroup: null
        }
    },

    mounted() {
        this.checkedTypes = JSON.parse(storage.get(storageKeycheckedTypes)) || ["best", "average", "worst"];
    },

    methods: {
        // methods that needs to be implemented for ComparisonChartBase
        processDataMapping(data, datasetId) {
            // init valueTypes
            if (this.valueTypes.length === 0) {
                this.valueTypes = Object.keys(data[0]);
            }

            let filterData = [];

            data.forEach((d, j) => {
                filterData.push(
                    ...Object.keys(d).map(key => {
                        return {
                            dataset: datasetId,
                            index: j,
                            type: key,
                            value: +d[key]
                        }
                    })
                )
            });

            return filterData;
        },

        seriesAccessor(context) {
            return (d) => `[${d.key[0]}] ${context.labels[d.key[0]]} (${d.key[2]})`;
        },

        idFromSeriesLegend(legend) {
            return +legend.match(/^\[[0-9]+\]/)[0].slice(1, -1);
        },

        beforeInitRender(chart) {
            var runDimension = this.ndx.dimension(d => [+d.dataset, +d.index, d.type]);
            this.runGroup = runDimension.group().reduceSum(d => +d.value);

            let makeChartNonZero = this.utilMakeChartNonZero;

            chart
                .seriesAccessor(this.seriesAccessor(this))
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c) {
                    let series = dc.lineChart(c)
                        .colorAccessor(function (d, i) {
                            return (d) ? d[0].data.key[0] : 0;
                        })
                        .xyTipsOn(false);
                    makeChartNonZero(c, series);
                    return series;
                })
                .dimension(runDimension)
                .group(this.runGroup);
        },

        // methods that overrides ComparisonChartBase methods
        htmlCoordsBuildItem(color, valueObj) {
            return Object.keys(valueObj.value).map(key => {
                if (!typeIsChecked(this.checkedTypes, key)) return;
                return `<tr style="color: ${color}">
                    <td>[${valueObj.id}]</td>
                    <td>${key}</td>
                    <td class="text-right">${valueObj.value[key]}</td>
                </tr>`;
            }).join('');
        },

        // component specific methods
        filterValueTypes() {
            this.multipleLineChart.group(filterType(this.runGroup, this.checkedTypes));
            this.multipleLineChart.redraw();
            storage.set(storageKeycheckedTypes, JSON.stringify(this.checkedTypes));
        },
    },

    watch: {
        'checkedTypes'() {
            this.filterValueTypes();
        }
    },
}
</script>

<style scoped>
    ul#horizontal-list {
        margin-bottom: 0;
        list-style: none;
    }
    ul#horizontal-list li {
        display: inline-block;
        margin-right: 1.5em;
    }
</style>

