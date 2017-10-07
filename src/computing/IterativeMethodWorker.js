import { WorkerInterface } from './WorkerInterface.js';
import * as SAT from './problems/SAT';
import * as Tabu from './methods/Tabu';

var methods = {
    work: function(data, params) {
        var job = new Job(data, params);
        job.run();
    }
}

var workerInterface = new WorkerInterface(this, methods);

// Job organization
class Job {
    constructor(inputData, params) {
        this.problem = null;
        this.method = null;

        if (params.problemKey === 1) this.problem = new SAT.Input(inputData);

        if (params.methodKey === 'Tabu') this.method = new Tabu.TabuSolver(workerInterface, params.tabu);
    }

    run() {
        if (this.problem === null) {
            workerInterface.reply('message', "Unknown problem selected", "error");
            return null;
        }
        if (this.method === null) {
            workerInterface.reply('message', "Unknown method selected", "error");
            return null;
        }

        var t0 = performance.now();
        var result = this.method.solve(this.problem.input);
        var t1 = performance.now();

        result.setProcessTime(t1 - t0);

        workerInterface.reply('result', result);

        return result;
    }
}

this.postMessage = postMessage;

// msg recieved event
onmessage = function(event) {
    workerInterface.onMessage(event);
}
