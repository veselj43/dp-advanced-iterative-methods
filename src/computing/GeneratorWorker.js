import { WorkerInterface } from './WorkerInterface.js';
import Resource from '../services/resource';

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
        // TODO real generator
        return "c Priklad CNF\nc 4 promenne a 6 klauzuli\nc kazda klauzule konci nulou (ne novym radkem)\np cnf 4 6\n1 -3 4 0\n-1 2 -3 0\n3 4 0\n1 2 -3 -4 0\n-2 3 0\n-3 -4 0\n";
    }
}

this.postMessage = postMessage;

// msg recieved event
onmessage = function(event) {
    workerInterface.onMessage(event);
};
