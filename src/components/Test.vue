<template>
    <div class="advancedIterativeMethods">

        <div class="right-panel">

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
        </div>

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
            status: "None",
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
            this.worker = new Worker("./static/worker.js");

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
    .advancedIterativeMethods {
        height: 100vh;
        background: #f9f9f9;
    }

    .main-panel {
        margin-right: 350px;
    }

    .top-panel {
        height: 4em;
        border-bottom: 1px #ccc solid;
    }

    .top-panel ul {
        float: left;
        display: inline-block;
    }

    .top-panel ul li {
        display: inline-block;
    }

    .top-panel ul li a {
        display: block;
        padding: 0 1em;
        line-height: 4em;
    }

    .top-panel ul li a:hover,
    .top-panel ul li a:focus {
        text-decoration: none;
    }

    .right-panel .controls {
        display: inline-block;
        width: 350px;
        height: 4em;
        padding: 0 2em;
        line-height: 4em;
        border-bottom: #ccc 1px solid;
    }

    .right-panel .controls .status {
        float: left;
    }

    .right-panel .controls .control-buttons {
        float: right;
    }

    .right-panel {
        position: absolute;
        width: 350px;
        height: 100%;
        top: 0;
        right: 0;
        border-left: #ccc 1px solid;
    }

    .right-panel .header {
        padding-left: 1em;
        padding-top: .5em;
        font-size: 120%;
        font-weight: bold;
    }

    .right-panel .problemSelection {
        padding: 1em 2em;
    }

    .right-panel .fileManager {
    }

    .right-panel .fileManager input#filesToLoad,
    .right-panel .fileManager p {
        width: 100%;
        padding: .5em 1em;
    }

    .right-panel .fileManager ul {
        margin: 0;
        padding: 0;
    }

    .right-panel .fileManager ul li {
        display: block;
        padding: .2em .5em;
    }

    .right-panel .fileManager ul li .remove {
        float: right;
        color: #f30;
        cursor: pointer;
    }

    .middle-panel {
        margin: 2em;
        padding: .2em;
    }
</style>
