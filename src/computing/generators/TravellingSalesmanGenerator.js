/**
 * Class for generating travelling salesman problem instances
 * @type {class}
 */
export default class TravellingSalesmanGenerator {
    /**
     * Class constructor
     * @param {object} params parameters of the generated instance
     */
    constructor(params) {
        this.params = params;
        this.params.noNodes = +this.params.noNodes;
        this.params.noEdges = +this.params.noEdges;
        this.params.noNodesToVisit = +this.params.noNodesToVisit;
        this.params.maxPrice = +this.params.maxPrice;
        this.generatedGraph = new Array(this.params.noNodes);
    }

    /**
     * Generate instance based on parameters
     * @return {String} instance of travelling salesman problem coded as String
     */
    generate() {
        for(var i = 0; i < this.params.noNodes; i++)
        {
            this.generatedGraph[i] = new Array(this.params.noNodes);
            this.generatedGraph[i].fill(0);
        }

        if(this.params.type === "Hamiltonian") {
          this.params.noEdges = (this.params.noNodes * (this.params.noNodes - 1)) / 2;
          this.params.noNodesToVisit = this.params.noNodes;
        }

        //generate instance from array
        var generatedInstance = this.params.type + "\n" + this.params.noNodes + "\n" + this.params.noEdges + "\n" + this.params.noNodesToVisit + "\n" + this.params.maxPrice + "\n";

        if(this.params.type === "Hamiltonian") generatedInstance += this._hamiltonianPath();
        else generatedInstance += this._shortestPath();

        for(var i = 0; i < this.params.noNodes; i++)
        {
            for(var j = 0; j < this.params.noNodes; j++)
            {
                generatedInstance += this.generatedGraph[i][j] + " ";
            }
            generatedInstance += "\n";
        }


        return generatedInstance;
    }

    /**
     * Generate array for Hamiltonian type of Travelling Salesman problem
     * @return {string} empty string, because all nodes are visited
     */
    _hamiltonianPath(){
      for(var i = 0; i < this.params.noNodes; i++)
      {
          for(var j = i + 1; j < this.params.noNodes; j++)
          {
                  this.generatedGraph[i][j] = Math.round(Math.random() * (this.params.maxPrice - 1)) + 1;
                  this.generatedGraph[j][i] = this.generatedGraph[i][j];
          }
      }
      return "";
    }
    /**
     * Generate array for shortest type of Travelling Salesman problem
     * @return {string} nodes to visit
     */
    _shortestPath(){
      var toConnect = [];
      var toVisit = [];

      var numberToConnect = 0;
      var lastConnected = Math.round(Math.random() * (this.params.noNodes - 1));

      var numberOfCreatedEdges = this.params.noNodes - 1;

      //visiting all nodes
      if(this.params.noNodesToVisit === this.params.noNodes) {
          for(var i = 0; i < this.params.noNodes; i++)
          {
              toVisit.push(i);
          }
      }

      for(var i = 0; i < this.params.noNodes; i++){
        toConnect.push(i);
      }
      //making the graph connected. choosing nodes to visit
      toConnect.splice(toConnect.indexOf(lastConnected), 1);
      for(i = 0; i < this.params.noNodes - 1; i++)
      {
          numberToConnect = Math.round(Math.random() * (this.params.noNodes - i - 2));
          //adding nodes to visit randomly
          if(toVisit.length < this.params.noNodesToVisit) {
              toVisit.push(lastConnected);
          }
          this.generatedGraph[lastConnected][toConnect[numberToConnect]] = Math.round(Math.random() * (this.params.maxPrice - 1)) + 1;
          this.generatedGraph[toConnect[numberToConnect]][lastConnected] = this.generatedGraph[lastConnected][toConnect[numberToConnect]];
          lastConnected = toConnect[numberToConnect];
          toConnect.splice(numberToConnect, 1);
      }
      // generating the desired amount of edges
      while(this.params.noEdges !== numberOfCreatedEdges)
      {
          for(var i = 0; i < this.params.noNodes; i++)
          {
              for(var j = i + 1; j < this.params.noNodes; j++)
              {
                  if(this.generatedGraph[i][j] === 0 && Math.round(Math.random()) && numberOfCreatedEdges < this.params.noEdges){
                      this.generatedGraph[i][j] = Math.round(Math.random() * (this.params.maxPrice - 1)) + 1;
                      this.generatedGraph[j][i] = this.generatedGraph[i][j];
                      numberOfCreatedEdges++;
                      break;
                  }
              }
          }
      }

      toVisit.sort(function(a, b) {
          return +a > +b;
      });

      var toReturn = "";

      for(var i = 0; i < this.params.noNodesToVisit; i++)
      {
          toReturn += toVisit[i] + " ";
      }

      return toReturn + "\n";
    }
}
