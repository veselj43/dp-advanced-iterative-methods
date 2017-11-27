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

        console.log("params: ", this.params);
        this._workerInterface.reply('init', { numberOfIterations: this.count, maxFitness: this.problemInput.params.numberOfClausules });

        this._workerInterface.reply('progress', { counter: this.count, fitness: 0 });

        for (var i = 0; i < this.count; i++) {
            var actualCost = Math.round(Math.random() * this.problemInput.params.numberOfClausules);
            this.result.push(actualCost);
            this.cost = Math.max(this.cost, actualCost);

            this._workerInterface.reply('progress', { counter: i, fitness: this.result[i] });
        }

        return new Result(this.result, this.cost, this.counter);
    }
}
