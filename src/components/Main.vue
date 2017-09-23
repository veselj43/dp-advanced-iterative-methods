<template>
    <div class="advancedIterativeMethods">

        <div class="left-panel">
            <files-input></files-input>
        </div>

        <div class="right-panel">
            <controls
                :handlers="handlers"
            ></controls>

            <params-input></params-input>
        </div>

        <div class="main-panel">
            <div class="middle-panel">

                <div class="results">
                    <h3>Results</h3>

                    <line-chart
                        :data="progressData"
                        :labels="labels"
                        :height="300"
                    ></line-chart>

                    <div class="best" v-if="result">

                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Fitness</th>
                                    <th>Processing time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{result.fitness}}</td>
                                    <td>{{result.processTime}}&nbsp;ms</td>
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
import Controls from './Controls'

import FilesInput from './input/FilesInput'
import ParamsInput from './input/ParamsInput'

import LineChart from './visualisation/LineChart.js'
import ConfVisual from './visualisation/Configuration'

export default {
    components: {
        Controls,
        FilesInput,
        ParamsInput,
        LineChart,
        ConfVisual
    },

    data() {
        return {
            progressData: [],
            result: null,
            labels: [],
            handlers: {
                init: data => {
                    this.labels = _.range(data.numberOfIterations);
                    this.progressData = [];
                    // data.maxFitness;
                },
                progress: data => {
                    if (this.result !== null) {
                        this.result = null;
                        this.progressData = [];
                    }
                    this.progressData.push(data.fitness);
                },
                result: data => {
                    this.result = data;
                },
                interrupt: status => {
                    this.result = null;
                }
            }
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>
