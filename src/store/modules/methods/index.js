import tabu from './tabu'

const methodEnum = [
    {
        id: 'Annealing',
        text: "Simulované ochlazování"
    }, {
        id: 'Genetic',
        text: "Genetický algoritmus"
    }, {
        id: 'Tabu',
        text: "Tabu prohledávání"
    }
];

// initial state
const state = {
    selected: methodEnum[0]
}

// getters
const getters = {
    methodEnum: state => {
        return methodEnum;
    }
}

// mutations
const mutations = {
    selectMethod (state, index) {
        if (methodEnum[index]) {
            state.selected = methodEnum[index];
        }
    }
}

// actions
const actions = {}

// modules
const modules = {
    tabu
}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
