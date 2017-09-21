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
            options: this.customOptions || defaultOptions,
            renderedData: [],
            lastUpdate: performance.now()
        }
    },
    computed: {
        chartDataFn: function() {
            return this.renderedData;
        },
        chartLabelsFn: function() {
            return this.labels;
        }
    },
    watch: {
        data: function() {
            if (this.data.length === 0) {
                this.renderedData = [];
                this._chart.destroy();
                this.renderLineChart();
            }
            else if (
                ((performance.now() - this.lastUpdate) > 50) ||
                this.data.length === this.labels.length
            ) {
                this.renderedData.push.apply(this.renderedData, this.data.slice(this.renderedData.length));
                this.lastUpdate = performance.now();
                this._chart.update();
            }
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
