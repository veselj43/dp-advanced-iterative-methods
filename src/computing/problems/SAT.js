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

    check(bitArray) {
        var satisfied = 0;
        this._clausules.forEach(clausule => {
            if (clausule.check(bitArray)) satisfied++;
        });
        return satisfied;
    }

    getFitness(bitArrayConfig) {
        if (bitArrayConfig === null) return -1;

        const bitArray = bitArrayConfig.getBitArray();

        var trueClauses = this.check(bitArray);
        if (trueClauses < this.params.numberOfClausules) return trueClauses;
        return this.params.numberOfClausules;// + getWeight(configuration);
    }

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
