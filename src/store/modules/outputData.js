
// initial state
const state = {
    // testing concept
    instances: [],
    computingHistory: [],

    // potential structure
    computationHistory: {
        tabu: []
    }
}

// getters
const getters = {
}

// mutations
const mutations = {
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
