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

        const populationSize = +params.populationSize;
        const noGenerations = +params.noGenerations;
        switch (params.selectionType) {
            case SelectionEnum.ROULETTE_RANK:
                this.selection = new RouletteSelection(SelectionEnum.ROULETTE_RANK, +params.scaleMin, +params.scaleMax);
                break;
            case SelectionEnum.ROULETTE_LINEAR:
                this.selection = new RouletteSelection(SelectionEnum.ROULETTE_LINEAR, +params.scaleMin, +params.scaleMax);
                break;
            case SelectionEnum.TOURNAMENT:
                this.selection = new TournamentSelection(+params.tournamentSize);
                break;
            default:
                throw new Error("Selection type " + params.selectionType + " is not supported.");
        }
        this.crossoverProb = +params.crossoverProb;
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
        this.mutationRate = +params.mutationRate;
        const elitism = +params.elitism;


        this.result = [];
        this.bestFitness = Number.NEGATIVE_INFINITY;
        this.bestCost = 0;
        this.counter = 0;

        this._workerInterface.reply('init', { numberOfIterations: noGenerations/*, maxFitness: this.problemInput.params.numberOfClauses*/ });

        //init generation
        var generation = this._initGeneration(populationSize);

        //evolve solution
        for (var g = 0; g < noGenerations; g++) {
            var potentialParents = this.selection.selectIndividuals(generation, populationSize-elitism);
            generation = this._doNewGeneration(potentialParents).concat(generation.slice(populationSize-elitism, populationSize));
            this._evaluateGeneration(generation);
            this.counter++;
        }

        // make sure all messages in buffer are sent (if there are some in buffer, it will send them)
        this._bufferedReply.flush();

        return new Result(problem.getResult(this.result), this.bestCost, this.counter);
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
            average += this.problem.transformMaximizationToRealCost(generation[i].getFitness());
        }
        average = average/generation.length;
        generation.sort(function(a, b){return a.getFitness() - b.getFitness()});

        var bestCost = this.problem.transformMaximizationToRealCost(generation[generation.length-1].getFitness());

        this._bufferedReply.addMessageWithAutoFlush({
            best: bestCost,
            average: average,
            mean: this.problem.transformMaximizationToRealCost(generation[Math.floor(generation.length/2)].getFitness()),
            worst: this.problem.transformMaximizationToRealCost(generation[0].getFitness()),
        });
        //update best solution
        if (this.bestFitness < generation[generation.length-1].getFitness()) {
            this.bestFitness = generation[generation.length-1].getFitness();
            this.bestCost = bestCost;
            this.result = generation[generation.length-1];
        }
    }

    _doNewGeneration(potentialParents) {
        var newGeneration = [];
        var mate = null;
        for (var i = 0; i < potentialParents.length; i++) {
            if (Math.random() < this.crossoverProb) {
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
        const mutationRate = this.mutationRate;
        newGeneration.forEach(function(individual){
            individual.mutate(mutationRate);
        });
        return newGeneration;
    }
}
