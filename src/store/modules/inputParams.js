import * as enums from './_enums'

// initial state
const initState = {
    params: {
        method: enums.methods[2],
        problem: enums.problems[0],
        methodParams: {
            annealing: {
                start_temp: 100,
                cool_coef: 0.995,
                min_temp: 10,
                equil: 50
            },
            genetic: {
                crossoverType: 1,
                elitism: 0.65,
                mutationRate: 0.08,
                noGenerations: 100,
                noIndividuals: 10,
                selectionType: 1
            },
            tabu: {
                multiplierLimit: 2,
                multiplierTabuSize: 1,
                tabuSize2: 4
            }
        }
    },
    files: {
        selected: {
            id: -1,
            index: -1
        },
        instances: []
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
            params: state.params.methodParams[state.params.method.id]
        };
    },
    getSelectedFile (state) {
        if (state.files.instances.length === 0) {
            return {};
        }
        return state.files.instances[state.files.selected.index];
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
    selectInstance (state, selected) {
        state.files.selected.id = selected.id;
        state.files.selected.index = selected.index;
    },
    updateInstances (state, data) {
        state.files.instances = data;

        if (state.files.instances.length === 0) {
            state.files.selected = initState.files.selected;
            return;
        }
        if (state.files.selected.id === -1) {
            state.files.selected.id = state.files.instances[0].id;
            state.files.selected.index = 0;
            return;
        }
        if (state.files.selected.index >= state.files.instances.length || state.files.selected.id < state.files.instances[state.files.selected.index].id) {
            state.files.selected.index--;
            if (state.files.selected.index < 0) state.files.selected.index = 0;
        }

        state.files.selected.id = state.files.instances[state.files.selected.index].id;
    }
}

// actions
const actions = {
    selectMethod ({ state, commit, dispatch }, index) {
        commit('selectMethod', index);
        dispatch('loadComputingHistory');
    },
    selectProblem ({ state, commit, dispatch }, index) {
        commit('selectProblem', index);
        dispatch('loadInstances');
        dispatch('loadComputingHistory');
    }
}

// modules
const modules = {}

export default {
    state: initState,
    getters,
    mutations,
    actions,
    modules
}
