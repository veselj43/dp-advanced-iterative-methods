import { WorkerInterface } from './WorkerInterface.js';
import * as SAT from './problems/SAT';
import * as Knapsack from './problems/Knapsack';
import * as Vertex from './problems/MinimalVertexCover';
import * as Tabu from './methods/Tabu';
import * as Genetic from './methods/Genetic';
import * as Annealing from './methods/Annealing';

var methods = {
    work: function(data, params) {
        var job = new Job(data, params);
        job.run(params.methodParams[params.method.id]);
    }
}

var workerInterface = new WorkerInterface(this, methods);

// Job organization
class Job {
    constructor(inputData, params) {
        this.problem = null;
        this.method = null;

        if (params.problem.id === 0) this.problem = new SAT.SAT(inputData);
        else if (params.problem.id === 1) this.problem = new SAT.SAT(inputData);
        else if (params.problem.id === 2) this.problem = new Knapsack.Knapsack(inputData);
        else if (params.problem.id === 3) this.problem = new Vertex.MinimalVertexCover(inputData);

        if (params.method.id === 'tabu') this.method = new Tabu.TabuSolver(workerInterface);
        else if (params.method.id === 'genetic') this.method = new Genetic.GeneticSolver(workerInterface);
        else if (params.method.id === 'annealing') this.method = new Annealing.AnnealingSolver(workerInterface);
    }

    run(methodParams) {
        if (this.problem === null) {
            workerInterface.reply('error', "Unknown problem selected");
            return null;
        }
        if (this.method === null) {
            workerInterface.reply('error', "Unknown method selected");
            return null;
        }

        var t0 = performance.now();
        var result = this.method.solve(this.problem, methodParams);
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
