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
                <p>progress</p>
                <code>{{progressData}}</code>
                <p>result</p>
                <code>{{result}}</code>
            </div>
        </div>

    </div>
</template>

<script>
import Controls from './Controls'
import FilesInput from './input/FilesInput'
import ParamsInput from './input/ParamsInput'

export default {
    components: {
        Controls,
        FilesInput,
        ParamsInput
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
