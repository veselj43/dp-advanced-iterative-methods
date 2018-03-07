import { BitArray } from "./configurationTypes/BitArray";
/**
 * Knapsack problem class, used for minimal vertex cover problem solving, works with BitArray configuration
 */
export class MinimalVertexCover {
    constructor(data) {
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
                this._array[i][j] = +data[1 + i * this._size + j];
            }
        }
    }

    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    getFitness(bitArrayConfig) {
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
}
