export class BitArray {
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

    copy() {
        return new BitArray({ fromBitArray: this._bitArray });
    }

    changeOn(index) {
        this._bitArray[index] = !this._bitArray[index];
        return this;
    }

    getNeighbour(index) {
        if (!index) index = Math.round(Math.random() * (this._bitArray.length - 1));

        return this.copy().changeOn(index);
    }

    getBitArray() {
        return this._bitArray;
    }

    getSize() {
        return this._bitArray.length;
    }

    getType() {
        return 'bitArray';
    }

    toString() {
        var str = "";
        for (var i in this._bitArray) {
            str += (this._bitArray[i]) ? "1" : "0";
        }
        return str;
    }

    equals(other) {
        if (other == null) return false;
        for (var i = 0; i < this._bitArray.length; i++)
            if (this._bitArray[i] != other._bitArray[i]) return false;
        return true;
    }
}