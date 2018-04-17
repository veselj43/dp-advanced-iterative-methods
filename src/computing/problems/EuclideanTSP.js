import { Permutation } from "./configurationTypes/Permutation";
import { Problem, ProblemTypeEnum } from './Problem'

export class EuclideanTSP extends Problem {
    /**
     * Constructor, construct the class from the data file selected.
     * @param {string} data instance of a problem coded as string
     */
    constructor(data) {
        super();
        var dataSet = data.split('\n');
        this._noCities = + dataSet[0].split(/\s+/)[0];
        this._cities = new Array(this._noCities);

        for (var i = 0; i < this._noCities; i++) {
            var coords = dataSet[1+i].split(/\s+/);
            this._cities[i] = {x: +coords[0], y: +coords[1]};
        }
        //create cache
        this._distanceCache = new Array(this._noCities);
        for (var i = 0; i < this._noCities; i++) {
            this._distanceCache[i] = new Array(this._noCities);
            for (var j = 0; j < this._noCities; j++) {
                this._distanceCache[i][j] = null;
            }
        }
    }

    /**
     * Returns fitness of selected configuration(Permutation)
     * @param  {class} permutationConfig Permutation of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    evaluateMaximizationCost(permutationConfig) {
        var price = 0;

        var permutation = permutationConfig.getArray();

        for(var i = 0; i < permutation.length - 1; i++)
        {
            if (this._distanceCache[permutation[i]][permutation[i+1]] === null) {
                // count to cache
                this._distanceCache[permutation[i]][permutation[i+1]] = this.countEuclideanDistance(this._cities[permutation[i]], this._cities[permutation[i+1]]);
                this._distanceCache[permutation[i+1]][permutation[i]] = this._distanceCache[permutation[i]][permutation[i+1]];
            }
            price -= this._distanceCache[permutation[i]][permutation[i+1]];
        }
        if (this._distanceCache[permutation[permutation.length - 1]][permutation[0]] == null) {
            // count to cache
            this._distanceCache[permutation[permutation.length - 1]][permutation[0]] = this.countEuclideanDistance(this._cities[permutation[permutation.length - 1]], this._cities[permutation[0]]);
            this._distanceCache[permutation[0]][permutation[permutation.length - 1]] = this._distanceCache[permutation[permutation.length - 1]][permutation[0]]
        }
        price -= this._distanceCache[permutation[permutation.length - 1]][permutation[0]];
        return price;
    }

    countEuclideanDistance(coord1, coord2){
        return Math.sqrt(Math.pow((coord1.x - coord2.x), 2) + Math.pow((coord1.y - coord2.y), 2));
    }

    transformMaximizationToRealCost(maxCost) {
        return -maxCost;
    }

    /**
     * Returns random, or sorted starting from 0, configuration of traveling salesman problem(Permutation configuration)
     * @param  {bool} random random or sorted staring with 0
     * @return {Permutation}  new Permutation class
     */
    getConfiguration(random) {
        return new Permutation({
            size: this._noCities,
            random: random
        });
    }

    /**
     *
     * @param  {class} permutationConfig permutation of which path we want to build
     * @return {String}
     */
    getResult(permutationConfig) {
        return permutationConfig.getArray();
    }

    getType() {
        return ProblemTypeEnum.PERMUTATION;
    }

    resolveInstanceParams(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        return {
            noCities: +instanceContent[0],
        }
    }

    /**
     * Returns instance invalidity
     * @param  {string} instanceContent content of the instance
     * @return {boolean} is instance invalid
     */
    isInvalidInstance(instanceContent) {
        var dataSet = instanceContent.split('\n');
        if(isNaN(dataSet[0].split(/\s+/)[0])) return { text: "First parameter must be a number."};
        var noCities = + dataSet[0].split(/\s+/)[0];

        if((instanceContent.length - 1) < noCities) return { text: "Invalid number of lines."};

        for (var i = 0; i < noCities; i++) {
            var coords = dataSet[1+i].split(/\s+/);
            if((coords.length) < 2) return { text: "Invalid number of coordinates on line."};
            if(isNaN(coords[0]) || isNaN(coords[1])) return { text: "Coordinate must be a number."};
        }
        return false; // valid instance
    }
}
