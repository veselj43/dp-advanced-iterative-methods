<template>
    <div>
        <!-- CONTROL PANEL -->
        <div class="info text-right">
            <div v-on:click="$refs.settings.open()">
                <i class="material-icons">settings</i>
            </div>
            <div>
                <router-link to="/help">
                    <i class="material-icons">help</i>
                </router-link>
            </div>
            <div v-on:click="$refs.deps.open()">
                <i v-if="requiredDependencies.missingFeatures > 0" class="material-icons text-danger">warning</i>
                <i v-if="requiredDependencies.metFeatures > 0" class="material-icons text-success">check_circle</i>
            </div>
        </div>

        <!-- SETTINGS -->
        <sweet-modal ref="settings" title="Settings" overlay-theme="dark">
            <button class="btn btn-default btn-block" v-on:click="clearHistory">
                Clear history for all sections
                <!-- (TODO, its this method atm) -->
            </button>
            <button class="btn btn-default btn-block" v-on:click="clearAllInstances">
                Clear input instances for all problems
            </button>
            <button class="btn btn-default btn-block" v-on:click="deleteDatabase">
                Delete database (history, instances)
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
            
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.deps.close()">OK</button>
            </template>
        </sweet-modal>

        <!-- CONFIRMATION -->
        <sweet-modal ref="confirmation" overlay-theme="dark">
            Proceed action: {{confirmation.message}}?
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

        clearHistory() {
            this.requiresConfirmation(
                this.clearSelectedMethodComputingHistory, 
                "Clear history"
            );
        },

        clearAllInstances() {
            this.requiresConfirmation(
                this.clearInstances, 
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
            'clearSelectedMethodComputingHistory',
            'clearInstances',
            'deleteDB'
        ])
    }
}
</script>

<style scoped>
    .info>div {
        display: inline-block;
        padding: .2em .1em 0 .1em;
        cursor: pointer;
    }
</style>
