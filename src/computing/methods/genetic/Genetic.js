import Result from '../../_common/Result';
import BufferedReply from "../../_common/BufferedReply";
import {RouletteSelection, TourneySelection} from "./Selection";
import {OnePointCrossover, TwoPointCrossover, UniformCrossover} from "./Crossover";


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
            case "roulette-rank":
                this.selection = new RouletteSelection("rank", params.scaleMin);
                break;
            case "roulette-linear":
                this.selection = new RouletteSelection("linear", params.scaleMin, params.scaleMax);
                break;
            case "tourney":
                this.selection = new TourneySelection(params.tourneySize);
                break;
            default:
                throw new Error("Selection type " + params.selectionType + " is not supported.");
        }
        const crossoverProb = params.crossoverProb;
        switch (params.crossoverType) {
            case "one-point":
                this.crossover = new OnePointCrossover();
                break;
            case "two-point":
                this.crossover = new TwoPointCrossover();
                break;
            case "uniform":
                this.crossover = new UniformCrossover();
                break;
            default:
                throw new Error("Crossover type " + params.selectionType + " is not supported.");

        }
        const elitism = params.elitism;


        this.result = [];
        this.bestFitness = 0;
        this.counter = 0;

        console.log("params: ", params);

        this._workerInterface.reply('init', { numberOfIterations: params.noGenerations/*, maxFitness: this.problemInput.params.numberOfClausules*/ });

        //init generation
        var generation = this._initGeneration(populationSize);

        //evolve solution
        for (var g = 0; g < noGenerations; g++) {
            var potentialParents = this.selection.selectIndividuals(generation, populationSize-elitism);
            generation = this._doNewGeneration(potentialParents, crossoverProb).concat(generation.slice(populationSize-elitism, populationSize));
            this._evaluateGeneration(generation);
            //this._workerInterface.reply('progress', { counter: g, fitness: generation[0] });
            this._bufferedReply.addMessageWithAutoFlush({ fitness: generation[0] });
            this.counter++;
        }

        return new Result(this.result, this.bestFitness, this.counter);
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
        // generation.forEach(function(individual){
        //     this.problem.evaluateIndividual(individual);
        // });
        var average = 0;
        for (var i = 0; i < generation.length; i++) {
            this.problem.evaluateIndividual(generation[i]);
            average += generation[i].getFitness();
        }
        average = average/generation.length;
        generation.sort(function(a, b){return a.getFitness() - b.getFitness()});
        console.log('worst: ' +  generation[0].getFitness() + ' average: ' + average + " mean: " + generation[Math.floor(generation.length/2)].getFitness() + " best: " + generation[generation.length-1].getFitness());
        //update best solution
        if (this.bestFitness < generation[generation.length-1].getFitness()) {
            this.bestFitness = generation[generation.length-1].getFitness();
            this.result = generation[generation.length-1].getBitArray();
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
