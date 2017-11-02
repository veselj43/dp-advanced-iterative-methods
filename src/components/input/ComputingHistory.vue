<template>
    <div class="computingHistory">
        <button class="btn btn-default" v-on:click="mockDB">Mock db</button>
        <button class="btn btn-default" v-on:click="deleteDB">Delete db</button>
        <button class="btn btn-default" v-on:click="removeHistory">Clear history</button>

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
        ]),
        ...mapActions([
            'mockDB',
            'removeHistory',
            'deleteDB'
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
