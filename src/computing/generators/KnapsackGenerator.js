export class KnapsackGenerator {
  constructor (params) {
    this.params = params;
  }

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
  //generate random array with fixed sum
  _fixedSumArray() {
    var myArray = [];
    var currentWeight = 0;
    var newWeight = 0;

    for(var i = 0; i < this.params.noItems; i++)
    {
      myArray.push(Math.round(Math.random() * this.params.sumOfWeights * (this.params.noItems - 1)));
      currentWeight += myArray[i];
    }

    for(i = 0; i < this.params.noItems; i++)
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
