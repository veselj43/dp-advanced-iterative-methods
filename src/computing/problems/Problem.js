import { BinaryIndividual, PermutationIndividual } from '../methods/genetic/Individual'

export const ProblemTypeEnum = {
    BINARY: "binary",
    PERMUTATION: "permutation"
}

/**
 * Abstract class for problems.
 */
export class Problem {
    constructor() {
        // abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    /**
     * Creates new random individual for this problem.
     * @returns {Individual} individual representing problem configuration
     */
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

    /**
     * Lazy fitness evaluation for individuals. It evaluates fitness only if individual don't have it yet.
     * @param {Individual} individual which to assign fitness
     */
    evaluateIndividual(individual) {
        if (individual.getFitness() === null) {
            individual.setFitness(this.evaluateMaximizationCost(individual));
        }
    }

    /**
     * Evaluates configuration cost for problem.
     * @param configuration of problem
     * @returns {number}
     */
    evaluateMaximizationCost(configuration) {
        // abstract
    }

    /**
     * Transforms maximization cost to real cost of problem.
     * @param {number} maxCost maximization cost to transform
     * @returns {number}
     */
    transformMaximizationToRealCost(maxCost) {
        //abstract
    }

    /**
     * Returns problem type.
     * @returns {ProblemTypeEnum}
     */
    getType() {
        // abstract
    }

    /**
     * Returns problem configuration.
     * @param {bool} random configuration is random or default
     */
    getConfiguration(random) {
        // abstract
    }

    /**
     * Transforms configuration into real result.
     * @param configuration
     */
    getResult(configuration) {
        // abstract
    }

    /**
     * Checks if instance is invalid.
     * @param instanceContent string content of file with instance
     */
    static isInvalidInstance(instanceContent) {
        // abstract static
    }

    /**
     * Resolves instance parameters from file.
     * @param instanceContent string content of file with instance
     */
    static resolveInstanceParams(instanceContent) {
        // abstract static
    }
}

