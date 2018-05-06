import { getRandomInt } from './Random'

/**
 * Represents individual.
 */
export class Individual {
    constructor() {
        this._fitness = null;
        this._rank = null;
        if (this.constructor === Individual) {
            throw new TypeError('Abstract class "Individual" cannot be instantiated directly.');
        }
        if (this.mutate === undefined) {
            throw new TypeError('Classes extending the Individual abstract class');
        }
    }
    getFitness() {
        return this._fitness;
    }
    setFitness(fitness) {
        this._fitness = fitness;
    }
    getRank() {
        return this._rank;
    }
    setRank(rank) {
        this._rank = rank;
    }
    getGenotype() {
        //abstract
    }

    /**
     * Performs mutation with given probability.
     * @param {number } mutationRate mutation probability
     */
    mutate(mutationRate) {
        //abstract
    }

    /**
     * Deep copy of individual.
     */
    copy() {
        //abstract
    }
}

/**
 * Represents binary individual.
 */
export class BinaryIndividual extends Individual {
    /**
     * Creates individual from bit array.
     * @param {Array} bitArray configuration
     */
    constructor(bitArray) {
        super();
        this._bitArray = bitArray;

    }
    /**
     * Performs inversion mutation with given probability.
     * @param {number} mutationRate probability that each bit is inverted
     */
    mutate(mutationRate) {
        for (var i = 0; i < this._bitArray.length; i++) {
            if (Math.random() < mutationRate) {
                this._fitness = null;
                //bit flip
                this._bitArray[i] = !this._bitArray[i];
            }
        }
    }

    /**
     * Gets bit array.
     * @returns {Array} bit array
     */
    getGenotype() {
        return this._bitArray;
    }
    /**
     * Gets bit array.
     * @returns {Array} bit array
     */
    getBitArray() {
        return this._bitArray;
    }
    /**
     * Gets size of bit array.
     * @returns {number} size of bit array
     */
    getSize() {
        return this._bitArray.length;
    }

    /**
     * Returns deep copy of individual.
     * @returns {BinaryIndividual} deep copy
     */
    copy() {
        return new BinaryIndividual(this._bitArray.map(x=>x));
    }
}

/**
 * Represents permutation individual.
 */
export class PermutationIndividual extends Individual {
    /**
     * Creates individual from permutation.
     * @param {Array} permutation configuration
     */
    constructor(permutation) {
        super();
        this._permutation = permutation;

    }

    /**
     * Performs swap mutation.
     * @param mutationRate probability that each value is swapped with another one
     */
    mutate(mutationRate) {
        for (var i = 0; i < this._permutation.length; i++) {
            if (Math.random() < mutationRate) {
                this._fitness = null;
                //swap values but not with itself
                var position = getRandomInt(0, this._permutation.length-1);
                if (position >= i) {
                    position++;
                }
                var temp = this._permutation[i];
                this._permutation[i] = this._permutation[position];
                this._permutation[position] = temp;
            }
        }
    }
    /**
     * Gets permutation array.
     * @returns {Array} permutation array
     */
    getGenotype() {
        return this._permutation;
    }
    /**
     * Gets permutation array.
     * @returns {Array} permutation array
     */
    getArray() {
        return this._permutation;
    }
    /**
     * Gets size of permutation array.
     * @returns {number} size of permutation array
     */
    getSize() {
        return this._permutation.length;
    }
    /**
     * Returns deep copy of individual.
     * @returns {PermutationIndividual} deep copy
     */
    copy() {
        return new PermutationIndividual(this._permutation.map(x=>x));
    }
}
