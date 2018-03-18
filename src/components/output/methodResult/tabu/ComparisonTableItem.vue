<template>
    <tbody>
        <tr>
            <td v-on:click="expanded = !expanded" class="toggle-detail">
                <span class="glyphicon" :class="{'glyphicon-plus': !expanded, 'glyphicon-minus': expanded}"></span>
            </td>
            <td>{{item.instance}}</td>
            <td class="text-right">{{item.result.cost}}</td>
            <td class="text-right">{{item.result.counter | numberToFormatedString}}</td>
            <td>{{item.result.processTime | parseTime}}</td>
        </tr>
        <tr v-show="expanded" class="comparison-detail">
            <td></td>
            <td colspan="4">
                <table class="table-condensed">
                    <tbody>
                        <tr v-for="(param, key) in item.params" :key="key">
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

export default {
    props: ['item'],

    data() {
        return {
            expanded: false,
        }
    },

    computed: {
        ...mapGetters([
            'selectedMethodId',
            'methodParamsTitles'
        ])
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

    .comparison-detail td:first-child {
        border-right-style: none;
    }

    .comparison-detail td:last-child {
        border-left-style: none;
    }
</style>
