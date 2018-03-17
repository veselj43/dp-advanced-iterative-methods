<template>
    <div>
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

        <sweet-modal ref="settings" title="Settings" overlay-theme="dark">
            <!-- TODO -->
            <div>
                Clear history for all sections
            </div>
            <div>
                Clear input instances for all problems
            </div>
        </sweet-modal>

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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';

export default {
    components: {
        SweetModal
    },
    data() {
        return {
            requiredDependencies: this.$store.state.requiredDependencies
        }
    },
    mounted () {
    },
    methods: {
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
