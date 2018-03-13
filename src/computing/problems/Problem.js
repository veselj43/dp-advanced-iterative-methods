import {BinaryIndividual} from "../methods/genetic/Individual";

export class Problem {
    constructor() {
        //abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    createNewIndividual() {
        if (this.isBinary()) {
            return new BinaryIndividual(this.getConfiguration(true).getBitArray());
        } else {
            throw new TypeError('Non binary problems not supported.');
        }
    }

    evaluateIndividual(individual) {
        if (individual.getFitness() === null) {
            individual.setFitness(this.getFitness(individual));
        }
    }

    isBinary() {
        return true;
    }

    getConfiguration(random) {
        //abstract
    }

    getFitness() {
        //abstract
    }
}

