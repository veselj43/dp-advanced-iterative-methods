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
    },
    files: {
        selected: 0,
        files: []
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
    getInputData (state, getters) {
        return {
            method: state.params.method.id,
            problem: state.params.problem.id,
            instance: getters.getSelectedFile.name,
            params: state.params.methodParams[state.params.method.id]
        }
    },
    getSelectedFile (state) {
        if (state.files.files.length === 0) {
            return {};
        }
        return state.files.files[state.files.selected];
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
    },
    addFiles (state, filesArray) {
        for (var i = 0, file; file = filesArray[i]; i++) {
            state.files.files.push(file);
        }
    },
    selectFile (state, index) {
        state.files.selected = index;
    },
    removeFile (state, index) {
        state.files.files.splice(index, 1);
        if (state.files.selected > index || index === state.files.files.length) state.files.selected--;
        if (state.files.selected < 0) state.files.selected = 0;
    },
    removeAllFiles (state) {
        state.files.files = [];
        state.files.selected = 0;
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
