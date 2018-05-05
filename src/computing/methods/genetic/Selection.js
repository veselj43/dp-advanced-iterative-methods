import {getRandomFloat, getRandomInt} from "./Random";

export const SelectionEnum = {
    TOURNAMENT: "Tournament",
    ROULETTE_RANK: "Roulette with ranking",
    ROULETTE_LINEAR: "Roulette with linear scaling"
}


export class TournamentSelection {
    /**
     * Creates tournament selection of given size.
     * @param {number} tournamentSize size of tournament
     */
    constructor(tournamentSize) {
        this._tournamentSize = tournamentSize;
        this._smaller = Math.floor(this._tournamentSize);
        this._bigger = Math.ceil(this._tournamentSize);
        this._rest = this._tournamentSize - this._smaller;
    }

    /**
     * Selects individuals using tournament selection.
     * @param {Array} generation from which to select
     * @param {number} number of individuals to select
     * @returns {Array} selected individuals
     */
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

    /**
     * Find winner of tournament of given size.
     * @param generation from which to select competing individuals
     * @param tournamentSize size of tournament
     * @returns {Individual} winner of tournament
     * @private
     */
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

    /**
     * Selects random individual from generation
     * @param generation from which to select
     * @returns {Individual} selected individual
     * @private
     */
    _selectRandomIndividual(generation) {
        return generation[getRandomInt(0, generation.length)];
    }
}

export class RouletteSelection {
    /**
     * Creates roulette selection with given parameters.
     * @param scale type of scaling linear/ranking
     * @param min scale
     * @param max scale
     */
    constructor(scale, min, max) {
        this.scale = scale;
        this.min = min;
        this.max = max;
    }

    /**
     * Selects individuals using roulette selection.
     * @param {Array} generation from which to select
     * @param {number} number of individuals to select
     * @returns {Array} selected individuals
     */
    selectIndividuals(generation, number) {
        var rankSum;
        switch (this.scale) {
            case SelectionEnum.ROULETTE_RANK:
                rankSum = this._rankIndividuals(generation);
                break;
            case SelectionEnum.ROULETTE_LINEAR:
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

    /**
     * Select individual from generation using roulette
     * @param {Array} generation from which to select
     * @param {number} rankSum sum of portions on roulette
     * @returns {Individual} selected individual
     * @private
     */
    _rouletteSelect(generation, rankSum) {
        var roulette = getRandomFloat(0, rankSum);

        //generation is sorted by fitness best individual is the last one
        var i = generation.length;
        do {
            i--;
            roulette -= generation[i].getRank();
        } while (roulette >= 0/* && i > 0*/); //i > 0 just for precision errors
        return generation[i];
    }

    /**
     * Give individuals portions on roulette wheel based on linearly scaled rank.
     * @param {Array} generation individuals
     * @returns {number} sum of portions
     * @private
     */
    _rankIndividuals(generation) {
        var rankSum = 0;
        for (var i = 0; i < generation.length; i++) {
            var rank = this.min + i * ((this.max - this.min)/(generation.length - 1));
            generation[i].setRank(rank);
            rankSum += rank;
        }
        return rankSum;
    }

    /**
     * Give individuals portions on roulette wheel based on linearly scaled fitness.
     * @param {Array} generation individuals
     * @returns {number} sum of portions
     * @private
     */
    _scaleIndividuals(generation) {
        var fitMax = generation[generation.length-1].getFitness();
        var fitMin = generation[0].getFitness();
        var rankSum = 0;
        if (fitMin >= fitMax) {
            for (var i = 0; i < generation.length; i++) {
                generation[i].setRank(1);
                rankSum += 1;
            }
        } else {
            for (var i = 0; i < generation.length; i++) {
                var scaledRank = this.min + (generation[i].getFitness() - fitMin) * ((this.max - this.min) / (fitMax - fitMin));
                generation[i].setRank(scaledRank);
                rankSum += scaledRank;
            }
        }
        return rankSum;
    }
}
