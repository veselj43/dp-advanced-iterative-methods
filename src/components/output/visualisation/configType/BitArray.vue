<template>
    <div class="config-bit-array">
        <table v-if="comparingResultsItems">
            <thead>
                <tr>
                    <td>Instance</td>
                    <td v-for="(value, index) in varCount" :key="index">
                        {{index}}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in comparingResultsItems" :key="itemIndex">
                    <td class="instanceName">{{item.instance}}</td>
                    <td v-for="(value, configIndex) in item.result.config" :class="{true: value, false: !value}" :key="configIndex">
                        {{value ? 'T' : 'F'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'comparingResultsItems'
        ]),

        varCount() {
            var itemIds = Object.keys(this.comparingResultsItems);
            return _.range(Math.max(0, ...itemIds.map(id => this.comparingResultsItems[id].result.config.length)));
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
</style>
