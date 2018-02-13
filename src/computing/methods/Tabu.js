import Result from '../_common/Result.js';
import BufferedReply from '../_common/BufferedReply';

// Tabu method
export class TabuSolver {
    constructor(workerInterface) {
        this._workerInterface = workerInterface;

        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
    }

    //     getWeight(configuration) {
    //         return configuration.getWeight(this.formula.getWeights());
    //     }
    //
    //     getResultWeight(configuration) {
    //         return (this.formula.check(configuration) < this.formula.params.numberOfClausules) ? 0 : this.getWeight(configuration);
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

    _process(iterationLimit, tabuSize, tabuSizeShort) {
        var state = this.problem.getConfiguration();
        console.log(state._bitArray);
        var sBest = state;
        var tabuStates = [];            // Queue
        var tabuStatesSearch = [];      // HashSet
        var tabuChanges = [];           // List

        for (var n = 0; n < iterationLimit; n++) {
            this._bufferedReply.addMessageWithAutoFlush({ fitness: this.problem.getFitness(state) });

            var bestCandidate = null;
            var tabuBestCandidate = null;
            var bestCandidateIndex = -1;
            var tabuBestCandidateIndex = -1;

            for (var i = 0; i < state.getSize(); i++) {
                this.counter++;

                var sCandidate = state.getNeighbour(i);

                if (tabuChanges.indexOf(i) !== -1 && this.problem.getFitness(sCandidate) < this.problem.getFitness(sBest)) continue;

                if (this.problem.getFitness(sCandidate) >= this.problem.getFitness(bestCandidate)) {
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
                    console.log("-- no candidates --");
                    break;
                }
                state = tabuBestCandidate;
                bestCandidateIndex = tabuBestCandidateIndex;
            }
            else {
                state = bestCandidate;
            }
            if (this.problem.getFitness(state) > this.problem.getFitness(sBest)) {
                sBest = state;
//                if (this.formula.check(sBest) === this.formula.params.numberOfClausules) {
//                    console.log(
//                        (this.counter - tabuChanges[tabuChanges.length-1]) + "\t" +
//                        this._getWeight(sBest)
//                    );
//                }
            }

            tabuStates.push(state);
            tabuStatesSearch[state.toString()] = true;
            tabuChanges.push(bestCandidateIndex);

            if (tabuStates.length > tabuSize) {
                delete tabuStatesSearch[tabuStates.shift().toString()];
            }
            if (tabuChanges.length > tabuSizeShort) {
                tabuChanges.shift();
            }
        }
        // added flush to send remaining progress data before terminating
        this._bufferedReply.addMessage({ fitness: this.problem.getFitness(state) }).flush();

        return sBest;
    }

    solve(problem, params) {
        this.problem = problem;
        this.counter = 0;

        var iterationLimit = params.iterationLimit;
        var tabuSize = params.tabuSize;
        var tabuSizeShort = params.tabuSizeShort;

        // initial message to set up the interface for the computation
        this._workerInterface.reply('init', { numberOfIterations: iterationLimit });

        var best = this._process(iterationLimit, tabuSize, tabuSizeShort);

        // return Result class managing data format
        return new Result(best.getBitArray(), this.problem.getFitness(best), this.counter);
    }
}
