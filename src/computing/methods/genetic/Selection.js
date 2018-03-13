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
