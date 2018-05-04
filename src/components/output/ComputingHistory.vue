<template>
    <div class="computingHistory">
        <div>
            <input class="btn-checkbox" type="checkbox" v-model="checkedAll">
            <div class="header">Past runs</div>
        </div>
        <div class="header history-controls row">
            <div class="col-md-12 text-right">
                <button class="btn btn-danger" v-on:click="$refs.clearComputingHistoryConfirm.open()" :disabled="!computingHistory || computingHistory.length === 0">
                    Clear runs
                </button>
            </div>
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
            Do you want to clear past runs in this section?
            <template slot="button">
                <button class="btn btn-info" v-on:click="$refs.clearComputingHistoryConfirm.close()">No</button>
                <button class="btn btn-danger" v-on:click="confirm">Yes</button>
            </template>
        </sweet-modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
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
            this.$store.dispatch('clearComputingHistoryByMethodAndProblem');
            this.$refs.clearComputingHistoryConfirm.close();
        },

        ...mapMutations([
            'toggleAllComparingResults'
        ]),
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
