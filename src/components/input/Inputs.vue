<template>
    <div class="method-inputs">
        <div class="paramsSelection">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="problemKey">Problem</label>
                    <div class="col-sm-6">
                        <select class="form-control" id="problemKey" v-model="params.problemKey">
                            <option v-for="problem in options.problems" v-bind:value="problem.value">{{problem.text}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="methodKey">Method</label>
                    <div class="col-sm-6">
                        <select class="form-control" id="methodKey" v-model="params.methodKey">
                            <option v-for="method in options.methods" v-bind:value="method.value">{{method.text}}</option>
                        </select>
                    </div>
                </div>

                <keep-alive>
                    <component :is="params.methodKey" :params.sync="params"></component>
                </keep-alive>

            </form>
        </div>

        <div class="fileManager">
            <div class="header">Nahrané soubory</div>
            <div class="dropZone" v-on:drop="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">

                <label class="fileLoadLabel" for="filesToLoad">Select files</label>
                <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">

                <ul v-if="files.length > 0">
                    <li v-for="(file, index) in files">
                        {{file.name}} <span class="remove glyphicon glyphicon-remove" v-on:click="removeFile(index)"></span>
                    </li>
                </ul>
                <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
            </div>
        </div>
    </div>
</template>

<script>
import AnnealingParams from "./methodParams/Annealing"
import GeneticParams from "./methodParams/Genetic"
import TabuParams from "./methodParams/Tabu"

export default {
    components: {
        'Annealing': AnnealingParams,
        'Genetic': GeneticParams,
        'Tabu': TabuParams
    },

    data() {
        return {
            options: {
                methods: [
                    {
                        value: 'Annealing',
                        text: "Simulované ochlazování"
                    }, {
                        value: 'Genetic',
                        text: "Genetický algoritmus"
                    }, {
                        value: 'Tabu',
                        text: "Tabu prohledávání"
                    }
                ],
                problems: [
                    {value: 1, text: "SAT"},
                    {value: 2, text: 'Travelling Salesman'}
                ]
            },
            params: {
                problemKey: 1,
                methodKey: 'Tabu',
                tabu_multiplierLimit: 2,
                tabu_multiplierTabuSize: 1,
                tabu_dividerTabuSize2: 4
            },
            files: []
        }
    },

    mounted() {
        var context = this;
        $eventBus.$on("getParams", function(callback) {
            callback(context.params);
        });

        $eventBus.$on("getFiles", function(callback) {
            callback({files: context.files});
        });
    },

    methods: {
        handleFileSelect: function(event) {
            for (var i = 0, file; file = event.target.files[i]; i++) {
                this.files.push(file);
            }
        },

        dragEnter: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        handleDrop: function(event) {
            event.stopPropagation();
            event.preventDefault();
            console.log(event);
            this.files = event.dataTransfer.files;
        },

        removeFile: function(index) {
            this.files.splice(index, 1);
        }
    }
}
</script>
