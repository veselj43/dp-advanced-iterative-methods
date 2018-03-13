<template>
    <div class="history-list-item">
        <div class="history-list-item-heading">
            <label>
                <div class="history-list-item-label">
                    <input type="checkbox" v-model="checked">
                    <div class="collapse-header">{{item.instance}}</div>
                </div>
            </label>
            <span class="collapse-switch" v-on:click="toggle">
                <span v-if="isOpen" class="glyphicon glyphicon-triangle-bottom"></span>
                <span v-else class="glyphicon glyphicon-triangle-left"></span>
            </span>
        </div>
        <div class="history-list-item-text collapsable" v-bind:class="{'collapsed': !isOpen}">
            <table class="table table-condensed">
                <tbody>
                    <!--TODO hide unused genetic algorithm params-->
                    <tr v-for="(param, key) in item.params" :key="key">
                        <td>{{methodParamsTitles[selectedMethodId][key]}}</td>
                        <td class="text-right"><strong>{{param}}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

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
                return !!this.$store.state.outputData.comparingResults.info.items[this.item.id];
            },
            set() {
                this.toggleIndexInComparingResults(this.index);
            }
        },

        ...mapGetters([
            'methodParamsTitles',
            'selectedMethodId'
        ])
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },

        ...mapMutations([
            'toggleIndexInComparingResults'
        ])
    }
}
</script>

<style lang="scss" scoped>
    $duration-primary: 200ms;
    $duration-secondary: 300ms;

    .historyList {
        margin-top: 1em;
    }

    .history-list-item {
        padding: 0;
    }

    .history-list-item-heading {
        position: relative;
        display: block;
        margin: 0;
        padding: 0;
        background-color: #fff;
        border-bottom: #ddd 1px solid;

        label {
            width: 100%;
            margin: 0;
            padding: 5px;
            font-weight: 400;
            cursor: pointer;

            input[type=checkbox] {
                position: absolute;
                margin-left: -20px;
            }

            .history-list-item-label {
                margin: 0;
                margin-right: 25px;
                padding-left: 20px;
            }
        }

        .collapse-header {
            display: inline-block;
            font-size: 110%;
        }

        .collapse-switch {
            position: absolute;
            display: block;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            padding: 7px;
            font-size: 90%;
            cursor: pointer;
        }
    }

    .history-list-item-text {
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
</style>
