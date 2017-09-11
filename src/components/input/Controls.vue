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
    data() {
        return {
            worker: null,
            status: "Ready"
        }
    },

    methods: {
        start: function() {
            var context = this;

            if (typeof(Worker) === "undefined") {
                console.warn("Workers not supported.");
                return;
            }

            function processInput(params, filesObj) {
                context.params = params;

                if (filesObj.files.length === 0) {
                    console.log("No input file.");
                    return;
                }

                for (var i = 0, file; file = filesObj.files[i]; i++) {
                    var reader = new FileReader();
                    reader.onLoadCallback = compute(file);

                    reader.onload = function(event) {
                        this.onLoadCallback(event.target.result);
                    };

                    reader.readAsBinaryString(file);
                    break;
                }

            }

            var compute = fileObj => data => {
                context.worker = new Worker("./static/js/worker.js");

                context.worker.onmessage = function(e) {
                    if (!_.isArray(e.data)) {
                        console.warn("[Main] Cannot understand worker message.");
                    }
                    else if (e.data[0] === "progress") {
                        context.$emit('handleProgress', e.data[1]);
                    }
                    else if (e.data[0] === "result") {
                        context.$emit('handleResult', e.data[1]);
                        console.log('[Main] worker msg: ', e.data[1]);

                        context.worker.terminate();
                        context.worker = null;

                        context.status = "Done";
                    }
                }

                context.worker.postMessage([data, context.params]);

                context.status = "In progress";
            };

            $eventBus.$emit("getInput", processInput);
        },

        stop: function() {
            if (this.worker === null) {
                console.log("Nothing to stop.");
                return;
            }
            this.worker.terminate();
            this.worker = null;

            this.status = "Stopped";

            this.$emit('interrupt', []);
        }
    }
}
</script>
