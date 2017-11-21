<template>
    <div class="computingHistory">
        <div class="header">Computed instances</div>
        <div class="header historyControls">
            <button class="btn btn-primary" v-on:click="deselectAll">
                Deselect all
            </button>
            <button class="btn btn-danger pull-right" v-on:click="$refs.clearComputingHistoryConfirm.open()">
                Clear history
            </button>
        </div>
        <div class="list-group">
            <computing-history-item
                v-for="(result, index) in computingHistory"
                :key="result.id"
                :item="result"
                :index="index"
            ></computing-history-item>
        </div>

        <sweet-modal ref="clearComputingHistoryConfirm" overlay-theme="dark">
            <template slot="title"><strong>Are you sure?</strong></template>
            Do you want to clear computing history?
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.clearComputingHistoryConfirm.close()">No</button>
                <button class="btn btn-danger" v-on:click="confirm">Yes</button>
            </template>
        </sweet-modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';
import ComputingHistoryItem from './ComputingHistoryItem';

export default {
    components: {
        SweetModal,
        ComputingHistoryItem
    },
    computed: {
        ...mapState({
            computingHistory: (state) => state.outputData.computingHistory.reverse()
        }),
        ...mapGetters([
            'methodEnum',
            'problemEnum'
        ])
    },
    mounted() {
        this.$store.dispatch('loadComputingHistory');
    },
    methods: {
        deselectAll() {
            // TODO
        },

        confirm() {
            this.clearComputingHistory();
            this.$refs.clearComputingHistoryConfirm.close();
        },

        ...mapActions([
            'clearComputingHistory'
        ])
    }
}
</script>

<style scoped>
    .computingHistory {
        overflow-y: auto;
    }

    .historyControls {
        padding-right: 1em;
        padding-bottom: .5em;
        /*text-align: right;*/
    }
</style>
