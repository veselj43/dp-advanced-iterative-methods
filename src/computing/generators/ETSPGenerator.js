/**
 * Class for generating euclidean TSP instances
 * @type {class}
 */
export default class ETSPGenerator {
    /**
     * Class constructor
     * @param {object} params parameters of the generated instance
     */
    constructor (params) {
        this.params = params;
        this.params.noCities= +this.params.noCities;
        this.params.x = +this.params.x;
        this.params.y = +this.params.y;
    }

    /**
     * Generate instance based on parameters
     * @return {String} instance of euclidean TSP coded as String
     */
    generate () {
        var generatedInstance = "" +  this.params.noCities + '\n';

        for (var i = 0; i < this.params.noCities; i++) {
            generatedInstance += Math.random()*this.params.x + " ";
            generatedInstance += Math.random()*this.params.y + '\n';
        }
        return generatedInstance;
    }
}
