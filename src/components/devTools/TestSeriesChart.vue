<script>
import TestSeriesChartMixin from './TestSeriesChartMixin.vue';

export default {
    mixins: [TestSeriesChartMixin],

    methods: {
        generateData() {
            let index = (this.ndx) ? this.ndx.size() : 0;
            let newData = [];
            for (let i = index; i < index + 500; i++) {
                newData.push([i, Math.round(Math.sin(i/100)*1000), (index < 8000)]);
            }
            return newData;
        }
    }
}
</script>
