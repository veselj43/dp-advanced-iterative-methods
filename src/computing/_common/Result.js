/**
 * Class for storing the result of calculation
 */
export default class Result {
    constructor(config, cost, counter) {
        this.config = config;
        this.cost = cost;
        this.counter = counter;
    }

    setProcessTime(time) {
        this.processTime = Math.round( time * 100 + Number.EPSILON ) / 100;
    }
}
