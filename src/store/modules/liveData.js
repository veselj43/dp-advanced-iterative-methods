
const stateName = {
    ready: "Ready",
    running: "In progress",
    processingResults: "Processing results",
    stopped: "Stopped",
    done: "Done",
    error: "Error"
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
    dataProgress(store, data) {
        store.data.chart.values.push(store.data.fitness);
        store.data.best = Math.max(store.data.best, store.data.fitness);
    },
    dataProgressBuffered(store, data) {
        if (data.length === 0) return;
        var fitnessBuffer = data.map(x => x.fitness);
        store.data.chart.values.push(...fitnessBuffer);
        store.data.best = Math.max(store.data.best, ...fitnessBuffer);
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
