
// initial state
const state = {
    computingHistory: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    updateComputingHistory(state, data) {
        state.computingHistory = data;
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
