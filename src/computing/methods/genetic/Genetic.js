import Result from '../../_common/Result';
import BufferedReply from "../../_common/BufferedReply";
import { RouletteSelection, SelectionEnum, TournamentSelection } from './Selection'
import {
    CycleCrossover, CrossoverEnum,
    OnePointCrossover, OrderCrossover, PartiallyMatchedCrossover, TwoPointCrossover,
    UniformCrossover
} from './Crossover'


export class GeneticSolver {
    constructor(workerInterface) {
        this._workerInterface = workerInterface;
        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new BufferedReply(this._workerInterface, 'progressBuffered', 75);
    }

    solve(problem, params) {
        //set params
        this.problem = problem;

        const populationSize = params.populationSize;
        const noGenerations = params.noGenerations;
        switch (params.selectionType) {
            case SelectionEnum.ROULETTE_RANK:
                this.selection = new RouletteSelection(SelectionEnum.ROULETTE_RANK, params.scaleMin, params.scaleMax);
                break;
            case SelectionEnum.ROULETTE_LINEAR:
                this.selection = new RouletteSelection(SelectionEnum.ROULETTE_LINEAR, params.scaleMin, params.scaleMax);
                break;
            case SelectionEnum.TOURNAMENT:
                this.selection = new TournamentSelection(params.tournamentSize);
                break;
            default:
                throw new Error("Selection type " + params.selectionType + " is not supported.");
        }
        const crossoverProb = params.crossoverProb;
        switch (params.crossoverType) {
            case CrossoverEnum.ONE_POINT:
                this.crossover = new OnePointCrossover();
                break;
            case CrossoverEnum.TWO_POINT:
                this.crossover = new TwoPointCrossover();
                break;
            case CrossoverEnum.UNIFORM:
                this.crossover = new UniformCrossover();
                break;
            case CrossoverEnum.ORDER:
                this.crossover = new OrderCrossover();
                break;
            case CrossoverEnum.PMX:
                this.crossover = new PartiallyMatchedCrossover();
                break;
            case CrossoverEnum.CYCLE:
                this.crossover = new CycleCrossover();
                break;
            default:
                throw new Error("Crossover type " + params.selectionType + " is not supported.");

        }
        const elitism = params.elitism;


        this.result = [];
        this.bestFitness = Number.NEGATIVE_INFINITY;
        this.bestCost = 0;
        this.counter = 0;

        this._workerInterface.reply('init', { numberOfIterations: params.noGenerations/*, maxFitness: this.problemInput.params.numberOfClausules*/ });

        //init generation
        var generation = this._initGeneration(populationSize);

        //evolve solution
        for (var g = 0; g < noGenerations; g++) {
            var potentialParents = this.selection.selectIndividuals(generation, populationSize-elitism);
            generation = this._doNewGeneration(potentialParents, crossoverProb).concat(generation.slice(populationSize-elitism, populationSize));
            this._evaluateGeneration(generation);
            this.counter++;
        }

        // make sure all messages in buffer are sent (if there are some in buffer, it will send them)
        this._bufferedReply.flush();

        return new Result(this.result, this.bestCost, this.counter);
    }

    _initGeneration(populationSize) {
        var generation = [];
        for (var i = 0; i < populationSize; i++) {
            generation.push(this.problem.createNewIndividual());
        }
        this._evaluateGeneration(generation);
        return generation;
    }

    _evaluateGeneration(generation) {
        var average = 0;
        for (var i = 0; i < generation.length; i++) {
            this.problem.evaluateIndividual(generation[i]);
            average += this.problem.getProblemCost(generation[i]);
        }
        average = average/generation.length;
        generation.sort(function(a, b){return a.getFitness() - b.getFitness()});

        var bestCost = this.problem.getProblemCost(generation[generation.length-1]);

        this._bufferedReply.addMessageWithAutoFlush({
            worst: this.problem.getProblemCost(generation[0]),
            average: average,
            mean: this.problem.getProblemCost(generation[Math.floor(generation.length/2)]),
            best: bestCost
        });
        //update best solution
        if (this.bestFitness < generation[generation.length-1].getFitness()) {
            this.bestFitness = generation[generation.length-1].getFitness();
            this.bestCost = bestCost;
            this.result = generation[generation.length-1].getGenotype();
        }
    }

    _doNewGeneration(potentialParents, crossoverProb) {
        var newGeneration = [];
        var mate = null;
        for (var i = 0; i < potentialParents.length; i++) {
            if (Math.random() < crossoverProb) {
                if (mate === null) {
                    mate = potentialParents[i];
                } else {
                    //do crossover
                    newGeneration.push(... this.crossover.crossover(mate, potentialParents[i]));
                    mate = null;
                }
            } else {
                //dont go in crossover
                newGeneration.push(potentialParents[i].copy());
            }
        }
        if (mate !== null) {
            //add mate if it havent found another mate
            newGeneration.push(mate.copy())
        }
        //mutate all new individuals
        newGeneration.forEach(function(individual){
            individual.mutate();
        });
        return newGeneration;
    }
}
