export default class Result {
    constructor(result, fitness) {
        this.result = result;
        this.fitness = fitness;
    }

    setProcessTime(time) {
        this.processTime = Math.round( time * 100 + Number.EPSILON ) / 100;
    }
}
