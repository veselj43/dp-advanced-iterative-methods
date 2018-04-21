import { getRandomInt } from './Random'

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
    mutate(mutationProb) {
        //abstract
    }
    copy() {
        //abstract
    }
}

export class BinaryIndividual extends Individual {
    constructor(bitArray) {
        super();
        this._bitArray = bitArray;

    }

    mutate(mutationRate) {
        for (var i = 0; i < this._bitArray.length; i++) {
            if (Math.random() < mutationRate) {
                this._fitness = null;
                //bit flip
                this._bitArray[i] = !this._bitArray[i];
            }
        }
    }

    getGenotype() {
        return this._bitArray;
    }

    getBitArray() {
        return this._bitArray;
    }

    getSize() {
        return this._bitArray.length;
    }
    copy() {
        return new BinaryIndividual(this._bitArray.map(x=>x));
    }
}

export class PermutationIndividual extends Individual {
    constructor(permutation) {
        super();
        this._permutation = permutation;

    }

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

    getGenotype() {
        return this._permutation;
    }

    getArray() {
        return this._permutation;
    }

    getSize() {
        return this._permutation.length;
    }
    copy() {
        return new PermutationIndividual(this._permutation.map(x=>x));
    }
}
