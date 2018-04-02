<template>
    <div id='example-3'>
        <!--<ul>-->
            <!--<li v-for="valueType in Object.keys(this.comparingResults.chart.dataSets[0].data[0])">-->
                <!--<input type="checkbox" :value="valueType" :id="valueType" v-model="checkedTypes">-->
                <!--<label :for="valueType">{{valueType}}</label>-->
            <!--</li>-->
        <!--</ul>-->
        <!--TODO udelat dynamicky-->
        <input type="checkbox" id="average" value="average" v-model="checkedTypes">
        <label for="average">average</label>
        <input type="checkbox" id="best" value="best" v-model="checkedTypes">
        <label for="best">best</label>
        <input type="checkbox" id="mean" value="mean" v-model="checkedTypes">
        <label for="mean">mean</label>
        <input type="checkbox" id="worst" value="worst" v-model="checkedTypes">
        <label for="worst">worst</label>
        <div id="comparisonChart"></div>
    </div>
</template>

<script>
import dc from 'dc';

var d3 = dc.d3;
var crossfilter = dc.crossfilter;

function filterType(sourceGroup, typeArray) { // funkce vracejici fake_group (objekt)
    return {
        all: function() {
            return sourceGroup.all().filter(function(d) {
                return (typeArray && typeArray.length > 0) ? typeArray.filter(type => type === d.key[2]).length > 0 : true;
            });
        }
    };
}

export default {
    data() {
        return {
            $storeUnsubscribe: null,
            comparingResults: this.$store.state.outputData.comparingResults,
            checkedTypes: [],
            lastActiveCount: 0,
            labels: {},
            options: {
                minWidth: 200,
                width: 800,
                height: 300,
                margin: {
                    right: 200,
                },
                maxYAxeValueMarginMultiplier: 1.1
            },
            runGroup: null
        }
    },

    mounted() {
        window.addEventListener("resize", this.windowResize);

        this.multipleLineChart = dc.seriesChart('#comparisonChart');

        this.initMultipleLineChart();

        this.$storeUnsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'selectProblem') {
                this.ndx.remove();
                this.labels = {};
            }
        });
    },

    destroyed() {
        if (this.$storeUnsubscribe) this.$storeUnsubscribe();
    },

    methods: {
        updateElementWidth() {
            // it has to be an already rendered container to resize properly
            var actualWidth = document.getElementById('chartBaseContainer').offsetWidth;
            if (actualWidth > 0) {
                this.options.width = Math.max(this.options.minWidth + this.options.margin.right, actualWidth);
            }
        },

        windowResize() {
            this.updateElementWidth();
            var options = this.options;

            this.multipleLineChart
                .width(options.width)
                .legend(dc.legend().x(options.width - options.margin.right + 15).y(5).itemHeight(13).gap(5));
            this.multipleLineChart.redraw();
        },

        processData(i, checkDuplicates) {
            var dataSets = this.comparingResults.chart.dataSets;

            if (dataSets.length === 0) return [];

            var data = dataSets[i].data;
            var id = dataSets[i].itemId;

            if (checkDuplicates && this.labels[id]) {
                return [];
            }

            var filterData = [];

            data.forEach((d, j) => {
                filterData.push(
                    ...Object.keys(d).map(key => {
                        return {
                            dataset: id,
                            index: j,
                            type: key,
                            value: +d[key]
                        }
                    })
                )
            });


            return filterData;
        },

        initMultipleLineChart() {
            this.updateElementWidth();
            var multipleLineChart = this.multipleLineChart;
            var chartOptions = this.options;

            this.ndx = crossfilter([]);

            var runDimension = this.ndx.dimension(d => [+d.dataset, +d.index, d.type]);
            this.runGroup = runDimension.group().reduceSum(d => +d.value);

            var componentContext = this;

            multipleLineChart
                .width(chartOptions.width).height(chartOptions.height)
                .x(d3.scale.linear().domain([0, 10]))
                .y(d3.scale.linear().domain([0, 10]))
                .xAxisLabel("Generation")
                .yAxisLabel("Fitness")
                .elasticX(true)
                .elasticY(true)
                .brushOn(false)
                // .mouseZoomable(true)
                .renderHorizontalGridLines(true)
                .transitionDuration(0)
                // .ordinalColors(['red', 'blue'])
                .legend(dc.legend().x(chartOptions.width - chartOptions.margin.right + 15).y(5).itemHeight(13).gap(5))
                .seriesAccessor(function(d) {return componentContext.labels[d.key[0]] + " (" + d.key[0] + ") " + " (" + d.key[2] + ")";})
                .keyAccessor(d => +d.key[1])
                .valueAccessor(d => +d.value)
                .chart(function(c, xxx, series) {
                    return dc.lineChart(c)
                        .colorAccessor(function (d, i) {
                            return (d) ? d[0].data.key[0] : 0;
                        })
                        .xyTipsOn(false);
                })
                .dimension(runDimension)
                .group(this.runGroup);

            multipleLineChart.margins().right = chartOptions.margin.right;
            multipleLineChart.margins().bottom += 5;

            multipleLineChart.render();
        },
        filterValueTypes() {
            this.multipleLineChart.group(filterType(this.runGroup, this.checkedTypes));
            this.multipleLineChart.redraw();
        },
    },

    watch: {
        'comparingResults.info.items'(newValue, oldValue) {
            var newActiveCount = this.comparingResults.info.activeCount;

            // dataset(s) removed - needs to be cleared
            var remove = (this.lastActiveCount && this.lastActiveCount > newActiveCount);

            // dataset replaced with just computed files and the length is the same
            remove = remove || (
                (this.lastActiveCount === 1 && newActiveCount === 1) &&
                (Object.keys(newValue)[0] !== Object.keys(oldValue)[0])
            );

            if (remove) {
                this.ndx.remove();
            }
            for (var i = 0; i < newActiveCount; i++) {
                this.ndx.add(this.processData(i, !remove));
            }

            this.labels = {};
            for (var key in newValue) {
                this.labels[key] = newValue[key].instance;
            }

            this.lastActiveCount = newActiveCount;

            // var maxYAxeValue = Math.max(...Object.keys(newValue).map(key => newValue[key].result.cost));
            // var minYAxeValue = Math.min(...Object.keys(newValue).map(key => newValue[key].result.cost));
            // // if (maxYAxeValue >= 0) {
            //    this.multipleLineChart
            //         .elasticY(false)
            //         .y(d3.scale.linear().domain([minYAxeValue * this.options.maxYAxeValueMarginMultiplier, maxYAxeValue * this.options.maxYAxeValueMarginMultiplier]));
            // // }
            // // else {
            // //     this.multipleLineChart
            // //         .elasticY(true);
            // // }

            this.multipleLineChart.redraw();

            // first load of the component
            if (newActiveCount === 1) {
                this.windowResize();
            }
        },
        'checkedTypes'() {
            this.filterValueTypes();
        }
    },
}
</script>

<style scoped>
    #comparisonChart {
        width: 100%;
    }
</style>

