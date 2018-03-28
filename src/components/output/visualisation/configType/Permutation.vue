<template>
    <div class="config-permutation">
        <table v-if="comparingResultsItems" class="table-hover">
            <thead>
                <tr>
                    <td>Instance</td>
                    <td v-for="(value, index) in varCount" :key="index">
                        {{index + 1}}.
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in comparingResultsItems" :key="itemIndex">
                    <td class="instanceName">{{item.instance}}</td>
                    <td v-for="(value, configIndex) in item.result.config" :class="{true: value, false: !value}" :key="configIndex">
                        {{value}}
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
