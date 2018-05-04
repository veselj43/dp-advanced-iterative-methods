<template>
    <div>
        <!-- CONTROL PANEL -->
        <div class="info text-right">
            <div v-on:click="$refs.settings.open()" v-tooltip.top="'Settings'">
                <i class="fas fa-cog"></i>
            </div>
            <router-link to="/help" v-tooltip.top="'Help'">
                <i class="fas fa-question-circle"></i>
            </router-link>
            <div v-on:click="$refs.deps.open()">
                <span v-if="requiredDependencies.missingFeatures > 0" v-tooltip.left="'Dependencies not met'">
                    <i class="text-danger fas fa-times-circle"></i>
                </span>
                <span v-if="requiredDependencies.metFeatures > 0" v-tooltip.left="'Dependencies met'">
                    <i class="text-success fas fa-check-circle"></i>
                </span>
            </div>
        </div>

        <!-- SETTINGS -->
        <sweet-modal ref="settings" title="Settings" overlay-theme="dark">
            <button class="btn btn-danger btn-block" v-on:click="clearHistories">
                Clear history for all sections
            </button>
            <button class="btn btn-danger btn-block" v-on:click="clearInstances">
                Clear input instances for all problems
            </button>
            <button class="btn btn-danger btn-block" v-on:click="deleteDatabase">
                Delete whole database (history, instances)
            </button>
        </sweet-modal>

        <!-- DEPENDENCIES -->
        <sweet-modal ref="deps" title="Dependencies" overlay-theme="dark">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Browser dependency</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feature, index) in requiredDependencies.deps" :key="index">
                        <td>{{feature.dependencyName}}</td>
                        <td>
                            <span v-if="feature.isSupported" class="text-success glyphicon glyphicon-ok"></span>
                            <span v-else class="text-danger glyphicon glyphicon-remove"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </sweet-modal>

        <!-- CONFIRMATION -->
        <sweet-modal ref="confirmation" overlay-theme="dark">
            <strong>Proceed action: {{confirmation.message}}?</strong>
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.confirmation.close()">No</button>
                <button class="btn btn-danger" v-on:click="confirm">Yes</button>
            </template>
        </sweet-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';

export default {
    components: {
        SweetModal
    },
    data() {
        return {
            requiredDependencies: this.$store.state.requiredDependencies,
            confirmation: {
                message: 'undefined',
                proceedAction: null
            }
        }
    },
    mounted () {
    },
    methods: {
        requiresConfirmation(action, message) {
            this.confirmation.proceedAction = action;
            this.confirmation.message = message;
            this.$refs.confirmation.open();
        },
        confirm() {
            this.confirmation.proceedAction();
            this.confirmation.proceedAction = null;
            this.$refs.confirmation.close();
            this.$notifier.push('Action: "' + this.confirmation.message + '" was succesful', 'success');
        },

        clearHistories() {
            this.requiresConfirmation(
                this.clearAllComputingHistories,
                "Clear computation history"
            );
        },

        clearInstances() {
            this.requiresConfirmation(
                this.clearAllInstances,
                "Clear all instances"
            );
        },

        deleteDatabase() {
            this.requiresConfirmation(
                this.deleteDB,
                "Delete database"
            );
        },

        ...mapActions([
            'clearAllComputingHistories',
            'clearAllInstances',
            'deleteDB'
        ])
    }
}
</script>

<style scoped>
    .info>* {
        display: inline-block;
        width: 1.2em;
        padding: .2em 0 0.1em 0;
        text-align: center;
        cursor: pointer;
        font-size: 150%;
    }
</style>
