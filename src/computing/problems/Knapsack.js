import { BitArray } from "./configurationTypes/BitArray";

export class Knapsack {
    constructor(data) {
        this._items = [];
        this._capacity;

        data = data.split(/\s+/);

        var noItems = +data[0];
        this._capacity = +data[1];

        data = data.splice(2, 2 * noItems);

        for (var i = 0; i < data.length; i += 2) {
            this._items.push({
                weight: +data[i],
                value: +data[i + 1]
            });
        }
    }

    getFitness(bitArrayConfig) {
        if (bitArrayConfig === null) return -1;

        const bitArray = bitArrayConfig.getBitArray();

        var sumValue = 0;
        var sumWeight = 0;

        bitArray.forEach((bit, index) => {
            if (bit) {
                sumValue += this._items[index].value;
                sumWeight += this._items[index].weight;
            }
        });

        return (sumWeight > this._capacity) ? this._capacity - sumWeight : sumValue;
    }

    getConfiguration(random) {
        return new BitArray({
            size: this._items.length,
            random: random
        });
    }
}