import Result from '../_common/Result';

export class GeneticSolver {
    constructor(workerInterface, params) {
        this._workerInterface = workerInterface;
        this.params = params;
    }

    solve (problemInput) {
        this.problemInput = problemInput;

        this.result = [];
        this.cost = 0;
        this.count = 50;
        this.counter = 0;

        console.log("params: ", this.params);

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
