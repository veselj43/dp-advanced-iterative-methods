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

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Instance</th>
                        <th>Best value</th>
                        <th>States checked</th>
                        <th>Processing time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in comparingResultsInfo.items" :key="index">
                        <td>{{item.instance}}</td>
                        <td>{{item.result.cost}}</td>
                        <td>{{item.result.counter}}</td>
                        <td>{{item.result.processTime | parseTime}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
        
    </div>
</template>

<script>
import LiveChart from './LiveChart';
import ComparisonChart from './ComparisonChart';

export default {
    props: {
        activeSection: {
            required: true
        }
    },

    components: {
        LiveChart,
        ComparisonChart,
    },

    data() {
        return {
            liveData: this.$store.state.liveData.data,
            comparingResultsInfo: this.$store.state.outputData.comparingResults.info,
        }
    },
}
</script>
