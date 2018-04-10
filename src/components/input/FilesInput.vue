<template>
    <div class="fileManager" v-on:drop.stop.prevent="handleDrop" v-on:dragenter="dragEnter" v-on:dragover="dragEnter">
        <div class="header">
            <div class="controlButtons">
                <input id="filesToLoad" style="display: none;" type="file" multiple v-on:change="handleFileSelect">
                <label v-tooltip.top="'Upload instance file'" class="fileLoad btn btn-primary" for="filesToLoad">
                    <span class="glyphicon glyphicon-open"></span>
                </label>
                <button v-tooltip.top="'Generate instance'" class="fileLoad btn btn-primary" v-on:click="$refs.generatorModal.open()">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
                <button v-tooltip.top="'Remove uploaded instances'" class="fileRemove btn btn-danger" v-on:click="removeAllFiles" v-bind:class="{'disabled': (files.length === 0)}">
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
            </div>
            <div class="header-text header-instances">Input instances</div>
        </div>

        <div class="fileList-wrapper">
            <ul v-if="files.length > 0">
                <li v-for="(instance, index) in files" :key="instance._id" v-bind:class="{ 'active': index === selectedFile }">
                    <span class="select" v-on:click="selectInstance({index, id: instance._id})" v-bind:title="instance.file.name">{{instance.file.name}}</span>
                    <span v-if="instance.params" class="icon-info glyphicon glyphicon-info-sign" :id="'instance-info-popover-'+index"></span>
                    <span class="icon-primary glyphicon glyphicon-save" v-on:click="downloadInstance(index)"></span>
                    <span class="icon-danger glyphicon glyphicon-trash" v-on:click="removeInstance(instance)"></span>

                    <span class="popover-wrapper">
                        <popover v-if="instance.params" :target="'#instance-info-popover-'+index" trigger="hover" placement="right">
                            <template slot="popover">
                                <table class="table table-condensed table-params">
                                    <tbody>
                                        <tr v-for="(param, key) in instance.params" :key="key">
                                            <td>{{problemParamsTitles[selectedProblemId][key]}}</td>
                                            <td class="text-right"><strong>{{param}}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </template>
                        </popover>
                    </span>
                </li>
            </ul>
            <p v-if="files.length === 0" class="help-block">No instances uploaded or generated.</p>
        </div>

        <sweet-modal ref="generatorModal" overlay-theme="dark">
            <template slot="title"><strong>Instance generator</strong></template>
            <generator v-on:closeGeneratorModal="$refs.generatorModal.close();"></generator>
        </sweet-modal>

        <sweet-modal ref="removeConfirm" overlay-theme="dark">
            {{confirmAction.bodyText}}
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.removeConfirm.close()">No</button>
                <button class="btn btn-danger" v-on:click="confirm">Yes</button>
            </template>
        </sweet-modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';
import { getDbFileContent } from "@/services/fileReader";
import { downloadFile } from '@/services/download';
import Generator from './Generator';

function FutureAction(bodyText, name, payload) {
    this.bodyText = bodyText;
    this.actionName = name;
    this.payload = payload;
}

export default {
    components: {
		SweetModal,
        Generator
    },

    data() {
        return {
            confirmAction: new FutureAction(),
        }
    },

    computed: {
        ...mapState({
            selectedFile: state => state.inputParams.files.selected.index,
            files: state => state.inputParams.files.instances
        }),

        ...mapGetters([
            'problemParamsTitles',
            'selectedProblemId'
        ])
    },

    mounted() {
        this.loadInstances(true);
    },

    methods: {
        ...mapMutations([
            'selectInstance'
        ]),

        ...mapActions([
            'loadInstances',
            'addInstances',
            'insertInstances'
        ]),

        downloadInstance: function(index) {
            var fileDbObj = this.files[index];

            getDbFileContent(fileDbObj).then((content) => {
                downloadFile(fileDbObj.file.name, btoa(content));
            });
        },

        handleFileSelect: function(event) {
            this.addInstances(event.target.files);
        },

        dragEnter: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        handleDrop: function(event) {
            this.addInstances(event.dataTransfer.files);
        },

        removeInstance(instance) {
            this.$store.dispatch('removeInstance', instance._id);
            this.$notifier.put(
                'undo',
                `Instance "${instance.file.name}" removed.`,
                'undo',
                [this.$notifier.createAction('UNDO', this.insertInstances, [instance])]
            );
        },

        removeAllFiles() {
            this.$refs.removeConfirm.open();
            this.confirmAction = new FutureAction('Do you want to remove all instances?', 'clearInstancesByProblem');
        },

        confirm() {
            if (this.confirmAction.actionName) {
                this.$store.dispatch(this.confirmAction.actionName, this.confirmAction.payload);
                this.confirmAction = new FutureAction();
            }
            this.$refs.removeConfirm.close();
        },
    }
}
</script>

<style lang="scss" scoped>
    .fileManager {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .header .header-instances {
            font-size: 85%;
        }

        input#filesToLoad,
        p,
        .fileLoadLabel {
            padding: .5em 1em;
        }

        .fileList-wrapper {
            margin-top: .5em;
            /*overflow-y: auto;*/
        }

        ul {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #f5faff;
            border: #ddd 1px solid;
            border-width: 1px 0;

            li {
                position: relative;
                display: flex;
                border-bottom: 1px #fff solid;

                &.active {
                    background-color: #fc0;
                }

                span {
                    display: block;
                    line-height: 2em;
                    padding: 0 .5em;
                    cursor: pointer;
                }

                .select {
                    flex-grow: 1;
                }

                .popover-wrapper {
                    display: none;
                }
            }
        }
    }

    .fileLoad,
    .fileRemove {
        display: inline-block;
        cursor: pointer;
    }

    /* TODO style */
    .material-icons {
        font-size: 100%;
    }
</style>
