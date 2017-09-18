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
                <!-- <p>progress</p>
                <code>{{progressData}}</code> -->
                <p>result</p>
                <code>{{result}}</code>

                <br>
                <br>

                <line-chart
                    :data="progressData"
                    :labels="labels"
                    :width="800"
                    :height="200"
                ></line-chart>

            </div>
        </div>

    </div>
</template>

<script>
import Controls from './Controls'
import FilesInput from './input/FilesInput'
import ParamsInput from './input/ParamsInput'

// import ChartTest from './ChartTest'

import LineChart from './LineChart.js'

export default {
    components: {
        Controls,
        FilesInput,
        ParamsInput,
        LineChart
    },

    data() {
        return {
            progressData: [],
            result: null,
            labels: [],
            handlers: {
                init: data => {
                    this.labels = _.range(data.numberOfIterations);
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
                interrupt: data => {
                    this.result = data;
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
