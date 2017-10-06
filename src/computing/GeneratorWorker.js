import { WorkerInterface } from './WorkerInterface.js';

var methods = {
    work: function(data) {
        var job = new Job(data);
        var result = job.run();
        workerInterface.reply('result', result);
    }
}

var workerInterface = new WorkerInterface(this, methods);

class Job {
    constructor(params) {
        this.params = params;
    }

    run() {
        return this.params;
    }
}

this.postMessage = postMessage;

// msg recieved event
onmessage = function(event) {
    workerInterface.onMessage(event);
}
