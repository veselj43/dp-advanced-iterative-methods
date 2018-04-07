import Result from '../_common/Result.js';
import BufferedReply from '../_common/BufferedReply';

// Tabu method
export class TabuSolver {
    constructor(workerInterface) {
        this._workerInterface = workerInterface;

        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
    }

    _getCost(state) {
        if (state === null) return -Infinity;
        return this.problem.getFitness(state);
    }

    _compareIndexesOf(queue, c1, c2) {
        for (var i in queue) {
            if (queue[i].equals(c1)) return 1;
            if (queue[i].equals(c2)) return -1;
        }
        return 0;
    }

    _containsSearch(set, configuration) {
        if (set[configuration.toString()]) {
            // console.log(this.counter);
            this.tabuCounter++;
        }
        return set[configuration.toString()];
    }

    _process(iterationLimit, tabuSize, tabuSizeShort) {
        var state = this.problem.getConfiguration();    // initial state
        var sBest = state;                              // initial best found state
        var tabuStates = [];            // Queue
        var tabuStatesSearch = {};      // HashSet
        var tabuChanges = [];           // Queue

        // tabu iterations
        for (var n = 0; n < iterationLimit; n++) {
            this._bufferedReply.addMessageWithAutoFlush(this.problem.getProblemCost(state));

            // init for this loop
            var bestCandidate = null;
            var tabuBestCandidate = null;
            var bestCandidateIndex = -1;
            var tabuBestCandidateIndex = -1;

            // checking neighbours
            for (var i = 0; i < state.getSize(); i++) {
                this.counter++;

                var sCandidate = state.getNeighbour(i);

                // check change for tabu and if it is tabu, check if we dont miss the best found state
                if (tabuChanges.indexOf(i) !== -1 && this._getCost(sCandidate) < this._getCost(sBest)) continue;

                // is current candidate better than best candidate in this step?
                if (this._getCost(sCandidate) >= this._getCost(bestCandidate)) {
                    // is current candidate tabu?
                    if (!this._containsSearch(tabuStatesSearch, sCandidate)) {
                        bestCandidate = sCandidate;
                        bestCandidateIndex = i;
                    }
                    // if it is, remember the least tabu candidate
                    else if (this._compareIndexesOf(tabuStates, sCandidate, tabuBestCandidate) > 0) {
                        tabuBestCandidate = sCandidate;
                        tabuBestCandidateIndex = i;
                    }
                }
            }

            // all candidates are tabu
            if (bestCandidateIndex === -1) {
                // there are non even tabu candidates, we have nowhere to go
                if (tabuBestCandidateIndex === -1) {
                    console.log("-- no candidates --");
                }
                else {
                    state = tabuBestCandidate;
                    bestCandidateIndex = tabuBestCandidateIndex;
                }
            }
            // normal situation, not tabu state
            else {
                state = bestCandidate;
            }
            // keep best state found up to date
            if (this._getCost(state) > this._getCost(sBest)) {
                sBest = state;
            }

            // update tabu lists
            tabuStates.push(state);
            tabuStatesSearch[state.toString()] = true;
            tabuChanges.push(bestCandidateIndex);

            // remove oldest from tabu if its full
            if (tabuStates.length > tabuSize) {
                delete tabuStatesSearch[tabuStates.shift().toString()];
            }
            if (tabuChanges.length > tabuSizeShort) {
                tabuChanges.shift();
            }
        }
        // added flush to send remaining progress data before terminating
        this._bufferedReply.addMessage(this.problem.getProblemCost(state)).flush();

        return sBest;
    }

    solve(problem, params) {
        this.problem = problem;
        this.counter = 0;
        this.tabuCounter = 0;

        var iterationLimit = params.iterationLimit;
        var tabuSize = params.tabuSize;
        var tabuSizeShort = params.tabuSizeShort;

        // initial message to set up the interface for the computation
        this._workerInterface.reply('init', { numberOfIterations: iterationLimit });

        var best = this._process(iterationLimit, tabuSize, tabuSizeShort);

        console.log('tabu checks:', this.tabuCounter);

        // return Result class managing data format
        return new Result(problem.getResult(best), this.problem.getProblemCost(best), this.counter);
    }
}
