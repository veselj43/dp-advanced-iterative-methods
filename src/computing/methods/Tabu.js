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
        return this.problem.evaluateMaximizationCost(state);
    }

    _generateNeighborhood(size, neighborsToCheckRatio) {
        var nbhSize = Math.round(size * neighborsToCheckRatio);
        var nbh = [];
        for (var i = 0; i < size; i++) {
            nbh.push(i);
        }
        while (nbh.length > nbhSize) {
            var randomIndex = Math.round(Math.random() * (nbh.length - 1));
            nbh.splice(randomIndex, 1);
        }
        return nbh;
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

    _process(iterationLimit, neighborsToCheckRatio, tabuSize, tabuSizeShort, randomStart) {
        var state = this.problem.getConfiguration(randomStart);     // initial state
        var stateCost = this._getCost(state);                       // initial state cost
        var sBest = state;                                          // initial best found state
        var sBestCost = stateCost;                                  // initial best found state cost
        var tabuStates = [];            // Queue
        var tabuStatesSearch = {};      // HashSet
        var tabuChanges = [];           // Queue

        // tabu iterations
        for (var n = 0; n < iterationLimit; n++) {
            this._bufferedReply.addMessageWithAutoFlush(this.problem.transformMaximizationToRealCost(stateCost));

            // init for this loop
            var bestCandidate = null;
            var bestCandidateCost = this._getCost(bestCandidate);
            var bestCandidateIndex = -1;
            var tabuBestCandidate = null;
            var tabuBestCandidateCost = this._getCost(tabuBestCandidate);
            var tabuBestCandidateIndex = -1;

            var neighborhood = this._generateNeighborhood(state.getSize(), neighborsToCheckRatio);

            // checking neighbours
            for (var i = 0; i < neighborhood.length; i++) {
                this.counter++;

                var sCandidate = state.getNeighbour(neighborhood[i]);
                var sCandidateCost = this._getCost(sCandidate);

                // check change for tabu and if it is tabu, check if we dont miss the best found state
                if (tabuChanges.indexOf(i) !== -1 && sCandidateCost < sBestCost) continue;

                // is current candidate better than best candidate in this step?
                if (sCandidateCost >= bestCandidateCost) {
                    // is current candidate tabu?
                    if (!this._containsSearch(tabuStatesSearch, sCandidate)) {
                        bestCandidate = sCandidate;
                        bestCandidateCost = sCandidateCost;
                        bestCandidateIndex = i;
                    }
                    // if it is, remember the least tabu candidate
                    else if (this._compareIndexesOf(tabuStates, sCandidate, tabuBestCandidate) > 0) {
                        tabuBestCandidate = sCandidate;
                        tabuBestCandidateCost = sCandidateCost;
                        tabuBestCandidateIndex = i;
                    }
                }
            }

            // all candidates are tabu
            if (bestCandidateIndex === -1) {
                // there are non even tabu candidates, we have nowhere to go
                if (tabuBestCandidateIndex === -1) {
                    // console.log("-- no candidates --");
                }
                else {
                    state = tabuBestCandidate;
                    stateCost = tabuBestCandidateCost;
                    bestCandidateIndex = tabuBestCandidateIndex;
                }
            }
            else {
                // normal situation, not tabu state
                state = bestCandidate;
                stateCost = bestCandidateCost;
            }

            // keep best state found up to date
            if (stateCost > sBestCost) {
                sBest = state;
                sBestCost = stateCost;
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
        this._bufferedReply.addMessage(this.problem.transformMaximizationToRealCost(stateCost)).flush();

        return sBest;
    }

    solve(problem, {iterationLimit, neighborsToCheck, tabuSize, tabuSizeShort, randomStart}) {
        this.problem = problem;
        this.counter = 0;
        this.tabuCounter = 0;

        // initial message to set up the interface for the computation
        this._workerInterface.reply('init', { numberOfIterations: iterationLimit });

        var best = this._process(iterationLimit, neighborsToCheck / 100, tabuSize, tabuSizeShort, randomStart);

        // console.log('tabu checks:', this.tabuCounter);

        // return Result class managing data format
        return new Result(
            problem.getResult(best), 
            this.problem.transformMaximizationToRealCost(this.problem.evaluateMaximizationCost(best)), 
            this.counter
        );
    }
}
