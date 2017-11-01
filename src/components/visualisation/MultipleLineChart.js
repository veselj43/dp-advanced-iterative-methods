import { Line } from 'vue-chartjs'

// chartjs options
const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    elements: {
        point:{
            radius: 1,
            hoverRadius: 5
        },
        line: {
            tension: 0
        }
    },
    legend: {
        display: false
    },
    hover: {
        mode: 'index',
        intersect: false
        // enabled: false
    },
    tooltips: {
        mode: 'index',
        intersect: false
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
                stepSize: 100,
                beginAtZero: true,
                // maxRotation: 0,
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
                beginAtZero: true,
                autoSkip: true,
            }
        }]
    }
};

const defaultComponentOptions = {
    debounce: {
        duration: -1
    }
};

const defaultDatasetOptions = {
    borderColor: "#f87979",
    backgroundColor: "transparent", // rgba(90,90,90,0.1)
    data: this.chartDataFn
};

function addDataSet(chartData, dataset) {
    if (!dataset.label) {
        dataset.label = "Dataset " + chartData.data.length;
    }
    _.defaults(dataset, defaultDatasetOptions);
    chartData.datasets.push();
}

export default Line.extend({
    props: {
        values: Array,
        labels: Array,
        options: {
            type: Object,
            default: function () {
                return defaultOptions;
            }
        },
        componentOptions: {
            type: Object,
            default: function () {
                return defaultComponentOptions;
            }
        }
    },
    data() {
        return {
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
    mounted () {
        this.renderLineChart();
    },
    methods: {
        renderLineChart: function() {
            var chartData = {
                labels: this.chartLabelsFn,
                datasets: [{
                    label: "Fitness",
                    borderColor: "#f87979",
                    backgroundColor: "transparent", // rgba(90,90,90,0.1)
                    data: this.chartDataFn
                }]
            };

            this.renderChart(chartData, this.options);
        }
    }
});
