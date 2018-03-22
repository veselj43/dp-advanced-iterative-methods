import { WorkerInterface } from './WorkerInterface.js';
import Resource from '@/services/resource';
import * as KnapGen from './generators/KnapsackGenerator';
import * as SalesmanGen from './generators/TravellingSalesmanGenerator';
import * as SATGen from './generators/SATGenerator';
import * as CoverGen from './generators/VertexCoverGenerator';

var methods = {
    work: function(data, problemKey) {
        var job = new Job(data, problemKey);
        var result = job.run();
        if (result) {
            workerInterface.reply('result', result);
        }
        else {
            workerInterface.reply('result', null, "Selected problem wasn't recognised");
        }
    }
}

var workerInterface = new WorkerInterface(this, methods);

class Job {
    constructor(params, problemKey) {
        this.params = params;
        this.problemKey = problemKey;
    }

    run() {
        let Generator = null;
        let generatorParams = this.params[this.problemKey];

        if (this.problemKey === 0) {
            Generator = SATGen.SATGenerator;
        }
        else if (this.problemKey === 1) {
            Generator = SalesmanGen.TravellingSalesmanGenerator;
        }
        else if (this.problemKey === 2) {
            Generator = KnapGen.KnapsackGenerator;
        }
        else if (this.problemKey === 3) {
            Generator = CoverGen.VertexCoverGenerator;
        }

        if (Generator && generatorParams) {
            return new Generator(generatorParams).generate();
        }
        else {
            return null;
            // return "c Priklad CNF\nc 4 promenne a 6 klauzuli\nc kazda klauzule konci nulou (ne novym radkem)\np cnf 4 6\n1 -3 4 0\n-1 2 -3 0\n3 4 0\n1 2 -3 -4 0\n-2 3 0\n-3 -4 0\n";
        }
    }
}

this.postMessage = self.postMessage;

// msg recieved event
self.addEventListener('message', (event) => {
    workerInterface.onMessage(event);
});
