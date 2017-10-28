<template>
    <div class="fileManager" v-on:drop="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">
        <div class="header">Input files</div>

            <div class="fileControlButtons">
                <label class="fileLoad btn btn-primary" for="filesToLoad">Add</label>
                <button class="fileRemove btn btn-danger" v-on:click="removeAllFiles">Remove</button>
                <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">
            </div>

            <div class="fileList-wrapper">
                <ul v-if="files.length > 0">
                    <li v-for="(file, index) in files" v-bind:class="{ active: index === activeFile }">
                        <span class="remove glyphicon glyphicon-remove" v-on:click="removeFile(index)"></span>
                        <span class="select" v-on:click="selectFile(index)" v-bind:title="file.name">{{file.name}}</span>
                    </li>
                </ul>
                <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            files: [],
            activeFile: 0
        }
    },

    mounted() {
        var context = this;
        $eventBus.$on("getFiles", function(callback) {
            callback({file: context.files[context.activeFile]});
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
            for (var i = 0, file; file = event.dataTransfer.files[i]; i++) {
                this.files.push(file);
            }
        },

        removeFile: function(index) {
            this.files.splice(index, 1);
            if (this.activeFile > index || index === this.files.length) this.activeFile--;
            if (this.activeFile < 0) this.activeFile = 0;
        },

        removeAllFiles: function(index) {
            this.files = [];
            this.activeFile = 0;
        },

        selectFile: function(index) {
            this.activeFile = index;
        }
    }
}
</script>

<style scoped>
    .fileManager {
    }

    .fileManager input#filesToLoad,
    .fileManager p,
    .fileManager .fileLoadLabel {
        padding: .5em 1em;
    }

    /* TODO file list scrolling */
    .fileList-wrapper {
        position: relative;
    }

    .fileManager ul {
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #f5faff;
        border: #ddd 1px solid;
        border-width: 1px 0;
        overflow-y: auto;
    }

    .fileManager ul li {
        display: block;
        border-bottom: 1px #fff solid;
    }

    .fileManager ul li.active {
        background-color: #fc0;
    }

    .fileManager ul li span {
        display: block;
        line-height: 2em;
        padding: 0 .5em;
        cursor: pointer;
    }

    .fileManager ul li .select {
        width: auto;
        overflow: hidden;
        cursor: pointer;
    }

    .fileManager ul li .remove {
        float: right;
        color: #f30;
    }

    .fileControlButtons {
        margin: .3em 1em .5em 1em;
    }

    .fileLoad,
    .fileRemove {
        display: inline-block;
        cursor: pointer;
    }

    .fileLoad {
        width: 60%;
    }

    .fileRemove {
        width: 35%;
        float: right;
    }
</style>
