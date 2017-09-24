export default class Result {
    constructor(result, fitness, counter) {
        this.result = result;
        this.fitness = fitness;
        this.counter = counter;
    }

    setProcessTime(time) {
        this.processTime = Math.round( time * 100 + Number.EPSILON ) / 100;
    }
}
