import { BitArray } from "./configurationTypes/BitArray";
import { Problem, ProblemTypeEnum } from './Problem'

// common SAT input
export class Literal {
    constructor(name, i) {
        this.id = name; // int
        this.inv = i;   // boolean "inversed"
    }
}

export class Clausule {
    constructor(literalArray) {
        this.literals = literalArray.map(literal => {
            var id = parseInt(literal);

            var inv = false;
            if (id < 0) {
                id *= -1;
                inv = true;
            }

            return new Literal(id-1, inv);
        });
    }

    check(bitArray) {
        for (var literal in this.literals) {
            if (bitArray[this.literals[literal].id] && !this.literals[literal].inv) return true;
            if (!bitArray[this.literals[literal].id] && this.literals[literal].inv) return true;
        }
        return false;
    }
}

export class SAT extends Problem {
    constructor(data) {
        super();
        this._clausules = [];
        var dataSet = data
            .split('\n')
            .filter(row => row.trim()[0] !== 'c');

        var params = dataSet[0]
            .split(/(\s+)/)
            .filter(x => x.trim().length > 0)
            .splice(2, 2)
            .map(param => parseInt(param));

        this.params = {
            numberOfVariables: params[0],
            numberOfClausules: params[1]
        }

        dataSet = dataSet
            .splice(1, params[1])
            .map(row => {
                row = row
                    .trim()
                    .split(' ');
                row = row
                    .splice(0, row.length-1)
                    .map(number => parseInt(number));

                return row;
            });

        for (var row in dataSet) {
            this._clausules.push(new Clausule(dataSet[row]));
        };
    }

    _check(bitArray) {
        var satisfied = 0;
        this._clausules.forEach(clausule => {
            if (clausule.check(bitArray)) satisfied++;
        });
        return satisfied;
    }

    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    getFitness(bitArrayConfig) {
        if (bitArrayConfig === null) return -1;

        const bitArray = bitArrayConfig.getBitArray();

        var trueClauses = this._check(bitArray);
        if (trueClauses < this.params.numberOfClausules) return trueClauses;
        return this.params.numberOfClausules;// + getWeight(configuration);
    }

    /**
     * Returns random, or all 0, configuration of SAT problem(BitArray configuration)
     * @param  {bool} random random or all 0
     * @return {class}  new BitArray class
     */
    getConfiguration(random) {
        return new BitArray({
            size: this.params.numberOfVariables,
            random: random
        });
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
     * Returns the result of the config, in this case the config array
     * @param  {class} bitArrayConfig the configuration of which result we want
     * @return {Array} the bit array of the configuration
     */
    getResult(bitArrayConfig) {
        return bitArrayConfig.getBitArray();
    }

    getType() {
        return ProblemTypeEnum.BINARY;
    }

    /**
     * Returns instance invalidity
     * @param  {string} instanceContent content of the instance
     * @return {boolean} is instance invalid
     */
    isInvalidInstance(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        if((instanceContent.length - 1) < 6) return { text: "Invalid number of parameters"};

        var noVariables = +instanceContent[2];
        var noClausules = +instanceContent[3];

        if(noVariables < 0) return { text: "Number of variables cant be negative"};
        if(noClausules < 0) return { text: "Number of clausules cant be negative"};

        if(noClausules > Math.pow(3, noVariables) - 1) return { text: "Number of clausules is at max: " + Math.pow(3, noVariables) - 1};

        var clausules = [];
        var clausule = "";
        var clausulesCounter = 0;

        instanceContent.splice(0, 4);

        for(var i = 0; i < instanceContent.length; i++){
          if(isNaN(instanceContent[i])) return { text: "Most contain only numbers, except for \"p cnf\""};
        }

        for(var i = 0; i < instanceContent.length; i++)
        {
          if(noVariables < +instanceContent[i] || -noVariables > +instanceContent[i]) return { text: "Invalid variable in clasule: \"" +instanceContent[i] + "\""};
          if(+instanceContent[i] !== 0) clausule += instanceContent[i] + " ";
          else {
            clausulesCounter++;
            if(clausules[clausule]) return { text: "Multiple same clausules: \"" + clausule + "0" + "\""};
            clausules[clausule] = 1;
            clausule = "";
          }
        }

        if(clausulesCounter - 1 !== noClausules) return { text: "Number of clausules doesnt match the actual number of clausules"};

        return false; // valid instance
    }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    resolveInstanceParams(instanceContent) {
        var dataSet = instanceContent
            .split('\n')
            .filter(row => row.trim()[0] !== 'c');

        var params = dataSet[0]
            .split(/(\s+)/)
            .filter(x => x.trim().length > 0)
            .splice(2, 2)
            .map(param => parseInt(param));

        return {
            noVariables: params[0],
            noClausules: params[1]
        }
    }
}
