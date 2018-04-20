import { BitArray } from "./configurationTypes/BitArray";
import { Problem, ProblemTypeEnum } from './Problem'
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
    evaluateMaximizationCost(bitArrayConfig) {
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

    transformMaximizationToRealCost(maxCost) {
        return maxCost;
    }

    // /**
    //  * Return price function value that will be displayed in graph
    //  * @param  {class} bitArrayConfig config for which we want the value for the graph
    //  * @return {int}  the returned value
    //  */
    // getProblemCost(bitArrayConfig){
    //   return this.getFitness(bitArrayConfig);
    // }

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

    /**
     * Returns what type of configuration is this problem using
     * @return {enum} type of the problem(configuration type)
     */
    getType() {
        return ProblemTypeEnum.BINARY;
    }

    /**
     * Returns instance invalidity
     * @param  {string} instanceContent content of the instance
     * @return {boolean} is instance invalid
     */
    static isInvalidInstance(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        if((instanceContent.length - 1) < 4) return { text: "Invalid number of parameters"};

        for(var i = 0; i < instanceContent.length; i++){
          if(isNaN(instanceContent[i])) return { text: "Most contain only numbers"};
          if(instanceContent[i] < 0) return { text: "Can not contain negative numbers"};
        }

        var noItems = +instanceContent[0];
        var capacity = +instanceContent[1];

        instanceContent.splice(0, 2);

        if((instanceContent.length - 1) !== noItems * 2) return { text: "Invalid number of items"};

        return false; // valid instance
    }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    static resolveInstanceParams(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        return {
            noItems: +instanceContent[0],
            capacity: +instanceContent[1]
        }
    }
}
