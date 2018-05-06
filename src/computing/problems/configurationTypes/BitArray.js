/**
 * class representing bit array position, used as iterator for getting neighbor configurations
 * @type {class}
 */
export class BitArrayPosition {
    constructor(size, index) {
        this.size = size;
        this.value = index;
        this.key = index;
    }

    next(amount) {
        if (isNaN(amount)) amount = 1;

        return new BitArrayPosition(this.size, this.key + amount);
    }
    
    at(key) {
        return this.next(key - this.key);
    }

    getNeighborhoodSize() {
        return this.size;
    }
}

/**
 * class representing bit array configuration, used for all problems with bit array configurations
 * @type {class}
 */
export class BitArray {
    /**
     * Class constructor, can create from other BitArray, random with specified size, or all 0 with specific size
     * @param {object} options contains options.fromBitArray(bool), options.size(int) and options.random(bool)
     */
    constructor(options) {
        if (!options) return;
        this._bitArray = [];
        if (options.fromBitArray) {
            this._bitArray = options.fromBitArray.map(x=>x);
        }
        else if (options.size && options.random) {
            for (var i = 0; i < options.size; i++) {
                this._bitArray.push(!!Math.round(Math.random()));
            }
        }
        else if (options.size) {
            for (var i = 0; i < options.size; i++) {
                this._bitArray.push(false);
            }
        }
    }

    /**
     * Return copy of the class
     * @return {class} copy of the class
     */
    copy() {
        return new BitArray({ fromBitArray: this._bitArray });
    }

    /**
     * Return position iterator
     * @return {class} BitArrayPosition
     */
    getDefaultPosition() {
        return new BitArrayPosition(this.getSize(), 0);
    }

    /**
     * Change the value on specific index(bit flip)
     * @param  {int} index which index to change
     * @return {class} return the class
     */
    changeOn(index) {
        this._bitArray[index] = !this._bitArray[index];
        return this;
    }
    /**
     * Return neighbour, either random or selected with index
     * @param  {int} index which index will change to get the neighbour
     * @return {class} return copy of the class with the value on index changed
     */
    getNeighbour(index) {
        if (!index && index !== 0) index = Math.round(Math.random() * (this._bitArray.length - 1));

        return this.copy().changeOn(index);
    }
    /**
     * Returns the bit array, meaning the actual array not class
     * @return {array} bitArray variable
     */
    getBitArray() {
        return this._bitArray;
    }
    /**
     * Return size of the BitArray
     * @return {int} size of the array
     */
    getSize() {
        return this._bitArray.length;
    }
    /**
     * Returns the type of the configuration, needed for specific method functions(like mutation for example)
     * @return {[type]} [description]
     */
    getType() {
        return 'bitArray';
    }
    /**
     * Return the bitArray as string
     * @return {string} bitArray as string
     */
    toString() {
        var str = "";
        for (var i in this._bitArray) {
            str += (this._bitArray[i]) ? "1" : "0";
        }
        return str;
    }
    /**
     * Typical equals function, compares two BitArrays
     * @param  {class} other other BitArray
     * @return {bool} equals or not
     */
    equals(other) {
        if (other == null) return false;
        for (var i = 0; i < this._bitArray.length; i++)
            if (this._bitArray[i] != other._bitArray[i]) return false;
        return true;
    }
}
