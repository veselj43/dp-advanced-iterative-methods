import { BinaryIndividual, PermutationIndividual } from '../methods/genetic/Individual'

export const ProblemTypeEnum = {
    BINARY: "binary",
    PERMUTATION: "permutation"
}

export class Problem {
    constructor() {
        // abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    createNewIndividual() {
        switch (this.getType()) {
            case ProblemTypeEnum.BINARY:
                return new BinaryIndividual(this.getConfiguration(true).getBitArray());
            case ProblemTypeEnum.PERMUTATION:
                return new PermutationIndividual(this.getConfiguration(true).getArray());
            default:
                throw new TypeError('This type of problem not supported.');
        }
    }

    evaluateIndividual(individual) {
        if (individual.getFitness() === null) {
            individual.setFitness(this.evaluateMaximizationCost(individual));
        }
    }

    evaluateMaximizationCost(configuration) {
        // abstract
    }

    transformMaximizationToRealCost(maxCost) {
        //abstract
    }

    getType() {
        // abstract
    }

    getConfiguration(random) {
        // abstract
    }

    getResult(configuration) {
        // abstract
    }

    isInvalidInstance(instanceContent) {
        // abstract static
    }

    resolveInstanceParams(instanceContent) {
        // abstract static
    }
}

