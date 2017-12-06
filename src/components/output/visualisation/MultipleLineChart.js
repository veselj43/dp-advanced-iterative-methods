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
        display: true
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
            type: 'linear',
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Iterations',
                fontStyle: 'bold'
            },
            ticks: {
                min: 0,
                stepSize: 10,
                beginAtZero: true,
                maxRotation: 0,
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
};

const dataSetColors = [
    'red',
    'blue',
    'green',
    'black'
];

export default Line.extend({
    props: {
        dataSets: Array,
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
            lastUpdate: performance.now()
        }
    },
    computed: {
        chartDataSetsFn: function() {
            for (var i in this.dataSets) {
                this.dataSets[i].borderColor = dataSetColors[i];
                for (var k = 0; k < this.dataSets[i].data.length; k++) {
                    if (!this.dataSets[i].data[k].y) this.dataSets[i].data[k] = { x: this.labels[k], y: this.dataSets[i].data[k] };
                }
            }
            return this.dataSets;
        },
        // chartLabelsFn: function() {
        //     return this.labels;
        // }
    },
    watch: {
        dataSets: function() {
            this.smartUpdate();
        }
    },
    mounted () {
        this.renderLineChart();
    },
    methods: {
        renderLineChart: function() {
            var chartData = {
                // labels: this.chartLabelsFn,
                datasets: this.chartDataSetsFn
            };

            this.renderChart(chartData, this.options);
            this.fixMaxValueY(this._chart);
            this._chart.update();
        },

        smartUpdate: function() {
            this._chart.destroy();
            this.renderLineChart();
            this.fixMaxValueY(this._chart);
            this._chart.update();
        },

        fixMaxValueY(chart) {
            var maxToFix = 0;
            for (var key in this.chartDataSetsFn) {
                maxToFix = Math.max(maxToFix, Math.max(...this.chartDataSetsFn[key].data.map(v=>v.y)));
            }
            var chartMax = chart.scales.yAxe0.max;
            if (chartMax <= maxToFix) {
                var fixedMax = maxToFix + 1;
                chart.scales.yAxe0.options.ticks.suggestedMax = fixedMax;
                chart.scales.yAxe0.options.ticks.major.suggestedMax = fixedMax;
            }
        }
    }
});
