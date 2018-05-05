import { storage, storageKeys, storageUtils } from '@/services/localStorage'
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
                populationSize: 50,
                noGenerations: 100,
                selectionType: SelectionEnum.ROULETTE_LINEAR,
                tournamentSize: 1.75,
                scaleMin: 1,
                scaleMax: 3,
                crossoverProb: 0.9,
                crossoverType: CrossoverEnum.ONE_POINT,
                mutationRate: 0.01,
                elitism: 1
            },
            tabu: {
                iterationLimit: 300,
                neighborsToCheck: 100,
                tabuSize: 75,
                tabuSizeShort: 3,
                randomStart: false
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
    getIsValidParams(state) {
        return state.params.isValid[state.params.method.id];
    },
    getInputData(state) {
        return {
            method: state.params.method.id,
            problem: state.params.problem.id,
            params: state.params.methodParams[state.params.method.id]
        };
    },
    getSelectedFile(state) {
        if (state.files.instances.length === 0) {
            return {};
        }
        return state.files.instances[state.files.selected.index];
    },
    getMethodParams: (state) => (methodId) => {
        return {...state.params.methodParams[methodId]};
    }
}

// mutations
const mutations = {
    selectMethod(state, index) {
        if (enums.methods[index]) {
            state.params.method = enums.methods[index];
            storage.set(storageKeys.method, index);
        }
    },
    selectProblem(state, index) {
        if (enums.problems[index]) {
            state.params.problem = enums.problems[index];
            storage.set(storageKeys.problem, index);
        }
    },
    updateParams(state, payload) {
        state.params.methodParams[payload.id] = {...payload.data};
    },
    updateParamsValidation(state, payload) {
        state.params.isValid[payload.id] = payload.data;
    },
    selectInstance(state, {index}) {
        state.files.selected.index = index;
        state.files.selected.id = state.files.instances[index]._id;
        storage.set(storageUtils.getSelectedFileKeyByProblem(), index);
    },
    updateInstances (state, {instances, problemChange}) {
        state.files.instances = instances;

        let instanceIndex = +storage.get(storageUtils.getSelectedFileKeyByProblem()) || 0;

        if (problemChange) {
            if (state.files.instances[instanceIndex]) {
                state.files.selected.index = instanceIndex;
                state.files.selected.id = state.files.instances[instanceIndex]._id;
                return;
            }
            else if (state.files.instances.length > 0) {
                instanceIndex = 0;
                state.files.selected.index = instanceIndex;
                state.files.selected.id = state.files.instances[instanceIndex]._id;
            }
            else {
                state.files.selected = initState.files.selected;
            }
            return;
        }

        if (state.files.instances.length === 0) {
            state.files.selected = initState.files.selected;
            return;
        }
        if (state.files.selected.id === -1) {
            instanceIndex = 0;
            state.files.selected.id = state.files.instances[instanceIndex]._id;
            state.files.selected.index = instanceIndex;
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
        dispatch('loadInstances', {problemChange: true});
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
