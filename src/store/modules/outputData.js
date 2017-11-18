
// initial state
const state = {
    computingHistory: [],
    comparingResults: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    updateComputingHistory(state, data) {
        state.computingHistory = data;
    },

    updateComparingResults(state, data) {
        // TODO
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
