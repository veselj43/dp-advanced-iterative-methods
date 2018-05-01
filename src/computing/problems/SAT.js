import { BitArray } from "./configurationTypes/BitArray";
import { Problem, ProblemTypeEnum } from './Problem';

// common SAT input
class Literal {
    constructor(name, i) {
        this.id = name; // int
        this.inv = i;   // boolean "inverted"
    }
}

class Clause {
    constructor(literalArray) {
        this.literals = literalArray.map(literal => {
            let inv = (literal < 0);
            let id = inv ? -literal : +literal;

            return new Literal(id - 1, inv);
        });
    }

    check(bitArray) {
        for (let literal of this.literals) {
            if (bitArray[literal.id] && !literal.inv) return true;
            if (!bitArray[literal.id] && literal.inv) return true;
        }
        return false;
    }
}

export class SAT extends Problem {
    constructor(data) {
        super();
        this._clauses = [];
        let dataSet = data
            .split('\n')
            .filter(row => row.trim()[0] !== 'c');

        let params = dataSet[0]
            .split(/(\s+)/)
            .filter(x => x.trim().length > 0)
            .splice(2, 2)
            .map(param => +param);

        this.params = {
            numberOfVariables: params[0],
            numberOfClauses: params[1]
        }

        dataSet = dataSet
            .splice(1, params[1])
            .map(row => {
                row = row
                    .trim()
                    .split(' ');
                row = row
                    .splice(0, row.length - 1)
                    .map(number => +number);

                return row;
            });

        for (let row in dataSet) {
            this._clauses.push(new Clause(dataSet[row]));
        };
    }

    _check(bitArray) {
        return this._clauses.reduce((sum, clause) => {
            return (clause.check(bitArray)) ? sum + 1 : sum;
        }, 0);
    }

    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    evaluateMaximizationCost(bitArrayConfig) {
        if (bitArrayConfig === null) return -1;

        const bitArray = bitArrayConfig.getBitArray();
        return this._check(bitArray);
    }

    transformMaximizationToRealCost(maxCost) {
        return maxCost;
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
    static isInvalidInstance(instanceContent) {
        let rows = instanceContent.split('\n').filter(row => row.trim()[0] !== 'c');

        let [noVariables, noClauses] = rows[0]
            .split(/(\s+)/)
            .filter(x => x.trim().length > 0)
            .splice(2, 2)
            .map(param => +param);

        if (isNaN(noVariables) || isNaN(noClauses)) return { text: "Invalid number of parameters" };

        if(noVariables < 0) return { text: "Number of variables cant be negative" };
        if(noClauses < 0) return { text: "Number of clauses cant be negative" };

        if(noClauses > Math.pow(3, noVariables) - 1) return { text: "Number of clauses is at max: " + Math.pow(3, noVariables) - 1 };

        rows = rows.slice(1).filter(row => !!row.trim());

        let clausesEndIndex = rows.findIndex(row => row.indexOf("%") !== -1);
        if (clausesEndIndex === -1) clausesEndIndex = rows.length;

        instanceContent = rows
            .slice(0, clausesEndIndex)
            .join('\n')
            .split(/\s+/);

        if (noClauses !== clausesEndIndex) return { text: "Number of clauses doesn't match the actual number of clauses" };

        let clauses = [];
        let clause = "";

        if (instanceContent.some(isNaN)) {
            // if some elements returns true when isNaN function applied on it
            return { text: `Must contain only numbers, except for "p cnf" statement and comments` };
        }

        for(let i = 0; i < instanceContent.length; i++) {
            if(noVariables < +instanceContent[i] || -noVariables > +instanceContent[i]) return { text: `Invalid variable in clause:  "${+instanceContent[i]}"` };
            if(+instanceContent[i] !== 0) clause += instanceContent[i] + " ";
            else {
                if(clauses[clause]) return { text: `Multiple same clauses: "${clause} 0"`};
                clauses[clause] = 1;
                clause = "";
            }
        }

        return false; // valid instance
    }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    static resolveInstanceParams(instanceContent) {
        let dataSet = instanceContent
            .split('\n')
            .filter(row => row.trim()[0] !== 'c');

        let params = dataSet[0]
            .split(/(\s+)/)
            .filter(x => x.trim().length > 0)
            .splice(2, 2)
            .map(param => +param);

        return {
            noVariables: params[0],
            noClauses: params[1]
        }
    }
}
