<template>
    <div class="advancedIterativeMethods">

        <div class="right-panel">
            <div class="inner-relative-block">

                <controls
                    :params="params"
                    :input-files="preloadedFiles"
                    v-on:handleProgress="handleProgress">
                </controls>
                <inputs
                    :params.sync="params"
                    :files="preloadedFiles"
                    v-on:handleFiles="handleFiles"
                    v-on:removeFile="removeFile">
                </inputs>

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

function InputFile(name, content) {
    this.name = name;
    this.content = content;
}

export default {
    components: {
        'controls': Controls,
        'inputs': Inputs
    },

    data() {
        return {
            progressData: [],
            preloadedFiles: [],
            params: {
                problemKey: 1,
                methodKey: 'Tabu',
                tabu_multiplierLimit: 2,
                tabu_multiplierTabuSize: 1,
                tabu_dividerTabuSize2: 4
            }
        }
    },

    mounted() {
    },

    methods: {
        handleFiles: function(event) {
            var context = this;
            var files = event.target.files;
            this.fileNames = [];
            this.preloadedFiles = [];

            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.onLoadCallback = this.addFile(this.preloadedFiles)(files[i]);

                reader.onload = function(event) {
                    this.onLoadCallback(event.target.result);
                };

                reader.readAsBinaryString(files[i]);
            }
        },

        addFile: filesArray => fileObj => data => {
            filesArray.push(new InputFile(fileObj.name, data));
        },

        removeFile: function(index) {
            this.preloadedFiles.splice(index, 1);
        },

        handleProgress: function(data) {
            this.progressData.push(data.fitness);
        }
    }
}
</script>
