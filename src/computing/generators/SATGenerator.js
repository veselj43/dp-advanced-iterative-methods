/**
 * Class for generating SAT problem instances
 * @type {class}
 */
export default class SATGenerator {
  /**
   * Class constructor
   * @param {object} params parameters of the generated instance
   */
  constructor (params) {
    this.params = params;
    this.params.noVariables = +this.params.noVariables;
    this.params.noClauses = +this.params.noClauses;
    this.params.noLiterals = +this.params.noLiterals;
  }

  /**
   * Generate instance based on parameters
   * @return {String} instance of SAT problem coded as String
   */
  generate () {
    var generatedInstance = "p cnf " +  this.params.noVariables + " " + this.params.noClauses + '\n';
    var sign;
    var empty;
    var numberOfClauses = 0;
    var newClause;

    var addedClauses = [];

    while (numberOfClauses !== this.params.noClauses)
    {
      newClause = "";
      empty = true;
      for (var i = 0; i < this.params.noVariables; i++)
      {
        if(Math.random() < 1/(this.params.noVariables / this.params.noLiterals)) {
          sign = Math.round(Math.random());
          if(sign) {
            newClause += (i+1) + " ";
            empty = false;
          }
          else {
            newClause += "-" + (i+1) + " ";
            empty = false;
          }
        }
      }
      if(!empty) {
        newClause += "0" + '\n';
        if(!addedClauses[newClause]){
          numberOfClauses++;
          generatedInstance += newClause;
          addedClauses[newClause] = 1;
        }
      }
    }
    return generatedInstance;
  }
}
