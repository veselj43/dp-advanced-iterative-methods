import { storage, storageKeys } from '@/services/localStorage'
import * as enums from './_enums'
import { SelectionEnum } from '@/computing/methods/genetic/Selection';
import { CrossoverEnum } from '@/computing/methods/genetic/Crossover';

// initial state
const initState = {
    params: {
        method: enums.methods[storage.get(storageKeys.method) || 0],
        problem: enums.problems[storage.get(storageKeys.problem) || 0],
        methodParams: {
            annealing: {
                start_temp: 10,
                cool_coef: 0.995,
                min_temp: 1,
                innerCycle: 50
            },
            genetic: {
                populationSize: 20,
                noGenerations: 100,
                selectionType: SelectionEnum.ROULETTE_LINEAR,
                tournamentSize: 2.5,
                scaleMin: 1,
                scaleMax: 3,
                crossoverProb: 0.8,
                crossoverType: CrossoverEnum.ONE_POINT,
                mutationRate: 0.08,
                elitism: 1
            },
            tabu: {
                iterationLimit: 200,
                tabuSize: 5,
                tabuSizeShort: 2
            }
        },
        isValid: {
            annealing: true,
            genetic: true,
            tabu: true
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
    selectedMethodId(state) {
        return state.params.method.id;
    },
    selectedProblemId(state) {
        return state.params.problem.id;
    },
    getIsValidParams (state) {
        return state.params.isValid[state.params.method.id];
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
            storage.set(storageKeys.method, index);
        }
    },
    selectProblem (state, index) {
        if (enums.problems[index]) {
            state.params.problem = enums.problems[index];
            storage.set(storageKeys.problem, index);
        }
    },
    updateParams (state, payload) {
        state.params.methodParams[payload.id] = payload.data;
    },
    updateParamsValidation (state, payload) {
        state.params.isValid[state.params.method.id] = payload.data;
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
            state.files.selected.id = state.files.instances[0]._id;
            state.files.selected.index = 0;
            return;
        }
        if (state.files.selected.index >= state.files.instances.length || state.files.selected.id < state.files.instances[state.files.selected.index]._id) {
            state.files.selected.index--;
            if (state.files.selected.index < 0) state.files.selected.index = 0;
        }

        state.files.selected.id = state.files.instances[state.files.selected.index]._id;
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
