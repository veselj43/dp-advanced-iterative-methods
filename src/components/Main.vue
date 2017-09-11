<template>
    <div class="advancedIterativeMethods">

        <div class="right-panel">
            <div class="inner-relative-block">

                <controls
                    v-on:handleProgress="handleProgress"
                    v-on:handleResult="handleResult"
                    v-on:interrupt="interrupt"
                ></controls>
                <inputs></inputs>

            </div>
        </div>

        <div class="main-panel">
            <div class="middle-panel">
                <p>progress</p>
                <code>{{progressData}}</code>
                <p>result</p>
                <code>{{result}}</code>
            </div>
        </div>

    </div>
</template>

<script>
import Controls from './input/Controls'
import Inputs from './input/Inputs'

export default {
    components: {
        'controls': Controls,
        'inputs': Inputs
    },

    data() {
        return {
            progressData: [],
            result: null
        }
    },

    mounted() {
    },

    methods: {
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
