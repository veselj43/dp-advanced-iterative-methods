import Result from '../_common/Result';
import BufferedReply from "../_common/BufferedReply";

export class GeneticSolver {
    constructor(workerInterface) {
        this._workerInterface = workerInterface;
        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
    }

    solve (problem, params) {
        this.problem = problem;

        this.result = [];
        this.cost = 0;
        this.count = params.noGenerations;
        this.counter = 0;

        console.log("params: ", params);

        this._workerInterface.reply('init', { numberOfIterations: this.count, maxFitness: this.problemInput.params.numberOfClausules });

        for (var i = 0; i < this.problemInput.params.numberOfVariables; i++) {
            this.result.push(!!Math.round(Math.random()));
        }

        for (var i = 0; i < this.count; i++) {
            var actualCost = Math.round(Math.random() * this.problemInput.params.numberOfClausules);
            this.cost = Math.max(this.cost, actualCost);
            this.counter++;

            this._workerInterface.reply('progress', { counter: i, fitness: actualCost });
        }

        return new Result(this.result, this.cost, this.counter);
    }
}
