<template>
    <div class="config-permutation">
        <table v-if="comparingResultsItems" class="table-hover">
            <thead>
                <tr>
                    <td>Name</td>
                    <td v-for="(value, index) in varCount" :key="index">
                        {{index + 1}}.
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in comparingResultsItems" :key="itemIndex">
                    <td class="instanceName">
                        <span v-if="item.color" :style="'background-color: ' + item.color" class="chart-color-preview">&nbsp;</span>
                        <span>{{item.instance}}</span>
                    </td>
                    <td v-for="(value, configIndex) in item.result.config" :class="{true: value, false: !value}" :key="configIndex">
                        {{value}}
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
