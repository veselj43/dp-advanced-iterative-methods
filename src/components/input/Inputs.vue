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
            <div class="form-group">
                <input id="filesToLoad" type="file" multiple v-on:change="handleFileSelect">
            </div>

            <ul v-if="files.length > 0">
                <li v-for="(file, index) in files">
                    {{file.name}} <span class="remove glyphicon glyphicon-remove" v-on:click="removeFile(index)"></span>
                </li>
            </ul>
            <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
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
                    {value: 1, text: "3 SAT"}
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
        $eventBus.$on("getInput", function(callback) {
            console.log(context.files);
            callback(context.params, {files: context.files});
        });
    },

    methods: {
        handleFileSelect: function(event) {
            this.files = event.target.files;
            // this.$emit('handleFiles', event);
        },

        removeFile: function(index) {
            // this.$emit('removeFile', index);
        }
    }
}
</script>
