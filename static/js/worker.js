class Literal {
    constructor(name, i) {
        this.id = name; // int
        this.inv = i;   // boolean "inversed"
    }
}

class Clausule {
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

class CNF {
    constructor(data) {
        this.clausules = [];
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
            this.clausules.push(new Clausule(dataSet[row]));
        };
    }

    check(conf) {
        var satisfied = 0;
        this.clausules.forEach(clausule => {
            if (clausule.check(conf)) satisfied++;
        });
        return satisfied;
    }
}

class Configuration {
    constructor(size, fromSelection) {
        if (fromSelection) {
            this.selection = fromSelection.map(x => x);
        }
        else {
            this.selection = [];
            for (var i = 0; i < size; i++)
                this.selection[i] = false;
        }
    }

    copy() {
        return new Configuration(this.selection.length, this.selection);
    }

    changeOn(position) {
        this.selection[position] = !this.selection[position];
        return this;
    }

    getNeighbor(position) {
        return this.copy().changeOn(position);
    }

    toString() {
        var str = "";
        for (var i in this.selection) {
            str += (this.selection[i]) ? "1" : "0";
        }
        return str;
    }

    equals(other) {
        if (other == null) return false;
        for (var i = 0; i < this.selection.length; i++)
            if (this.selection[i] != other.selection[i]) return false;
        return true;
    }
}

class Input3SAT {
    constructor(data, type) {
        this.input = null;
        if (type === "cnf") this.input = new CNF(data);
    }
}

class TabuSolver {
    constructor(params) {
        this.params = params;
    }

    //     getWeight(Configuration c) {
    //         return c.getWeight(formula.getWeights());
    //     }
    //
    //     getResultWeight(Configuration c) {
    //         return (formula.check(c) < formula.getClausuleCount()) ? 0 : getWeight(c);
    //     }

    _compareIndexesOf(queue, c1, c2) {
        for (var i in queue) {
            if (queue[i].equals(c1)) return 1;
            if (queue[i].equals(c2)) return -1;
        }
        return 0;
    }

    _containsSearch(set, configuration) {
        return set[configuration.toString()] === true;
    }

    _fitness(configuration) {
        if (configuration === null) return -1;
        var trueClauses = this.formula.check(configuration);
        if (trueClauses < this.formula.params.numberOfClausules) return trueClauses;
        return this.formula.params.numberOfClausules;// + getWeight(configuration);
    }

    _process(limit, maxTabuSize, maxTabuSize2) {
        var state = this.state0;
        var sBest = state;
        var tabuStates = [];            // Queue
        var tabuStatesSearch = [];      // HashSet
        var tabuChanges = [];           // List

        for (var n = 0; n < limit; n++) {
            postMessage(["progress", { counter: this.counter, fitness: this._fitness(state) }]);

            var bestCandidate = null;
            var tabuBestCandidate = null;
            var bestCandidateIndex = -1;
            var tabuBestCandidateIndex = -1;

            for (var i = 0; i < this.formula.params.numberOfVariables; i++) {
                this.counter++;

                var sCandidate = state.getNeighbor(i);
                // console.log("sCandidate", sCandidate, this._fitness(sCandidate));
                if (tabuChanges.indexOf(i) !== -1 && this._fitness(sCandidate) < this._fitness(sBest)) continue;

                if (this._fitness(sCandidate) >= this._fitness(bestCandidate)) {
                    if (!this._containsSearch(tabuStatesSearch, sCandidate)) {
                        bestCandidate = sCandidate;
                        bestCandidateIndex = i;
                    }
                    else if (this._compareIndexesOf(tabuStates, sCandidate, tabuBestCandidate) > 0) {
                        tabuBestCandidate = sCandidate;
                        tabuBestCandidateIndex = i;
                    }
                }
            }

            if (bestCandidate === null) {
                if (tabuBestCandidate === null) {
                    console.log("------------");
                    break;
                }
                state = tabuBestCandidate;
                bestCandidateIndex = tabuBestCandidateIndex;
            }
            else {
                state = bestCandidate;
            }
            if (this._fitness(state) > this._fitness(sBest)) {
                sBest = state;
//                if (formula.check(sBest) == formula.getClausuleCount()) {
//                    System.out.println(
//                        (counter - tabuChanges.get(tabuChanges.size()-1)) + "\t" +
//                        getWeight(sBest)
//                    );
//                }
            }

            tabuStates.push(state);
            tabuStatesSearch[state.toString()] = true;
            tabuChanges.push(bestCandidateIndex);

            if (tabuStates.length > maxTabuSize) {
                delete tabuStatesSearch[tabuStates.shift().toString()];
            }
            if (tabuChanges.length > maxTabuSize2) {
                tabuChanges.shift();
            }
        }

        if (this.formula.check(sBest) === this.formula.params.numberOfClausules) {
            console.log(this.counter + "\t" + this._fitness(sBest)); // getWeight()
        }
        else {
            console.log(this.counter + "\t" + this._fitness(sBest));
        }

        return sBest;
    }

    solve(cnf) {
        this.formula = cnf;
        this.counter = 0;

        var limit = Math.round(this.formula.params.numberOfClausules * this.params.tabu_multiplierLimit);
        var maxTabuSize = Math.round(this.formula.params.numberOfVariables * this.params.tabu_multiplierTabuSize);
        var maxTabuSize2 = Math.round(this.formula.params.numberOfVariables / this.params.tabu_dividerTabuSize2);

        console.log("params: ", limit, maxTabuSize, maxTabuSize2);

        this.state0 = new Configuration(this.formula.params.numberOfVariables);

        var best = this._process(limit, maxTabuSize, maxTabuSize2);

        return best;
    }
}

class Job {
    constructor(inputFile, params) {
        this.problem = new Input3SAT(inputFile.content, "cnf");
        this.solver = new TabuSolver(params);
    }

    run() {
        return this.solver.solve(this.problem.input);
    }
}

// msg recieved event
onmessage = function(e) {
    console.log('[Worker] start');

    var job = new Job(e.data[0], e.data[1]);
    var result = job.run();

    console.log('[Worker] done');

    postMessage(["result", result]);
}
