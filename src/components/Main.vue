<template>
    <div class="main-page">

        <div class="left-panel">
            <params-input class="component"></params-input>
            <controls class="component"></controls>
            <problem-select class="component"></problem-select>
            <files-input></files-input>
        </div>

        <div class="right-panel">
            <div class="header">Solved instances</div>
            <computing-history></computing-history>
        </div>

        <div class="main-panel center-panel __above-disable-layer">
            <div class="middle-panel">

                <div class="results">
                    <h3>Results</h3>

                    <live-line-chart class="chart"
                        v-bind="liveData.chart"
                        :height="300"
                    ></live-line-chart>

                    <div class="best">

                        <table v-if="!computingStatus.bestResult" class="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th>Best found fitness</th>
                                    <td>{{liveData.best}}</td>
                                </tr>
                                <tr>
                                    <th>Actual finess</th>
                                    <td>{{liveData.actual}}</td>
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
                                    <td>{{computingStatus.bestResult.cost}}</td>
                                    <td>{{computingStatus.bestResult.counter}}</td>
                                    <td>{{parsedProcessTime}}</td>
                                </tr>
                            </tbody>
                        </table>

                        <conf-visual :resultObj="computingStatus.bestResult"></conf-visual>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
            computingStatus: this.$store.state.liveData.computingStatus,
            liveData: this.$store.state.liveData.data
        }
    },
    computed: {
        parsedProcessTime() {
            // TODO try to move to filter
            var parsed = "";
            if (this.computingStatus.bestResult && this.computingStatus.bestResult.processTime) {
                var time = [
                    {name: "m", value: Math.floor(this.computingStatus.bestResult.processTime / (1000 * 60))},
                    {name: "s", value: Math.floor(this.computingStatus.bestResult.processTime / 1000)},
                    {name: "ms", value: Math.floor(this.computingStatus.bestResult.processTime % 1000)}
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
