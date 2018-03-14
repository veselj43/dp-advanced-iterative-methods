import {getRandomInt} from "./Random";

export class TourneySelection {
    constructor(tourneySize) {
        this._tourneySize = tourneySize;
        this._smaller = Math.floor(this._tourneySize);
        this._bigger = Math.ceil(this._tourneySize);
        this._rest = this._tourneySize - this._smaller;
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

    _findWinner(generation, tourneySize) {
        var winner = this._selectRandomIndividual(generation);
        for (var i = 1; i < tourneySize; i++) {
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
    constructor(min, max) {
        //TODO
    }
    selectIndividuals(generation, number) {
        var rankSum = this._rankIndividuals(generation);
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
            generation[i].setRank(i+1);
            rankSum += i+1;
        }
        return rankSum;
    }
}
