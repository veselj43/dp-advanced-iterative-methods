import * as SAT from './problems/SAT';
import * as Tabu from './methods/Tabu';

// Job organization
class Job {
    constructor(inputData, params) {
        this.problem = null;
        this.method = null;

        if (params.problemKey === 1) this.problem = new SAT.Input(inputData);

        if (params.methodKey === 'Tabu') this.method = new Tabu.TabuSolver(params.tabu);
    }

    run() {
        if (this.problem === null) {
            console.warn("Unknown problem selected");
            return null;
        }
        if (this.method === null) {
            console.warn("Unknown method selected");
            return null;
        }

        var t0 = performance.now();
        var result = this.method.solve(this.problem.input);
        var t1 = performance.now();
        
        result.setProcessTime(t1 - t0);

        return result;
    }
}

// msg recieved event
onmessage = function(e) {
    console.log('[Worker] start');

    var job = new Job(e.data[0], e.data[1]);
    var result = job.run();

    console.log('[Worker] done');

    postMessage(["result", result]);
}
