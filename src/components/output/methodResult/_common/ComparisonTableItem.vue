<template>
    <tbody>
        <tr>
            <td v-on:click="expanded = !expanded" class="toggle-detail">
                <span class="glyphicon" :class="{'glyphicon-plus': !expanded, 'glyphicon-minus': expanded}"></span>
            </td>
            <td>
                <span v-if="item.color" :style="'background-color: ' + item.color" class="chart-color-preview">&nbsp;</span>
                <span>{{itemTitle}}</span>
            </td>
            <td class="text-right">{{item.result.cost}}</td>
            <td class="text-right">{{item.result.counter | numberToFormatedString}}</td>
            <td>{{item.result.processTime | parseTime}}</td>
        </tr>
        <tr v-show="expanded" class="comparison-detail">
            <td></td>
            <td colspan="4">
                <table class="table-condensed">
                    <tbody>
                        <tr v-for="(param, key) in itemParams" :key="key">
                            <td>{{methodParamsTitles[selectedMethodId][key]}}</td>
                            <td class="text-right"><strong>{{param}}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</template>

<script>
import { mapGetters } from 'vuex';
import {SelectionEnum} from "../../../../computing/methods/genetic/Selection";

export default {
    props: ['id', 'item'],

    data() {
        return {
            expanded: false,
        }
    },

    computed: {
        ...mapGetters([
            'selectedMethodId',
            'methodParamsTitles'
        ]),

        itemTitle() {
            return `[${this.id}] ${this.item.instance}`;
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
    },

    methods: {
        paramsForTooltip(paramsObj) {
            var output = "";
            Object.keys(paramsObj).forEach(key => {
                output += this.methodParamsTitles[this.selectedMethodId][key] + ": " + paramsObj[key] + "\n";
            });
            return output;
        }
    }
}
</script>

<style>
    .table>tbody+tbody {
        border: none;
    }

    .toggle-detail {
        text-align: center;
        cursor: pointer;
    }

    .toggle-detail>span {
        line-height: inherit;
    }

    .chart-color-preview {
        display: inline-block;
        vertical-align: middle;
        width: 13px;
    }

    .chart-color-preview + span {
        display: inline-block;
        margin-left: .5em;
    }

    .comparison-detail td:first-child {
        border-right-style: none;
    }

    .comparison-detail td:last-child {
        border-left-style: none;
    }
</style>
