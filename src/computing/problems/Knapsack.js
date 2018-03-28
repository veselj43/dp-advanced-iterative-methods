import { BitArray } from "./configurationTypes/BitArray";
import {Problem} from "./Problem";
/**
 * Knapsack problem class, used for knapsack problem solving, works with BitArray configuration
 */
export class Knapsack extends Problem {
    /**
     * Constructor, construct the class from the data file selected
     * @param {string} data instance of a problem coded as string
     */
    constructor(data) {
        super();
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
    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
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

    /**
     * Return price function value that will be displayed in graph
     * @param  {class} bitArrayConfig config for which we want the value for the graph
     * @return {int}  the returned value
     */
    getProblemCost(bitArrayConfig){
      return this.getFitness(bitArrayConfig);
    }

    /**
     * Returns random, or all 0, configuration of knapsack problem(BitArray configuration)
     * @param  {bool} random random or all 0
     * @return {class}  new BitArray class
     */
    getConfiguration(random) {
        return new BitArray({
            size: this._items.length,
            random: random
        });
    }

    /**
     * Returns the result of the config, in this case the config array
     * @param  {class} bitArrayConfig the configuration of which result we want
     * @return {Array} the bit array of the configuration
     */
    getResult(bitArrayConfig) {
        return bitArrayConfig.getBitArray();
    }
}
