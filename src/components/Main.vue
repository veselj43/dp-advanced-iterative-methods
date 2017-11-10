<template>
    <div class="main-page">

        <div class="left-panel">
            <params-input class="component"></params-input>
            <controls class="component" :handlers="handlers"></controls>
            <problem-select class="component"></problem-select>
            <files-input></files-input>
        </div>

        <div class="right-panel">
            <div class="header">Solved instances</div>
            <computing-history></computing-history>
        </div>

        <div class="main-panel center-panel">
            <div class="middle-panel">

                <div class="results">
                    <h3>Results</h3>

                    <live-line-chart class="chart"
                        v-bind="chartData"
                        :height="300"
                    ></live-line-chart>

                    <div class="best">

                        <table v-if="!result" class="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th>Best found fitness</th>
                                    <td>{{bestFoundFitness}}</td>
                                </tr>
                                <tr>
                                    <th>Actual finess</th>
                                    <td>{{actualFitness}}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table v-else class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Fitness</th>
                                    <th>States checked</th>
                                    <th>Processing time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{result.fitness}}</td>
                                    <td>{{result.counter}}</td>
                                    <td>{{parsedProcessTime}}</td>
                                </tr>
                            </tbody>
                        </table>

                        <conf-visual :resultObj="result"></conf-visual>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex';

import Controls from './Controls'

import ParamsInput from './input/ParamsInput'
import ProblemSelect from './input/ProblemSelect'
import FilesInput from './input/FilesInput'

import ComputingHistory from './output/ComputingHistory'

import LiveLineChart from './visualisation/LiveLineChart'
import ConfVisual from './visualisation/Configuration'

export default {
    components: {
        Controls,
        ParamsInput,
        ProblemSelect,
        FilesInput,
        ComputingHistory,
        LiveLineChart,
        ConfVisual
    },

    data() {
        return {
            chartData: {
                labels: [],
                values: []
            },
            bestFoundFitness: 0,
            actualFitness: 0,
            result: null,
            handlers: {
                init: data => {
                    this.result = null;
                    this.chartData.labels = _.range(data.numberOfIterations);
                    this.chartData.values = [];
                    this.bestFoundFitness = 0;
                    this.actualFitness = 0;
                    // data.maxFitness;
                },
                progress: data => {
                    this.chartData.values.push(data.fitness);
                    this.bestFoundFitness = Math.max(this.bestFoundFitness, data.fitness);
                    this.actualFitness = data.fitness;
                },
                result: data => {
                    this.result = data;
                    this.pushResult({
                        chartData: this.chartData,
                        bestFoundFitness: this.bestFoundFitness
                    });
                },
                interrupt: () => {
                    this.result = null;
                }
            }
        }
    },
    computed: {
        parsedProcessTime() {
            // TODO try to move to filter
            var parsed = "";
            if (this.result && this.result.processTime) {
                var time = [
                    {name: "m", value: Math.floor(this.result.processTime / (1000 * 60))},
                    {name: "s", value: Math.floor(this.result.processTime / 1000)},
                    {name: "ms", value: Math.floor(this.result.processTime % 1000)}
                ];
                time.filter(unit => unit.value > 0).forEach(unit => {
                    parsed += " " + unit.value + unit.name;
                });
            }
            return parsed;
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions([
            'pushResult'
        ])
    }
}
</script>

<style scoped>
    .chart {
        padding: 1em 0;
    }
</style>
