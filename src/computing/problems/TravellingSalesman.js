import { Permutation } from "./configurationTypes/Permutation";
import { Problem, ProblemTypeEnum } from './Problem'

export class TravellingSalesman extends Problem {
    /**
     * Constructor, construct the class from the data file selected.
     * Calculates n:n distance between nodes using Floyd-Warshall algorithm
     * @param {string} data instance of a problem coded as string
     */
    constructor(data) {
        super();
        data = data.split(/\s+/);

        this._noNodes = +data[0];
        this._noEdges = +data[1];
        this._noNodesToVisit = +data[2];
        this._maxPrice = +data[3];
        this._nodesToVisit = [];

        for(var i = 0; i < this._noNodesToVisit; i++)
        {
            this._nodesToVisit.push(+data[4 + i]);
        }

        this._distanceArray = new Array(this._noNodes);
        this._pathArray = new Array(this._noNodes);

        for(var i = 0; i < this._noNodes; i++)
        {
            this._distanceArray[i] = new Array(this._noNodes);
            this._pathArray[i] = new Array(this._noNodes);
        }
        // initializing arrays, distance array to -inf if no edge, and path array to null if no edge
        for(var i = 0; i < this._noNodes; i++)
        {
            for(var j = 0; j < this._noNodes; j++)
            {
                if(+data[4 + this._noNodesToVisit + i * this._noNodes + j] !== 0 || i === j) {
                    this._distanceArray[i][j] = +data[4 + this._noNodesToVisit + i * this._noNodes + j];
                    this._pathArray[i][j] = j;
                }
                else {
                    this._distanceArray[i][j] = Number.MAX_SAFE_INTEGER;
                    this._pathArray[i][j] = null;
                }
            }
        }

        this._floydWarshall();
    }

    /**
     * Floyd warshall algorithm to calculate n:n distances between nodes(vertexes), saves it to _distanceArray, _pathArray for path reconstruction
     * @return {null}
     */
    _floydWarshall() {
        for(var i = 0; i < this._noNodes; i ++)
        {
            for(var j = 0; j < this._noNodes; j ++)
            {
                for(var k = 0; k < this._noNodes; k ++)
                {
                    if(this._distanceArray[j][k] > this._distanceArray[j][i] + this._distanceArray[i][k]) {
                        this._distanceArray[j][k] = this._distanceArray[j][i] + this._distanceArray[i][k];
                        this._pathArray[j][k] = this._pathArray[j][i];
                    }
                }
            }
        }
    }

    /**
     * Binds the permutaion from Permutation configuration, to the actual nodes to visit
     * @param  {[type]} permutationConfig [description]
     * @return {[type]}                   [description]
     */
    _bindToNodes(permutationConfig) {
        var myPermutation = permutationConfig.map(x=>x);

        for(var i = 0; i < this._noNodesToVisit; i++)
        {
            myPermutation[i] = this._nodesToVisit[myPermutation[i]];
        }

        return myPermutation;
    }
    /**
     * Rebuild the current path using _pathArray
     * @param  {class} permutationConfig Permutation of which path we are building
     * @return {String} return the rebuilded path
     */
    rebuildPath(permutationConfig) {
        var permutation = this._bindToNodes(permutationConfig);
        var path = [permutation[0]];

        for(var i = 1; i < permutation.length; i++)
        {
            while(permutation[i-1] != permutation[i])
            {
                permutation[i-1] = this._pathArray[permutation[i-1]][permutation[i]];
                path.push(permutation[i-1]);
            }
        }
        path.push(path[0]);

        return path;
    }

    /**
     * Returns fitness of selected configuration(Permutation)
     * @param  {class} permutationConfig Permutation of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */
    getFitness(permutationConfig) {
        var price = 0;
        var permutation = this._bindToNodes(permutationConfig.getArray());

        for(var i = 0; i < permutation.length - 1; i++)
        {
            price -= this._distanceArray[permutation[i]][permutation[i+1]];
        }

        price -= this._distanceArray[permutation[permutation.length - 1]][permutation[0]];

        return price;
    }

    /**
     * Return price function value that will be displayed in graph
     * @param  {class} bitArrayConfig config for which we want the value for the graph
     * @return {int}  the returned value
     */
    getProblemCost(bitArrayConfig){
      return -this.getFitness(bitArrayConfig);
    }

    /**
     * Returns random, or sorted starting from 0, configuration of traveling salesman problem(Permutation configuration)
     * @param  {bool} random random or sorted staring with 0
     * @return {class}  new BitArray class
     */
    getConfiguration(random) {
        return new Permutation({
            size: this._noNodesToVisit,
            random: random
        });
    }

    /**
     * Returns the actual path of the configuration, the real config is only the permutation of nodes that has to be visited, not the path
     * @param  {class} permutationConfig permutation of which path we want to build
     * @return {String} the actual path as string
     */
    getResult(permutationConfig) {
        return this.rebuildPath(permutationConfig.getArray());
    }

    /**
     * Returns what type of configuration is this problem using
     * @return {enum} type of the problem(configuration type)
     */
    getType() {
        return ProblemTypeEnum.PERMUTATION;
    }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    resolveInstanceParams(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        return {
            noNodes: +instanceContent[0],
            noEdges: +instanceContent[1],
            noNodesToVisit: +instanceContent[2],
            maxPrice: +instanceContent[3]
        }
    }
}
