
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

    check(configuration) {
        for (var literal in this.literals) {
            if (configuration.selection[this.literals[literal].id] && !this.literals[literal].inv) return true;
            if (!configuration.selection[this.literals[literal].id] && this.literals[literal].inv) return true;
        }
        return false;
    }
}

export class SAT {
    constructor(data) {
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

    check(conf) {
        var satisfied = 0;
        this._clausules.forEach(clausule => {
            if (clausule.check(conf)) satisfied++;
        });
        return satisfied;
    }

    fitness(configuration) {
        if (configuration === null) return -1;
        var trueClauses = this.formula.check(configuration);
        if (trueClauses < this.formula.params.numberOfClausules) return trueClauses;
        return this.formula.params.numberOfClausules;// + getWeight(configuration);
    }
}
