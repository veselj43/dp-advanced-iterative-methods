/**
 * class representing permutation configuration, used for all problems with permutation configurations
 * @type {class}
 */
export class Permutation {
    /**
     * Class constructor, can create from other Permutations, random with specified size, or sorted starting with 0
     * @param {object} options contains options.fromBitArray(bool), options.size(int) and options.random(bool)
     */
    constructor(options) {
        if (!options) return;
        this._Array = [];
        if (options.fromArray) {
            this._Array = options.fromArray.map(x=>x);
        }
        else if (options.size && options.random) {
            for (var i = 0; i < options.size; i++) {
                this._Array = this.randomPermutation(options.size);
            }
        }
        else if (options.size) {
            for (var i = 0; i < options.size; i++) {
                this._Array.push(i);
            }
        }
    }

    /**
     * Returns random permutation array of specific size
     * @param  {int} size size of the permutation
     * @return {array} the generated permutation as array
     */
    randomPermutation(size) {
        // generate number sequence
        var permArray = new Array(size);
        for(var i = 0; i < size; i++){
            permArray[i] = i;
        }
        // shuffle sequence
        for (var i = size; i > 1; --i){
            var randPos = Math.floor(i * Math.random());
            var tmpStore = permArray[i-1];
            permArray[i-1] = permArray[randPos];
            permArray[randPos] = tmpStore;
        }
        return permArray;
    }
    /**
     * Return copy of the class
     * @return {class} copy of the class
     */
    copy() {
        return new Permutation({ fromArray: this._Array });
    }
    /**
     * Change the value on specific index(bit flip)
     * @param  {int} index which index to change
     * @return {class} return the class
     */
    changeOn(indexOne, indexTwo) {
        var x = this._Array[indexOne];
        this._Array[indexOne] = this._Array[indexTwo];
        this._Array[indexTwo] = x;
        return this;
    }
    /**
     * Return neighbour, either random or selected with two indexes to swap
     * @param  {int} index which index will change to get the neighbour
     * @return {class} return copy of the class with the value on index changed
     */
    getNeighbour(indexOne, indexTwo) {
        indexOne = (indexOne || indexOne === 0) ? indexOne : Math.round(Math.random() * (this._Array.length - 1));
        indexTwo = (indexTwo || indexTwo === 0) ? indexTwo : Math.round(Math.random() * (this._Array.length - 1));

        while (indexOne === indexTwo) {
            indexTwo = Math.round(Math.random() * (this._Array.length - 1));
        }
        return this.copy().changeOn(indexOne, indexTwo);
    }
    /**
     * Returns the bit array, meaning the actual array not class
     * @return {array} bitArray variable
     */
    getArray() {
        return this._Array;
    }
    /**
     * Return size of the BitArray
     * @return {int} size of the array
     */
    getSize() {
        return this._Array.length;
    }
    /**
     * Returns the type of the configuration, needed for specific method functions(like mutation for example)
     * @return {string} [description]
     */
    getType() {
        return 'permutation';
    }
    /**
     * Return the bitArray as string
     * @return {string} bitArray as string
     */
    toString() {
        var str = "";
        for (var i in this._Array) {
            str += (this._Array[i]);
        }
        return str;
    }
    /**
     * Typical equals function, compares two BitArrays
     * @param  {class} other other BitArray
     * @return {bool} equals or not
     */
    equals(other) {
        if (!other) return false; // checks for null, undefined, empty, etc.
        for (var i = 0; i < this._Array.length; i++)
            if (this._Array[i] !== other._Array[i]) return false;
        return true;
    }
}
