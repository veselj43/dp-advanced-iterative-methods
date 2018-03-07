/**
 * Class for generating minimal vertex cover problem instances
 * @type {class}
 */
export class VertexCoverGenerator {
    /**
     * Class constructor
     * @param {object} params parameters of the generated instance
     */
    constructor (params) {
      this.params = params;
    }

    /**
     * Generate instance based on parameters
     * @return {String} instance of minimal vertex cover problem coded as String
     */
    generate() {
        var generatedInstance = this.params.size + "\n";

        var array = new Array(this.params.size);
        for(var i = 0; i < this.params.size; i++)
        {
            array[i] = new Array(this.params.size);
            array[i][i] = 1;
        }

        for(var i = 0; i < this.params.size; i ++)
        {
            for(var j = i + 1; j < this.params.size; j++)
            {
                array[i][j] = Math.round(Math.random());
                array[j][i] = array[i][j];
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
        console.log(generatedInstance);
        return generatedInstance;
    }
}
