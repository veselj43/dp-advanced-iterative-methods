import { Line } from 'vue-chartjs'

var defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    elements: {
        point:{
            radius: 0,
            hoverRadius: 4
        },
        line: {
            tension: 0
        }
    },
    legend: {
        display: false
    },
    tooltips: {
        // enabled: false
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Iterations',
                fontStyle: 'bold'
            },
            ticks: {
                min: 0,
                stepSize: 10,
                maxRotation: 0,
                autoSkip: true
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Fitness',
                fontStyle: 'bold'
            },
            ticks: {
                min: 0,
                stepSize: 10,
                beginAtZero:true
            }
        }]
    }
};

export default Line.extend({
    props: ['data', 'labels', 'customOptions'],
    data() {
        return {
            options: this.customOptions || defaultOptions
        }
    },
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
						backgroundColor: "transparent", // rgba(90,90,90,0.1)
                        data: this.chartDataFn
                    }]
                },
                this.options
            );
        }
    }
});
