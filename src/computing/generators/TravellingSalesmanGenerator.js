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
    }

    /**
     * Generate instance based on parameters
     * @return {String} instance of travelling salesman problem coded as String
     */
    generate() {
        var generatedGraph = new Array(this.params.noNodes);
        var toConnect = new Array(this.params.noNodes).fill(0);
        var toVisit = [];

        var noOfNotConnected = 0;
        var numberToConnect = 0;
        var lastConnected = Math.round(Math.random() * (this.params.noNodes - 1));

        var numberOfCreatedEdges = this.params.noNodes - 1;

        for(var i = 0; i < this.params.noNodes; i++)
        {
            generatedGraph[i] = new Array(this.params.noNodes);
            generatedGraph[i].fill(0);
        }

        //visiting all nodes
        if(this.params.noNodesToVisit === this.params.noNodes) {
            for(var i = 0; i < this.params.noNodes; i++)
            {
                toVisit.push(i);
            }
        }

        //making the graph connected. choosing nodes to visit
        toConnect[lastConnected] = 1;
        for(i = 0; i < this.params.noNodes - 1; i++)
        {
            numberToConnect = Math.round(Math.random() * (this.params.noNodes - i - 2)) + 1;
            noOfNotConnected = 0;
            for(var j = 0; j < this.params.noNodes; j++)
            {
                if(toConnect[j] === 0) noOfNotConnected++;
                if(noOfNotConnected === numberToConnect) {
                    //adding nodes to visit randomly
                    if(toVisit.length < this.params.noNodesToVisit) {
                        toVisit.push(lastConnected);
                    }
                    toConnect[j] = 1;
                    generatedGraph[lastConnected][j] = Math.round(Math.random() * (this.params.maxPrice - 1)) + 1;
                    generatedGraph[j][lastConnected] = generatedGraph[lastConnected][j];
                    lastConnected = j;
                    break;
                }
            }
        }

        // generating the desired amount of edges
        while(this.params.noEdges !== numberOfCreatedEdges)
        {
            for(var i = 0; i < this.params.noNodes; i++)
            {
                for(var j = i + 1; j < this.params.noNodes; j++)
                {
                    if(generatedGraph[i][j] === 0 && Math.round(Math.random()) && numberOfCreatedEdges < this.params.noEdges){
                        generatedGraph[i][j] = Math.round(Math.random() * this.params.maxPrice - 1) + 1;
                        generatedGraph[j][i] = generatedGraph[i][j];
                        numberOfCreatedEdges++;
                    }
                }
            }
        }

        toVisit.sort(function(a, b) {
            return +a > +b;
        });

        //generate instance from array
        var generatedInstance = this.params.noNodes + "\n" + this.params.noEdges + "\n" + this.params.noNodesToVisit + "\n" + this.params.maxPrice + "\n";

        for(var i = 0; i < this.params.noNodesToVisit; i++)
        {
            generatedInstance += toVisit[i] + " ";
        }

        generatedInstance += "\n";

        for(var i = 0; i < this.params.noNodes; i++)
        {
            for(var j = 0; j < this.params.noNodes; j++)
            {
                generatedInstance += generatedGraph[i][j] + " ";
            }
            generatedInstance += "\n";
        }
        return generatedInstance;
    }
}
