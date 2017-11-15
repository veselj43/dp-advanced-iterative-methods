<template>
    <div class="fileManager" v-on:drop="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">
        <div class="header">
            <div class="fileControlButtons">
                <label class="fileLoad btn btn-primary" for="filesToLoad"><span class="glyphicon glyphicon-plus"></span></label>
                <button class="fileRemove btn btn-danger" v-on:click="removeAllFiles"><span class="glyphicon glyphicon-trash"></span></button>
                <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">
            </div>
            <div class="header-text">Input files</div>
        </div>

        <div class="fileList-wrapper">
            <ul v-if="files.length > 0">
                <li v-for="(file, index) in files" v-bind:class="{ active: index === selectedFile }">
                    <span class="remove glyphicon glyphicon-trash" v-on:click="removeFile(index)"></span>
                    <span class="download glyphicon glyphicon-download-alt"></span>
                    <span class="select" v-on:click="selectFile(index)" v-bind:title="file.name">{{file.name}}</span>
                </li>
            </ul>
            <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            selectedFile: state => state.inputParams.files.selected,
            files: state => state.inputParams.files.files
        })
    },

    mounted() {
        this.loadInstances();
    },

    methods: {
        handleFileSelect: function(event) {
            this.addFiles(event.target.files);
            // this.addInstances(event.target.files);
        },

        dragEnter: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        handleDrop: function(event) {
            event.stopPropagation();
            event.preventDefault();
            this.addFiles(event.dataTransfer.files);
        },

        ...mapMutations([
            'addFiles',
            'selectFile',
            'removeFile',
            'removeAllFiles'
        ]),

        ...mapActions([
            'loadInstances',
            'addInstances',
            'removeInstance'
        ])
    }
}
</script>

<style scoped>
    .fileManager {
        display: flex;
        flex-direction: column;
    }

    .fileManager > * {
        flex-shrink: 0;
    }

    .fileManager input#filesToLoad,
    .fileManager p,
    .fileManager .fileLoadLabel {
        padding: .5em 1em;
    }

    .fileList-wrapper {
        margin-top: .5em;
        flex-shrink: 1;
        overflow-y: auto;
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

    .fileManager ul li .download {
        float: right;
        color: #03f;
    }

    .fileManager ul li .remove {
        float: right;
        color: #f30;
    }

    .header-text, .fileControlButtons {
        display: inline-block;
        height: 34px;
        line-height: 34px;
    }

    .fileControlButtons {
        margin-right:  1em;
        float: right;
    }

    .fileLoad,
    .fileRemove {
        display: inline-block;
        cursor: pointer;
    }
</style>
