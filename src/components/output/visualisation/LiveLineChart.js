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
    watch: {
        values: function() {
            this.smartUpdate();
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
                    backgroundColor: "transparent",
                    data: this.chartDataFn
                }]
            };

            this.renderChart(chartData, this.options);
        },

        smartUpdate: function(force) {
            if (this.values.length === 0) {
                this.renderedData = [];
                this._chart.destroy();
                this.renderLineChart();
            }
            else if (
                ((performance.now() - this.lastUpdate) > this.componentOptions.debounce.duration) ||
                this.values.length === this.labels.length ||
                force
            ) {
                var freshData = this.values.slice(this.renderedData.length);
                this.fixMaxValueY(this._chart, Math.max(...freshData));
                this.renderedData.push.apply(this.renderedData, freshData);
                this.lastUpdate = performance.now();
                this._chart.update();
            }
        },

        fixMaxValueY(chart, maxToFix) {
            var chartMax = chart.scales.yAxe0.max;
            if (chartMax <= maxToFix) {
                var fixedMax = maxToFix + 1;
                chart.scales.yAxe0.options.ticks.suggestedMax = fixedMax;
                chart.scales.yAxe0.options.ticks.major.suggestedMax = fixedMax;
            }
        }
    }
});
