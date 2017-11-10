
const stateName = {
    running: "In progress",
    stopped: "Stopped",
    done: "Done",
    error: "Error"
}

// initial state
const state = {
    // testing concept
    instances: [],
    computingHistory: [],

    computingStatus: {
        isRunning: false,
        file: null,
        text: "Ready",
        // liveChartData: {
        //     labels: [],
        //     values: []
        // }
    },

    // potential structure
    computationHistory: {
        tabu: []
    }
}

// getters
const getters = {
    getComputingStatus(store) {
        return store.computingStatus;
    },
    getComputingFile(store) {
        return store.computingStatus.file;
    }
}

// mutations
const mutations = {
    setStatusRunning(store, fileObj) {
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
    setStatusDone(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.isRunning = false;
        store.computingStatus.text = stateName.done;
        return file;
    },
    setStatusError(store) {
        var file = store.computingStatus.file;
        store.computingStatus.file = null;
        store.computingStatus.isRunning = false;
        store.computingStatus.text = stateName.error;
        return file;
    },
    updateComputingHistory(store, data) {
        store.computingHistory = data;
    },
    updateInstances(store, data) {
        store.instances = data;
    }
}

// actions
const actions = {
    pushResult({ dispatch }, data) {
        dispatch('pushComputingHistory', data);
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
