<template>
    <div class="advancedIterativeMethods">

        <div class="right-panel"><div class="inner-relative-block">

            <div class="controls">
                <span class="status">Status: <b>{{status}}</b></span>
                <span class="control-buttons">
                    <button class="btn btn-success" v-on:click="start">Start</button>
                    &nbsp;
                    <button class="btn btn-danger" v-on:click="stop">Stop</button>
                </span>
            </div>

            <div class="problemSelection">

            </div>

            <div class="paramsSelection">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="multiplierLimit">multiplierLimit</label>
                        <div class="col-sm-4">
                            <input class="form-control" type="number" id="multiplierLimit" v-model="params.multiplierLimit" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="multiplierTabuSize">multiplierTabuSize</label>
                        <div class="col-sm-4">
                            <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.multiplierTabuSize" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="dividerTabuSize2">dividerTabuSize2</label>
                        <div class="col-sm-4">
                            <input class="form-control" type="number" id="dividerTabuSize2" v-model="params.dividerTabuSize2" placeholder="">
                        </div>
                    </div>
                </form>
            </div>

            <div class="fileManager">
                <div class="header">Nahrané soubory</div>
                <div class="form-group">
            		<input id="filesToLoad" type="file" multiple v-on:change="handleFileSelect">
                </div>
                <ul v-if="files.length > 0">
                    <li v-for="file in files">
                        {{file.name}} <span class="remove glyphicon glyphicon-remove" v-on:click="removeFile(file)"></span>
                    </li>
                </ul>
                <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
            </div>
        </div></div>

        <div class="main-panel">
            <div class="top-panel">
                <ul>
                    <li><a href="#">Simulované ochlazování</a></li>
                    <li><a href="#">Genetický algoritmus</a></li>
                    <li><a href="#" class="active">Tabu search</a></li>
                </ul>
            </div>

            <div class="middle-panel">
                <code>{{progressData.fitness}}</code>
            </div>
        </div>

    </div>
</template>

<script>
function InputFile(name, content) {
    this.name = name;
    this.content = content;
}

export default {
    data() {
        return {
            worker: null,
            status: "Ready",
            files: [],
            params: {
                multiplierLimit: 4,
                multiplierTabuSize: 2,
                dividerTabuSize2: 4
            },
            progressData: {
                fitness: []
            }
        }
    },

    mounted() {
    },

    methods: {
        handleFileSelect: function(evt) {
            var context = this;
            var files = evt.target.files;
            this.fileNames = [];

            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.onLoadCallback = this.addFile(this.files)(files[i]);

                reader.onload = function(evt) {
                    this.onLoadCallback(evt.target.result);
                };

                reader.readAsBinaryString(files[i]);
            }
        },

        addFile: filesArray => fileObj => data => {
            filesArray.push(new InputFile(fileObj.name, data));
        },

        removeFile: function(file) {
            this.files.splice(this.files.indexOf(file), 1);
        },

        start: function() {
            if (typeof(Worker) === "undefined") {
                console.log("Workers not supported.");
                return;
            }
            if (!this.files[0]) {
                console.log("No input file.");
                return;
            }

            var context = this;
            this.progressData.fitness = [];
            this.worker = new Worker("./static/js/worker.js");

            this.worker.onmessage = function(e) {
                if (!_.isArray(e.data)) {
                    console.warn("[Main] Cannot understand worker message.");
                }
                else if (e.data[0] === "progress") {
                    context.progressData.fitness.push(e.data[1].fitness);
                }
                else if (e.data[0] === "result") {
                    console.log('[Main] worker msg: ', e.data[1]);

                    context.worker.terminate();
                    context.worker = null;

                    context.status = "Done";
                }
            }

            this.worker.postMessage([this.files[0], this.params]);

            this.status = "In progress";
        },

        stop: function() {
            if (this.worker === null) {
                console.log("Nothing to stop.");
                return;
            }
            this.worker.terminate();
            this.worker = null;

            this.status = "Stopped";
        }
    }
}
</script>

<style scoped>
</style>
