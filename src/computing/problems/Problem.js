import { BinaryIndividual, PermutationIndividual } from '../methods/genetic/Individual'

export class Problem {
    constructor() {
        // abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    createNewIndividual() {
        switch (this.getType()) {
            case "binary":
                return new BinaryIndividual(this.getConfiguration(true).getBitArray());
            case "permutation":
                return new PermutationIndividual(this.getConfiguration(true).getArray());
            default:
                throw new TypeError('This type of problem not supported.');
        }
    }

    evaluateIndividual(individual) {
        if (individual.getFitness() === null) {
            individual.setFitness(this.getFitness(individual));
        }
    }

    getType() {
        // abstract
    }

    getConfiguration(random) {
        // abstract
    }

    getFitness() {
        // abstract
    }

    getProblemCost() {
        //abstract
    }

    getResult() {
        // abstract
    }

    resolveInstanceParams() {
        // abstract
    }
}

