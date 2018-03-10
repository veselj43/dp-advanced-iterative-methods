
const stateName = {
    ready: "Ready",
    running: "In progress",
    processingResults: "Processing results",
    stopped: "Stopped",
    done: "Done",
    error: "Error"
}

const dataProgressBufferedMapping = {
    annealing: {
        transform(data) {
            return data;
        },
        getBest(actualBest, transformedData) {
            return Math.max(actualBest, ...transformedData);
        }
    },
    genetic: {
        transform(data) {
            return data;
        },
        getBest(actualBest, transformedData) {
            return Math.max(actualBest, ...transformedData);
        }
    },
    tabu: {
        transform(data) {
            return data.map(x => x.fitness);
        },
        getBest(actualBest, transformedData) {
            return Math.max(actualBest, ...transformedData);
        }
    }
}

// initial state
const state = {
    computingStatus: {
        text: stateName.ready,
        file: {},
        bestResult: null
    },
    data: {
        best: 0,
        chart: {
            noValues: 0,
            values: []
        }
    }
}

// getters
const getters = {
    getComputingStatus(store) {
        return store.computingStatus;
    },
    getComputingFile(store) {
        return store.computingStatus.file;
    },
    getChartValues(store) {
        return store.data.chart.values;
    },
    computingIsRunning(store) {
        return store.computingStatus.text === stateName.running;
    },
    computingIsProcessingResults(store) {
        return store.computingStatus.text === stateName.processingResults;
    }
}

// mutations
const mutations = {
    setStatusRunning(store, fileObj) {
        store.data = state.data;
        store.computingStatus.file = fileObj;
        store.computingStatus.text = stateName.running;
    },
    setStatusProcessingResults(store, result) {
        store.computingStatus.text = stateName.processingResults;
        store.computingStatus.bestResult = result;
    },
    setStatusStopped(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.text = stateName.stopped;
        return file;
    },
    setStatusDone(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.text = stateName.done;
        return file;
    },
    setStatusError(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.text = stateName.error;
        return file;
    },

    dataInit(store, data) {
        store.computingStatus.bestResult = null;
        store.data.chart.noValues = Number(data.numberOfIterations) + 1;
        store.data.chart.values = [];
        store.data.best = 0;
    },
    dataProgressBuffered(store, argObject) {
        if (argObject.data.length === 0) return;
        var transformedBuffer = dataProgressBufferedMapping[argObject.methodId].transform(argObject.data);
        store.data.chart.values.push(...transformedBuffer);
        store.data.best = dataProgressBufferedMapping[argObject.methodId].getBest(store.data.best, transformedBuffer);
    },
}

// actions
const actions = {
    pushResult({ commit, dispatch }, data) {
        var x = dispatch('pushComputingHistory', data);
        x.then(function(res) {
            commit('setStatusDone');
        });
    }
}

// modules
const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
