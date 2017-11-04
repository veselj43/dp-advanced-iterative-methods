<template>
    <div class="computingHistory">
        <div class="historyList">
            <div class="list-group">
                <computing-history-item
                    v-for="(result, index) in computingHistory"
                    :key="index"
                    :item="result"
                ></computing-history-item>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import ComputingHistoryItem from './ComputingHistoryItem';

export default {
    components: {
        ComputingHistoryItem
    },
    computed: {
        ...mapState({
            computingHistory: (state) => state.database.computingHistory
        }),
        ...mapGetters([
            'methodEnum',
            'problemEnum'
        ])
    },
    methods: {
        toggle(index) {
            console.log(this.collapsed[index]);
            this.isActive = ! this.isActive;
            this.collapsed[index] = !this.collapsed[index];
        },
        ...mapMutations([
        ])
    },
    mounted() {
        this.$store.dispatch('loadComputingHistory');
    }
}
</script>

<style scoped>
    .historyList {
        margin-top: 1em;
    }
</style>
