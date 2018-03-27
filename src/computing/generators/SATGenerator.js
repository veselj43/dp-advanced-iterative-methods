/**
 * Class for generating SAT problem instances
 * @type {class}
 */
export default class SATGenerator {
  constructor (params) {
    this.params = params;
    this.params.noVariables = +this.params.noVariables;
    this.params.noClausules = +this.params.noClausules;
  }

  generate () {
    var generatedInstance = "p cnf " +  this.params.noVariables + " " + this.params.noClausules + '\n';
    var sign;
    var empty;
    var numberOfClausules = 0;
    var newClausule;

    while (numberOfClausules !== this.params.noClausules)
    {
      newClausule = "";
      empty = true;
      for (var i = 0; i < this.params.noVariables; i++)
      {
        if(Math.random() < 1/(this.params.noVariables / 10)) {
          sign = Math.round(Math.random() * 2 - 1);
          if(sign < 0) {
            newClausule += "-" + (i+1) + " ";
            empty = false;
          }
          else if(sign > 0) {
            newClausule += (i+1) + " ";
            empty = false;
          }
        }
      }
      if(!empty) {
        newClausule += "0" + '\n';
        console.log(newClausule);
        if(!generatedInstance.includes(newClausule)){
          numberOfClausules++;
          generatedInstance += newClausule;
        }
      }
    }

    return generatedInstance;
  }
}
