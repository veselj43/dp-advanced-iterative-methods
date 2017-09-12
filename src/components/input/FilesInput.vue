<template>
    <div class="fileManager" v-on:drop="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">
        <div class="header">Nahrané soubory</div>

            <label class="fileLoadLabel btn btn-primary" for="filesToLoad">Add files</label>
            <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">

            <ul v-if="files.length > 0">
                <li v-for="(file, index) in files" v-bind:class="{ active: index === activeFile }">
                    <span class="remove glyphicon glyphicon-remove" v-on:click="removeFile(index)"></span>
                    <span class="select" v-on:click="selectFile(index)" v-bind:title="file.name">{{file.name}}</span>
                </li>
            </ul>
            <p v-if="files.length === 0" class="help-block">Žádné nahrané soubory.</p>
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

        selectFile: function(index) {
            this.activeFile = index;
        }
    }
}
</script>
