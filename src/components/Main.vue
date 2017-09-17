<template>
    <div class="advancedIterativeMethods">

        <div class="left-panel">
            <files-input></files-input>
        </div>

        <div class="right-panel">
            <controls
                v-on:handleProgress="handleProgress"
                v-on:handleResult="handleResult"
                v-on:interrupt="interrupt"
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
                    :options="{
                        responsive: false,
                        maintainAspectRatio: false,
                        scales: {
    						xAxes: [{
    							ticks: {
                                    /*min: 0,
                                    max: 100,
                                    stepSize: 20,*/
    								autoSkip: true,
                                    autoSkipPadding: 20
    			                }
    						}],
    			            yAxes: [{
    			                ticks: {
                                    min: 0,
                                    max: 100,
                                    stepSize: 10,
    			                    beginAtZero:true
    			                }
    			            }]
    			        }
                    }"
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
            labels: _.range(3640/20)
        }
    },

    mounted() {
    },

    methods: {
        clicked: function(event) {
            this.chartData.push(Math.floor(Math.random()*100));
        },

        handleProgress: function(data) {
            if (this.result !== null) {
                this.result = null;
                this.progressData = [];
            }
            this.progressData.push(data.fitness);
        },

        handleResult: function(data) {
            this.result = data;
        },

        interrupt: function(data) {
            this.result = data;
        }
    }
}
</script>
