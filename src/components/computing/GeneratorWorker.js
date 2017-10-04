
class Job {
    constructor(params) {
        this.params = params;
    }

    run() {
        return "0,1,2,3,4,5,6";
    }
}

// msg recieved event
onmessage = function(e) {
    var job = new Job(e.data[0]);
    var result = job.run();

    postMessage(["result", result]);
}
