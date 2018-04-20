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

        this._type = data[0];
        this._noNodes = +data[1];
        this._noEdges = +data[2];
        this._noNodesToVisit = +data[3];
        this._maxPrice = +data[4];
        this._nodesToVisit = [];

        data.splice(0, 5);

        if(this._type === "Shortest") {
          for(var i = 0; i < this._noNodesToVisit; i++)
          {
              this._nodesToVisit.push(+data[i]);
          }

          data.splice(0, this._noNodesToVisit);
        }

        this._distanceArray = new Array(this._noNodes);
        this._pathArray = new Array(this._noNodes);

        for(var i = 0; i < this._noNodes; i++)
        {
            this._distanceArray[i] = new Array(this._noNodes);
            this._pathArray[i] = new Array(this._noNodes);
        }

        // initializing arrays, distance array to inf if no edge, and path array to null if no edge
        for(var i = 0; i < this._noNodes; i++)
        {
            for(var j = 0; j < this._noNodes; j++)
            {
                if(+data[i * this._noNodes + j] !== 0 || i === j) {
                    this._distanceArray[i][j] = +data[i * this._noNodes + j];
                    this._pathArray[i][j] = j;
                }
                else {
                    this._distanceArray[i][j] = Number.MAX_SAFE_INTEGER;
                    this._pathArray[i][j] = null;
                }
            }
        }
        var start, end;
        // if shortest calculate shortest path using floyd warshall
        if(this._type === "Shortest") {
          if(this._noNodes !== this._noNodesToVisit) this._dijkstra();
          else this._floydWarshall();
        }
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
     * Dijkstra algorithm to caculate path from nodes to visit to all other nodes
     * @return {[type]} [description]
     */
    _dijkstra() {
      var distanceArray = [];
      var pathArray = [];
      var nodes = [];
      var shortest;
      var chosenNode;

      const distances = this._distanceArray;
      // for all nodes
      for(var i = 0; i < this._noNodesToVisit; i++)
      {
        //initialization
        for(var j = 0; j < this._noNodes; j++)
        {
          distanceArray[j] = Number.MAX_SAFE_INTEGER;
          pathArray[j] = null;
          nodes.push(j);
        }

        distanceArray[this._nodesToVisit[i]] = 0;
        //while there are unvisited nodes
        while(nodes.length > 0)
        {
          shortest = Number.MAX_SAFE_INTEGER;
          for(var j = 0; j < nodes.length; j++)
          {
            if(distanceArray[nodes[j]] < shortest) {
              shortest = distanceArray[nodes[j]];
              chosenNode = nodes[j];
            }
          }
          //remove node with shortest path
          nodes.splice(nodes.indexOf(chosenNode), 1);
          // update shortest path and array for path rebuilding
          for(var j = 0; j < this._noNodes; j++)
          {
            if(shortest + distances[chosenNode][j] < distanceArray[j]) {
              distanceArray[j] = shortest + distances[chosenNode][j];
              pathArray[j] = chosenNode;
            }
          }
        }
        pathArray[this._nodesToVisit[i]] = this._nodesToVisit[i];

        // rebuild all paths and update _pathArray and _distanceArray arrays
        var currentNode;
        for(var k = 0; k < pathArray.length; k++)
        {
          currentNode = k;
          while(pathArray[currentNode] !== this._nodesToVisit[i])
          {
            this._pathArray[pathArray[currentNode]][k] = currentNode;
            currentNode = pathArray[currentNode];
          }
          this._pathArray[this._nodesToVisit[i]][k] = currentNode;
          this._distanceArray[this._nodesToVisit[i]][k] = distanceArray[k];
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
    evaluateMaximizationCost(permutationConfig) {
        var price = 0;
        var permutation = permutationConfig.getArray();

        if(this._type === "Shortest") permutation = this._bindToNodes(permutation);

        for(var i = 0; i < permutation.length - 1; i++)
        {
            price -= this._distanceArray[permutation[i]][permutation[i+1]];
        }

        price -= this._distanceArray[permutation[permutation.length - 1]][permutation[0]];

        return price;
    }

    transformMaximizationToRealCost(maxCost) {
        return -maxCost;
    }

    // /**
    //  * Return price function value that will be displayed in graph
    //  * @param  {class} bitArrayConfig config for which we want the value for the graph
    //  * @return {int}  the returned value
    //  */
    // getProblemCost(bitArrayConfig){
    //   return -this.getFitness(bitArrayConfig);
    // }

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
        if(this._type === "Hamiltonian") return permutationConfig.getArray();

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
     * Returns instance invalidity
     * @param  {string} instanceContent content of the instance
     * @return {boolean} is instance invalid
     */
    static isInvalidInstance(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        var type = instanceContent[0];

        if(type !== "Hamiltonian" && type !== "Shortest")
        return { text: "TSP type not specified"};

        var noNodes = +instanceContent[1];
        var noEdges = +instanceContent[2];
        var noNodesToVisit = +instanceContent[3];
        var maxValue = +instanceContent[4];

        instanceContent.splice(0, 1);

        for(var i = 0; i < instanceContent.length; i++){
          if(isNaN(instanceContent[i])) return { text: "Most contain only numbers"};
          if(+instanceContent[i] < 0) return { text: "Can not contain negative numbers"};
        }

        if(noNodesToVisit > noNodes) return { text: "Number of nodes to visit cant be higher than number of nodes"};
        if(noEdges > (noNodes * (noNodes - 1)) / 2) return { text: "Number of edges cant be higher than (number of nodes * (number of nodes - 1)) / 2 becasue graph is not oriented."}
        instanceContent.splice(0, 4);

        if(type === "Hamiltonian") {
          if((instanceContent.length - 1) !== noNodes * noNodes) return { text: "Invalid array"};
          if(noNodes !== noNodesToVisit) return { text: "Number of nodes must be equal to number of nodes to visit for Hamiltonian type"};
          if(noEdges !== (noNodes * (noNodes - 1)) / 2) return { text: "Number of edges must be equal to (number of nodes * (number of nodes - 1)) / 2"};

          for(var i = 0; i < noNodes * noNodes; i++)
          {
              if(i % (noNodes + 1) !== 0 && +instanceContent[i] === 0) return { text: "Graph must be complete"};
          }
        }
        else {
          var array = new Array(noNodes);
          var numberOfEdges = 0;

          if(noEdges < noNodes - 1) return { text: "Number of edges must be atleast number of nodes - 1"};

          for(var i = 0; i < noNodesToVisit; i++)
          {
            if(+instanceContent[i] > (noNodes - 1)) return { text: "Node you want to visit doesnt exist: \"" +instanceContent[i] + "\". Must be lower than number of nodes - 1"};
          }

          for(var i = 1; i < noNodesToVisit; i++)
          {
            if(+instanceContent[i-1] > +instanceContent[i]) return { text: "Nodes to visit must be sorted in ascending order"};
            if(+instanceContent[i-1] === +instanceContent[i]) return { text: "Nodes to visit cant contaion duplicates"};
          }

          if((instanceContent.length - 1) !== (noNodes * noNodes) + noNodesToVisit) return { text: "Invalid array size, or nodes to visit size"};

          instanceContent.splice(0, noNodesToVisit);

          for(var i = 0; i < noNodes; i++)
          {
              array[i] = new Array(noNodes);
          }

          for(var i = 0; i < noNodes; i++)
          {
            for(var j = 0; j < noNodes; j++)
            {
              array[i][j] = +instanceContent[i * noNodes + j];
              if(array[i][j]) numberOfEdges++;
            }
          }
          if(numberOfEdges / 2 !== noEdges) return { text: "Number of edges is not correct"};
          if(!TravellingSalesman._isGraphStronglyConnected(array)) return { text: "Graph must be strongly connected"};
        }

        for(var i = 0; i < noNodes * noNodes; i++)
        {
            if(+instanceContent[i] > maxValue) return { text: "Edge weight cant exceed maximum edge weight"};
            if(i % (noNodes + 1) === 0 && +instanceContent[i] !== 0) return { text: "Diagonal must contain only 0"};
        }

        return false; // valid instance
    }

    /**
     * Check if graph is connected
     * @param  {Array}  array graph as an 2D array
     * @return {Boolean}  true if connected, false if not
     */
    static _isGraphStronglyConnected(array){
      var connected = [];
      var opened = [];

      connected.push(0);
      opened.push(0);
      //while there are open vertices to check
      while(opened.length > 0)
      {
          for(var k = 0; k < array.length; k++){
            //if theres an edge, and the vertice wasnt visited yet
            if(array[opened[0]][k] && !connected.includes(k)) {
              connected.push(k);
              opened.push(k);
              if(array[opened[0]][k] !== array[k][opened[0]]) return false;
            }
          }
          // if all vertices are visited the graph is connected
          if(connected.length === array.length) return true;
          //remove last visited vertice
          opened.shift();
        }
          return false;
      }

    /**
     * Returns parameters of the instance
     * @param  {string} instanceContent content of the instance
     * @return {object} instance parameters
     */
    static resolveInstanceParams(instanceContent) {
        instanceContent = instanceContent.split(/\s+/);

        return {
            type: instanceContent[0],
            noNodes: +instanceContent[1],
            noEdges: +instanceContent[2],
            noNodesToVisit: +instanceContent[3],
            maxPrice: +instanceContent[4]
        }
    }
}
