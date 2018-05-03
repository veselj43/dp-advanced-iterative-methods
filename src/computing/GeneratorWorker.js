import { WorkerInterface } from './WorkerInterface.js';
import Resource from '@/services/resource';
import KnapGen from './generators/KnapsackGenerator';
import SalesmanGen from './generators/TravellingSalesmanGenerator';
import SATGen from './generators/SATGenerator';
import CoverGen from './generators/VertexCoverGenerator';
import ETSPGen from './generators/ETSPGenerator';

/**
 * Definition of methods, that can be called from main thread
 */
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

/**
 * Worker class used to generate problems
 */
class Job {
    constructor(params, problemKey) {
        this.params = params;
        this.problemKey = problemKey;
    }

    /**
     * Generate instance based on selected problem and input parameters
     * @return {string} returns the generated instance coded as string
     */
    run() {
        let Generator = null;
        let generatorParams = this.params[this.problemKey];

        if (this.problemKey === 0) {
            Generator = SATGen;
        }
        else if (this.problemKey === 1) {
            Generator = SalesmanGen;
        }
        else if (this.problemKey === 2) {
            Generator = KnapGen;
        }
        else if (this.problemKey === 3) {
            Generator = CoverGen;
        }
        else if (this.problemKey === 4) {
            Generator = ETSPGen;
        }

        if (Generator && generatorParams) {
            return new Generator(generatorParams).generate();
        }
        else {
            return null;
        }
    }
}

this.postMessage = self.postMessage;

// msg received event
self.addEventListener('message', (event) => {
    workerInterface.onMessage(event);
});
