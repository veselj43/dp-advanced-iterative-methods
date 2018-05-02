<template>
    <div class="config-bit-array">
        <h4>Result configuration</h4>
        <table v-if="comparingResultsItems">
            <thead>
                <tr>
                    <td>Name</td>
                    <td v-for="(value, index) in varCount" :key="index">
                        {{index}}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in comparingResultsItems" :key="itemIndex">
                    <td class="instanceName">
                        <span v-if="item.color" :style="'background-color: ' + item.color" class="chart-color-preview">&nbsp;</span>
                        <span>[{{itemIndex}}] {{item.instance}}</span>
                    </td>
                    <td v-for="(value, configIndex) in item.result.config" :class="{true: value, false: !value}" :key="configIndex">
                        {{value ? 'T' : 'F'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import range from 'lodash/range';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'comparingResultsItems'
        ]),

        varCount() {
            var itemIds = Object.keys(this.comparingResultsItems);
            return range(Math.max(0, ...itemIds.map(id => this.comparingResultsItems[id].result.config.length)));
        }
    }
}
</script>

<style scoped>
    table td.true {
        background: #3c3;
        color: #000;
    }

    table td.false {
        background: #c33;
        color: #fff;
    }

    .chart-color-preview {
        display: inline-block;
        vertical-align: middle;
        width: 13px;
        height: 13px;
    }

    .chart-color-preview + span {
        display: inline-block;
        margin-left: .5em;
    }
</style>
