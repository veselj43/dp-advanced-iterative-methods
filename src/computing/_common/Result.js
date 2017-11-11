export default class Result {
    constructor(result, cost, counter) {
        this.result = result;
        this.cost = cost;
        this.counter = counter;
    }

    setProcessTime(time) {
        this.processTime = Math.round( time * 100 + Number.EPSILON ) / 100;
    }
}
