import { getProblemClassFromId, getMethodClassFromId } from '@/services/classResolver';
import { WorkerInterface } from './WorkerInterface';

var methods = {
    work: function(data, params) {
        var job = new Job(data, params);
        job.run(params.methodParams[params.method.id]);
    },

    computeStartingTemp: function(data, problemId) {
        let params = {
            problem: { id: problemId },
            method: { id: 'annealing' }
        };
        let job = new Job(data, params);

        let result = job.method.computeStartingTemp(job.problem);

        workerInterface.reply('result', result);
    }
}

var workerInterface = new WorkerInterface(this, methods);

// Job organization
class Job {
    constructor(inputData, params) {
        let problemClass = getProblemClassFromId(params.problem.id);
        let methodClass = getMethodClassFromId(params.method.id);
        this.problem = (problemClass) ? new problemClass(inputData) : null;
        this.method = (methodClass) ? new methodClass(workerInterface) : null;
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

this.postMessage = self.postMessage;

// msg recieved event
self.addEventListener('message', (event) => {
    workerInterface.onMessage(event)
})
