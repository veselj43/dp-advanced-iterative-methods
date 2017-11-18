<template>
    <div class="fileManager" v-on:drop="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">
        <div class="header">
            <div class="controlButtons">
                <label v-tooltip.top="'Upload instance file'" class="fileLoad btn btn-primary" for="filesToLoad">
                    <span class="glyphicon glyphicon-plus"></span>
                </label>
                <span v-tooltip.top="'Generate instance'" class="fileLoad btn btn-info" for="filesToLoad" v-on:click="$refs.generatorModal.open()">
                    <span class="glyphicon glyphicon-duplicate"></span>
                </span>
                <button v-tooltip.top="'Remove uploaded instances'" class="fileRemove btn btn-danger" v-on:click="clearInstances">
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
                <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">
            </div>
            <div class="header-text">Input files</div>
        </div>

        <div class="fileList-wrapper">
            <ul v-if="files.length > 0">
                <li v-for="(instance, index) in files" :key="instance.id" v-bind:class="{ active: index === selectedFile }">
                    <span class="remove glyphicon glyphicon-trash" v-on:click="removeInstance(instance.id)"></span>
                    <span class="download glyphicon glyphicon-download-alt" v-on:click="downloadInstance(index)"></span>
                    <span class="select" v-on:click="selectInstance({index, id: instance.id})" v-bind:title="instance.file.name">{{instance.file.name}}</span>
                </li>
            </ul>
            <p v-if="files.length === 0" class="help-block">No files uploaded.</p>
        </div>

        <sweet-modal ref="generatorModal" overlay-theme="dark">
            <template slot="title"><strong>Instance generator</strong></template>
            <generator></generator>
        </sweet-modal>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';
import { downloadFile } from '../../services/download';
import Generator from './Generator';

export default {
    components: {
		SweetModal,
        Generator
    },

    computed: {
        ...mapState({
            selectedFile: state => state.inputParams.files.selected.index,
            files: state => state.inputParams.files.instances
        })
    },

    mounted() {
        this.loadInstances();
    },

    methods: {
        downloadInstance: function(index) {
            var fileDbObj = this.files[index];
            if (fileDbObj.type === 'string') {
                downloadFile(fileDbObj.file.name, btoa(fileDbObj.file.content));
                return;
            }
            if (fileDbObj.type === 'file') {
                var reader = new FileReader();

                reader.fileName = fileDbObj.file.name;
                reader.onLoadCallback = downloadFile;
                reader.onload = function(event) {
                    this.onLoadCallback(this.fileName, btoa(event.target.result));
                };
                reader.readAsBinaryString(fileDbObj.file);
                return;
            }
        },

        handleFileSelect: function(event) {
            this.addInstances(event.target.files);
        },

        dragEnter: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        handleDrop: function(event) {
            event.stopPropagation();
            event.preventDefault();
            this.addInstances(event.dataTransfer.files);
        },

        ...mapMutations([
            'selectInstance'
        ]),

        ...mapActions([
            'loadInstances',
            'addInstances',
            'removeInstance',
            'clearInstances'
        ])
    }
}
</script>

<style scoped>
    .fileManager {
        flex-grow: 1;
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

    .fileLoad,
    .fileRemove {
        display: inline-block;
        cursor: pointer;
    }
</style>
