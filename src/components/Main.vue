<template>
    <div class="advancedIterativeMethods">

        <div class="right-panel">
            <div class="inner-relative-block">

                <controls></controls>
                <inputs></inputs>

            </div>
        </div>

        <div class="main-panel">
            <!-- <div class="top-panel">
                <ul>
                    <li><a href="#">Simulované ochlazování</a></li>
                    <li><a href="#">Genetický algoritmus</a></li>
                    <li><a href="#" class="active">Tabu search</a></li>
                </ul>
            </div> -->

            <div class="middle-panel">
                <code>{{progressData}}</code>
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
            progressData: []
        }
    },

    mounted() {
    },

    methods: {
        handleProgress: function(data) {
            this.progressData.push(data.fitness);
        }
    }
}
</script>
