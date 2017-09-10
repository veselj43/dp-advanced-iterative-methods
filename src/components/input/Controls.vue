<template>
    <div class="controls">
        <span class="status">Status: <b>{{status}}</b></span>
        <span class="control-buttons">
            <button class="btn btn-success" v-on:click="start">Start</button>
            &nbsp;
            <button class="btn btn-danger" v-on:click="stop">Stop</button>
        </span>
    </div>
</template>

<script>
export default {
    props: ['inputFiles', 'params'],

    data() {
        return {
            worker: null,
            status: "Ready"
        }
    },

    methods: {
        start: function() {
            if (typeof(Worker) === "undefined") {
                console.log("Workers not supported.");
                return;
            }
            if (!this.inputFiles[0]) {
                console.log("No input file.");
                return;
            }

            var context = this;
            this.worker = new Worker("./static/js/worker.js");

            this.worker.onmessage = function(e) {
                if (!_.isArray(e.data)) {
                    console.warn("[Main] Cannot understand worker message.");
                }
                else if (e.data[0] === "progress") {
                    context.$emit('handleProgress', e.data[1]);
                }
                else if (e.data[0] === "result") {
                    console.log('[Main] worker msg: ', e.data[1]);

                    context.worker.terminate();
                    context.worker = null;

                    context.status = "Done";
                }
            }

            this.worker.postMessage([this.inputFiles[0], this.params]);

            this.status = "In progress";
        },

        stop: function() {
            if (this.worker === null) {
                console.log("Nothing to stop.");
                return;
            }
            this.worker.terminate();
            this.worker = null;

            this.status = "Stopped";
        }
    }
}
</script>
