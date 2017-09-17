import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
    props: ['data', 'labels', 'options'],
    computed: {
        chartDataFn: function() {
            return this.data;
        },
        chartLabelsFn: function() {
            return this.labels;
        }
    },
    watch: {
        data: function() {
            if (this.data.length === 1) {
                console.log("destroy");
                this._chart.destroy();
                this.renderLineChart();
            }
            this._chart.update();
        }
    },
    mounted () {
        this.renderLineChart();
    },
    methods: {
        renderLineChart: function() {
            this.renderChart(
                {
                    labels: this.chartLabelsFn,
                    datasets: [{
                        label: "Fitness",
                        borderColor: "#f87979",
						backgroundColor: "rgba(90,90,90,0.2)",
                        data: this.chartDataFn
                    }]
                },
                this.options
            );
        }
    }
});
