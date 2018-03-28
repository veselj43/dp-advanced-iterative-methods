import {getRandomInt} from "./Random";

export class TournamentSelection {
    constructor(tournamentSize) {
        this._tournamentSize = tournamentSize;
        this._smaller = Math.floor(this._tournamentSize);
        this._bigger = Math.ceil(this._tournamentSize);
        this._rest = this._tournamentSize - this._smaller;
    }

    selectIndividuals(generation, number) {
        var selected = [];
        var smallerRounds = number - Math.round(number*this._rest);
        //smaller rounds
        while (selected.length < smallerRounds) {
            selected.push(this._findWinner(generation, this._smaller));
        }
        //bigger rounds
        while (selected.length < number) {
            selected.push(this._findWinner(generation, this._bigger));
        }
        return selected;
    }

    _findWinner(generation, tournamentSize) {
        var winner = this._selectRandomIndividual(generation);
        for (var i = 1; i < tournamentSize; i++) {
            var challenger = this._selectRandomIndividual(generation);
            if (challenger.getFitness() > winner.getFitness()) {
                winner = challenger;
            }
        }
        return winner;
    }

    _selectRandomIndividual(generation) {
        return generation[getRandomInt(0, generation.length)];
    }
}

export class RouletteSelection {
    constructor(scale, min, max) {
        this.scale = scale;
        this.min = min;
        this.max = max;
    }

    selectIndividuals(generation, number) {
        var rankSum
        switch (this.scale) {
            case "rank":
                rankSum = this._rankIndividuals(generation);
                break;
            case "linear":
                rankSum = this._scaleIndividuals(generation);
                break;
            default:
                throw new Error("Selection type " + this.scale + " is not supported.");
        }
        var selected = [];
        while (selected.length < number) {
            selected.push(this._rouletteSelect(generation, rankSum))
        }
        return selected;
    }

    _rouletteSelect(generation, rankSum) {
        var roulette = getRandomInt(0, rankSum);
        //generation is sorted by fitness best individual is the last one
        var i = generation.length;
        do {
            i--;
            roulette -= generation[i].getRank();
        } while (roulette >= 0/* && i > 0*/); //i > 0 just for precision errors
        return generation[i];
    }

    _rankIndividuals(generation) {
        var rankSum = 0;
        for (var i = 0; i < generation.length; i++) {
            var rank = this.min + i * ((this.max - this.min)/(generation.length - 1));
            generation[i].setRank(rank);
            rankSum += rank;
        }
        return rankSum;
    }

    _scaleIndividuals(generation) {
        var fitMax = generation[generation.length-1].getFitness();
        var fitMin = generation[0].getFitness();
        var rankSum = 0;
        for (var i = 0; i < generation.length; i++) {
            var scaledRank = this.min + (generation[i].getFitness() - fitMin)*((this.max - this.min)/(fitMax - fitMin));
            generation[i].setRank(scaledRank);
            rankSum += scaledRank;
        }
        return rankSum;
    }
}
