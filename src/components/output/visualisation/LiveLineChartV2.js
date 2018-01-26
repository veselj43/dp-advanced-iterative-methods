// "vue-chartjs": "3.1.0",
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

// chartjs options
const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    elements: {
        point: {
            radius: 0,
            hoverRadius: 0
        },
        line: {
            tension: 0
        }
    },
    legend: {
        display: false
    },
    hover: {
        enabled: false
    },
    tooltips: {
        enabled: false
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
            id: 'yAxe0',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: 'Fitness',
                fontStyle: 'bold'
            },
            ticks: {
                min: 0,
                beginAtZero: true,
                autoSkip: true
            }
        }]
    }
};

const defaultComponentOptions = {
    debounce: {
        duration: 50
    }
};

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
        componentOptions: {
            type: Object,
            default: function () {
                return defaultComponentOptions;
            }
        }
    },
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    mounted() {
        this.renderChart(this.chartData, Object.assign(defaultOptions, this.options));
    }
}
