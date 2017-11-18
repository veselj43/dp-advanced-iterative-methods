
const stateName = {
    running: "In progress",
    stopped: "Stopped",
    done: "Done",
    error: "Error"
}

// initial state
const state = {
    computingStatus: {
        isRunning: false,
        text: "Ready",
        file: {},
        bestResult: null
    },
    data: {
        actual: 0,
        best: 0,
        chart: {
            labels: [],
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
    }
}

// mutations
const mutations = {
    setStatusRunning(store, fileObj) {
        store.data = state.data;
        store.computingStatus.file = fileObj;
        store.computingStatus.isRunning = true;
        store.computingStatus.text = stateName.running;
    },
    setStatusStopped(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.isRunning = false;
        store.computingStatus.text = stateName.stopped;
        return file;
    },
    setStatusDone(store, result) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.isRunning = false;
        store.computingStatus.text = stateName.done;
        store.computingStatus.bestResult = result;
        return file;
    },
    setStatusError(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.isRunning = false;
        store.computingStatus.text = stateName.error;
        return file;
    },

    dataInit(store, data) {
        store.computingStatus.bestResult = null;
        store.data.chart.labels = _.range(data.numberOfIterations + 1);
        store.data.chart.values = [];
        store.data.best = 0;
        store.data.actual = 0;
    },
    dataProgress(store, data) {
        store.data.actual = data.fitness;
        store.data.chart.values.push(store.data.actual);
        store.data.best = Math.max(store.data.best, store.data.actual);
    }
}

// actions
const actions = {}

// modules
const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
