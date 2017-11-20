<template>
    <div class="computingHistory">
        <div class="header">Computed instances</div>
        <!-- <div class="header historyControls">
            <button class="btn btn-danger" v-on:click="clearComputingHistory">
                <span class="glyphicon glyphicon-trash"></span>
            </button>
        </div> -->
        <div class="list-group">
            <computing-history-item
                v-for="(result, index) in computingHistory"
                :key="result.id"
                :item="result"
                :index="index"
            ></computing-history-item>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ComputingHistoryItem from './ComputingHistoryItem';

export default {
    components: {
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
        text-align: right;
    }
</style>
