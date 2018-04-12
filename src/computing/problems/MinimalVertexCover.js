import { BitArray } from "./configurationTypes/BitArray";
import { Problem, ProblemTypeEnum } from './Problem'
/**
 * Minimal vertex cover problem class, used for minimal vertex cover problem solving, works with BitArray configuration
 */
export class MinimalVertexCover extends Problem {
    /**
     * Constructor, construct the class from the data file selected
     * @param {string} data instance of a problem coded as string
     */
    constructor(data) {
        super();
        data = data.split(/\s+/);

        this._size = +data[0];
        this._array = new Array(this._size);

        for(var i = 0; i < this._size; i++)
        {
            this._array[i] = new Array(this._size);
        }

        for(var i = 0; i < this._size; i++)
        {
            for(var j = 0; j < this._size; j++)
            {
                this._array[i][j] = +data[2 + i * this._size + j];
            }
        }
    }

    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    getFitness(bitArrayConfig) {
        if (bitArrayConfig === null) return -1;

        var coveredArray = new Array(bitArrayConfig.getSize()).fill(0);
        const bitArray = bitArrayConfig.getBitArray();
        var numberOfCovered = 0;
        var currentPrice = 0;

        for(var i = 0; i < bitArray.length; i++)
        {
            if(bitArray[i]) {
                currentPrice++;
                for(var j = 0; j < this._size; j++)
                {
                    if(this._array[i][j] && coveredArray[j] !== 1) {
                        coveredArray[j] = 1;
                        numberOfCovered++;
                    }
                }
            }
        }

        return ((this._size - numberOfCovered) === 0 ? this._size - currentPrice :  numberOfCovered - this._size);
    }

    /**
     * Return price function value that will be displayed in graph
     * @param  {class} bitArrayConfig config for which we want the value for the graph
     * @return {int}  the returned value
     */
    getProblemCost(bitArrayConfig){
      return this._size - this.getFitness(bitArrayConfig);
    }

    /**
     * Returns random, or all 0, configuration of knapsack problem(BitArray configuration)
     * @param  {bool} random random or all 0
     * @return {class}  new BitArray class
     */
    getConfiguration(random) {
        return new BitArray({
            size: this._size,
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
    isInvalidInstance(instanceContent) {
        return false; // valid instance
    }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    resolveInstanceParams(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        return {
            size: +instanceContent[0]
        }
    }
}
