import * as enums from './enums'

// initial state
const state = {
    params: {
        method: enums.methods[2],
        problem: enums.problems[0],
        methodParams: {
            annealing: {
                param1: 1,
                param2: 1
            },
            genetic: {
                param1: 1,
                param2: 1
            },
            tabu: {
                multiplierLimit: 2,
                multiplierTabuSize: 1,
                tabuSize2: 4
            }
        }
    }
}

// getters
const getters = {
    methodEnum () {
        return enums.methods;
    },
    problemEnum () {
        return enums.problems;
    },
    getInputData (state) {
        return {
            method: state.params.method.id,
            problem: state.params.problem.id,
            // instance: 'TODO get name',
            params: state.params.methodParams[state.params.method.id]
        }
    }
}

// mutations
const mutations = {
    selectMethod (state, index) {
        if (enums.methods[index]) {
            state.params.method = enums.methods[index];
        }
    },
    selectProblem (state, index) {
        if (enums.problems[index]) {
            state.params.problem = enums.problems[index];
        }
    },
    updateParams (state, payload) {
        state.params.methodParams[payload.id] = payload.data;
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
