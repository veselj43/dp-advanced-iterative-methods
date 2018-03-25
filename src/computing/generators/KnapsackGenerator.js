/**
 * Class for generating knapsack problem instances
 * @type {class}
 */
export default class KnapsackGenerator {
    /**
     * Class constructor
     * @param {object} params parameters of the generated instance
     */
  constructor (params) {
    this.params = params;
    this.params.noItems = +this.params.noItems;
    this.params.capacity = +this.params.capacity;
    this.params.maxValue = +this.params.maxValue;
    this.params.sumOfWeights = +this.params.sumOfWeights;
    this.params.granularity = +this.params.granularity;
  }
  /**
   * Generate instance based on parameters
   * @return {String} instance of knapsack problem coded as String
   */
  generate () {
    var generatedInstance = this.params.noItems + " " + this.params.capacity + " ";
    var currentWeight = 0;

    var randomArray = this._fixedSumArray();

    for(var j = 0; j < this.params.noItems; j++)
    {
      generatedInstance += randomArray[j] + " " + Math.round(Math.random() * this.params.maxValue) + " ";
    }

    console.log(generatedInstance);
    return generatedInstance;
  }

  /**
   * Generate random array with fixed sum
   * @return {array} array with fixed sum of values
   */
  _fixedSumArray() {
    var myArray = [];
    var currentWeight = 0;
    var newWeight = 0;

    var generatedWeight;

    while(myArray.length !== this.params.noItems)
    {
        generatedWeight = Math.round(Math.random() * this.params.sumOfWeights);
        // granularity checking, 0 = random, +x = more bigger things, -x more smaller things
        if(this.params.granularity === 0 ||
        (this.params.granularity > 0 && Math.random() < 1/Math.pow(this.params.sumOfWeights - generatedWeight, this.params.granularity)) ||
        (this.params.granularity < 0 && Math.random() < 1/Math.pow(generatedWeight, -this.params.granularity))) {
            myArray.push(generatedWeight);
            currentWeight += myArray[myArray.length - 1];
        }
    }

    for(var i = 0; i < this.params.noItems; i++)
    {
      myArray[i] = Math.round(myArray[i] / (currentWeight/this.params.sumOfWeights));
      newWeight += myArray[i];
    }
    //fixing the final difference caused by rounding
    myArray[Math.round(Math.random() * this.params.noItems)] += this.params.sumOfWeights - newWeight;

    myArray.push(this.params.sumOfWeights - newWeight);

    return myArray;
  }
}
