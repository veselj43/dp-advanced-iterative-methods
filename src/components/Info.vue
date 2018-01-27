<template>
    <div class="info">
        <div v-on:click="$refs.deps.open()">
            <span v-if="requiredDependencies.missingFeatures > 0" class="info-btn text-danger">
                <i class="material-icons">warning</i>
            </span>
            <span v-if="requiredDependencies.metFeatures > 0" class="info-btn text-success">
                <i class="material-icons">check_circle</i>
            </span>
        </div>

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
    .info-btn {
        display: inline-block;
        float: right;
        padding: .2em .1em 0 .1em;
        cursor: pointer;
    }
</style>
