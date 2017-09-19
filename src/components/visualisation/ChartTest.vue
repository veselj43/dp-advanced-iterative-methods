<template>
    <div>
        <button v-on:click="action">CLICK ME</button>
        <chartjs-line :labels="mylabels" :datasets="mydatasets"></chartjs-line>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mylabels: ["January", "February", "March", "April", "May", "June", "July"],
            mydatasets:[
                {
                    label: "My first dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        }
    },

    methods: {
        action: function() {
            this.mydatasets[0].data.push(100);
        }
    }
}
</script>
