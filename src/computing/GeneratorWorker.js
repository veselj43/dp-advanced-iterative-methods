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
        workerInterface.reply('result', result);
    }
}

var workerInterface = new WorkerInterface(this, methods);

class Job {
    constructor(params, problemKey) {
        this.params = params;
        this.problemKey = problemKey;
    }

    run() {
        // TODO real generator
        if(this.problemKey === 0){
          var satGenerator = new SATGen.SATGenerator(this.params[0]);
          return satGenerator.generate();
        }

        else if (this.problemKey === 1) {
          var salesmanGenerator = new SalesmanGen.TravellingSalesmanGenerator(this.params[1]);
          return salesmanGenerator.generate();
        }

        else if (this.problemKey === 2) {
          var knapsackGenerator = new KnapGen.KnapsackGenerator(this.params[2]);
          return knapsackGenerator.generate();
        }

        else if (this.problemKey === 3) {
          var VertexCoverGenerator = new CoverGen.VertexCoverGenerator(this.params[3]);
          return VertexCoverGenerator.generate();
        }
        else
        return "c Priklad CNF\nc 4 promenne a 6 klauzuli\nc kazda klauzule konci nulou (ne novym radkem)\np cnf 4 6\n1 -3 4 0\n-1 2 -3 0\n3 4 0\n1 2 -3 -4 0\n-2 3 0\n-3 -4 0\n";
    }
}

this.postMessage = self.postMessage;

// msg recieved event
self.addEventListener('message', (event) => {
    workerInterface.onMessage(event);
});
