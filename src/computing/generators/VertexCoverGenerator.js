/**
 * Class for generating minimal vertex cover problem instances
 * @type {class}
 */
export default class VertexCoverGenerator {
    /**
     * Class constructor
     * @param {object} params parameters of the generated instance
     */
    constructor (params) {
      this.params = params;
      this.params.size = +this.params.size;
      this.params.noEdges = +this.params.noEdges;
    }

    /**
     * Generate instance based on parameters
     * @return {String} instance of minimal vertex cover problem coded as String
     */
    generate() {
        var generatedInstance = this.params.size + "\n" + this.params.noEdges + "\n";
        var noEdges = 0;

        var array = new Array(this.params.size);
        for(var i = 0; i < this.params.size; i++)
        {
            array[i] = new Array(this.params.size).fill(0);
            array[i][i] = 0;
        }

        while(noEdges !== this.params.noEdges)
        {
            for(var i = 0; i < this.params.size; i ++)
            {
                for(var j = i + 1; j < this.params.size; j++)
                {
                    if(Math.random() < (1/this.params.size) && noEdges !== this.params.noEdges && !array[i][j]){
                      array[i][j] = 1;
                      array[j][i] = 1;
                      noEdges++;
                    }
                }
            }
        }


        for(var i = 0; i < this.params.size; i ++)
        {
            for(var j = 0; j < this.params.size; j++)
            {
                generatedInstance += array[i][j] + " ";
            }
            generatedInstance += "\n";
        }
        return generatedInstance;
    }
}
