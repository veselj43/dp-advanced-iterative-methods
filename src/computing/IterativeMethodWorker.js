import { WorkerInterface } from './WorkerInterface.js';
import * as SAT from './problems/SAT';
import * as Tabu from './methods/Tabu';
import * as Annealing from './methods/Annealing';

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

        if (params.problem.id === 0) this.problem = new SAT.Input(inputData);

        if (params.method.id === 'tabu') this.method = new Tabu.TabuSolver(workerInterface, params.methodParams.tabu);
        else if(params.method.id === 'annealing') this.method = new Annealing.AnnealingSolver(workerInterface, params.methodParams.annealing);
    }

    run() {
        if (this.problem === null) {
            workerInterface.reply('error', "Unknown problem selected");
            return null;
        }
        if (this.method === null) {
            workerInterface.reply('error', "Unknown method selected");
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
