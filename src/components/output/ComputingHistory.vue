<template>
    <div class="computingHistory">
        <div>
            <input class="btn-checkbox" type="checkbox" v-model="checkedAll">
            <div class="header">Computation history</div>
        </div>
        <div class="header history-controls">
            <!-- <div class="height-filler"></div> -->
            <button class="btn btn-danger" v-on:click="$refs.clearComputingHistoryConfirm.open()" :disabled="!computingHistory || computingHistory.length === 0">
                Clear history
            </button>
        </div>
        <div class="scroll-area">
            <div class="history-list">
                <computing-history-item
                    v-for="(result, index) in computingHistory"
                    :key="result._id"
                    :item="result"
                    :index="index"
                ></computing-history-item>
            </div>
        </div>

        <sweet-modal ref="clearComputingHistoryConfirm" overlay-theme="dark">
            Do you want to clear computation history?
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.clearComputingHistoryConfirm.close()">No</button>
                <button class="btn btn-danger" v-on:click="confirm">Yes</button>
            </template>
        </sweet-modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { SweetModal } from 'sweet-modal-vue';
import ComputingHistoryItem from './ComputingHistoryItem';

export default {
    components: {
        SweetModal,
        ComputingHistoryItem
    },
    computed: {
        checkedAll: {
            get() {
                return (
                    this.$store.state.outputData.comparingResults.info.activeCount > 0 &&
                    this.$store.state.outputData.comparingResults.info.activeCount === this.$store.state.outputData.computingHistory.length
                );
            },
            set() {
                this.toggleAllComparingResults(this.checkedAll);
            }
        },
        ...mapState({
            computingHistory: (state) => state.outputData.computingHistory
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
        confirm() {
            this.clearSelectedMethodComputingHistory();
            this.$refs.clearComputingHistoryConfirm.close();
        },

        ...mapMutations([
            'toggleAllComparingResults'
        ]),

        ...mapActions([
            'clearSelectedMethodComputingHistory'
        ])
    }
}
</script>

<style lang="scss" scoped>
    .computingHistory {
        input, input + .header {
            display: inline-block;
        }
    }

    .scroll-area {
        overflow-y: auto;
        border-top: #ccc 1px solid;
    }

    .history-list {
        margin-bottom: .2em;
    }

    .history-controls {
        padding-right: 1em;
        padding-bottom: .5em;
        text-align: right;
    }

    .height-filler {
        width: 1px;
        height: 24px;
        display: inline-block;
    }

    .btn-checkbox {
        margin-left: 1em;
        transform: scale(1.5);
        -ms-transform: scale(1.5); /* IE */
        -moz-transform: scale(1.5); /* FF */
        -webkit-transform: scale(1.5); /* Safari and Chrome */
        -o-transform: scale(1.5); /* Opera */
    }
</style>
