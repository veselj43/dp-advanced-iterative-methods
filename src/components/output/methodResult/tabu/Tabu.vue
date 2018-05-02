<template>
    <div class="methodResult">

        <div v-show="activeSection === 'live'">

            <live-chart></live-chart>

            <table class="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <th>Best found value</th>
                        <td>{{liveData.best}}</td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div v-show="activeSection === 'comparison'">

            <comparison-chart></comparison-chart>

            <h4>End results</h4>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th class="toggle-detail"></th>
                        <th>Instance</th>
                        <th>Best value</th>
                        <th>States checked</th>
                        <th>Processing time</th>
                    </tr>
                </thead>
                    <comparison-table-item 
                        v-for="(item, index) in comparingResultsInfo.items"
                        :key="index"
                        :id="index"
                        :item="item">
                    </comparison-table-item>
            </table>

        </div>
        
    </div>
</template>

<script>
import LiveChart from './LiveChart';
import ComparisonChart from './ComparisonChart';
import ComparisonTableItem from '../_common/ComparisonTableItem';

export default {
    props: {
        activeSection: {
            required: true
        }
    },

    components: {
        LiveChart,
        ComparisonChart,
        ComparisonTableItem,
    },

    data() {
        return {
            liveData: this.$store.state.liveData.data,
            comparingResultsInfo: this.$store.state.outputData.comparingResults.info,
            expanded: {}
        }
    },
}
</script>

<style scoped>
    .info-tooltip {
        padding: 0;
    }

    .info-tooltip>span {
        display: block;
        padding: 8px;
        line-height: inherit;
    }

    .toggle-detail {
        width: 36px;
    }
</style>
