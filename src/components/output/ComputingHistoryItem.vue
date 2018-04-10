<template>
    <div class="history-list-item">
        <div class="history-list-item-heading">
            <label class="history-list-item-label" :title="item.instance">
                <input type="checkbox" v-model="checked">
                <div class="history-list-item-collapse-header">{{item.instance}}</div>
            </label>
            <div class="history-list-item-remove" v-on:click="removeHistoryItem(item)">
                <span class="icon-danger glyphicon glyphicon-trash"></span>
            </div>
            <span class="history-list-item-collapse-switch" v-on:click="toggle">
                <span v-if="isOpen" class="glyphicon glyphicon-triangle-bottom"></span>
                <span v-else class="glyphicon glyphicon-triangle-left"></span>
            </span>
        </div>
        <div class="history-list-item-text collapsable" v-bind:class="{'collapsed': !isOpen}">
            <table class="table table-condensed">
                <tbody>
                    <tr v-for="(param, key) in itemParams" :key="key">
                        <td>{{methodParamsTitles[selectedMethodId][key]}}</td>
                        <td class="text-right"><strong>{{param}}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { SelectionEnum } from '@/computing/methods/genetic/Selection';

let removeHistoryItemUndo = (context) => (item) => {
    context.$store.commit('adjustIndexesAfterRemoveUndo', context.index);
    context.$store.dispatch('insertComputingHistory', item);
}

export default {
    props: ['item', 'index'],
    data() {
        return {
            isOpen: false
        }
    },

    computed: {
        checked: {
            get() {
                return !!this.$store.state.outputData.comparingResults.info.items[this.item._id];
            },
            set() {
                this.toggleIndexInComparingResults(this.index);
            }
        },

        itemParams() {
            if (this.selectedMethodId === 'genetic') {
                let params = {...this.item.params}; // one way to copy an object
                if (params.selectionType !== SelectionEnum.TOURNAMENT) {
                    delete params.tournamentSize;
                }
                if (params.selectionType !== SelectionEnum.ROULETTE_LINEAR && params.selectionType !== SelectionEnum.ROULETTE_RANK) {
                    delete params.scaleMin;
                    delete params.scaleMax;
                }

                return params;
            }
            return this.item.params;
        },

        ...mapGetters([
            'methodParamsTitles',
            'selectedMethodId'
        ])
    },

    methods: {
        ...mapMutations([
            'toggleIndexInComparingResults'
        ]),

        toggle() {
            this.isOpen = !this.isOpen;
        },

        removeHistoryItem(item) {
            if (this.checked) {
                this.toggleIndexInComparingResults(this.index);
            }
            this.$store.commit('adjustIndexesAfterRemove', this.index);
            this.$store.dispatch('clearComputingHistoryItemInMethodById', item._id);
            this.$notifier.put(
                'undo', 
                `Computing history record "${item.instance}" removed.`, 
                'undo', 
                [this.$notifier.createAction('UNDO', removeHistoryItemUndo(this), item)]
            );
        },
    }
}
</script>

<style lang="scss" scoped>
    $duration-primary: 200ms;
    $duration-secondary: 300ms;

    .history-list-item {
        padding: 0;

        &-heading {
            display: flex;
            margin: 0;
            padding: 0;
            background-color: #fff;
            border-bottom: #ddd 1px solid;
        }

        &-label {
            flex-grow: 1;
            min-width: 0;
            margin: 0;
            padding-left: 25px !important;
            font-weight: 400;
            cursor: pointer;

            input[type=checkbox] {
                position: absolute;
                margin-left: -20px;
            }
        }

        &-collapse-header {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 110%;
        }

        &-label,
        &-remove,
        &-collapse-switch {
            padding: 5px;
            cursor: pointer;
        }

        &-remove > span {
            line-height: 1.4;
        }

        &-collapse-switch > span {
            font-size: 90%;
            line-height: 1.4;
        }

        &-text {
            .table {
                margin: 0;
            }

            &.collapsable {
                max-height: 500px;
                padding: 5px;
                padding-left: 20px;
                overflow: hidden;
                background-color: #ddd;
                -webkit-transition: max-height $duration-primary, padding-top $duration-secondary, padding-bottom $duration-secondary;
                transition: max-height $duration-primary, padding-top $duration-secondary, padding-bottom $duration-secondary;

                &.collapsed {
                    max-height: 0;
                    padding-top: 0;
                    padding-bottom: 0;
                }
            }
        }
    }
</style>
