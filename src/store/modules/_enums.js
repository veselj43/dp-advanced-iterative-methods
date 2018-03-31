
export const methods = [
    {
        id: 'annealing',
        text: "Simulated Annealing"
    }, {
        id: 'genetic',
        text: "Genetic Algorithm"
    }, {
        id: 'tabu',
        text: "Tabu Search"
    }
];

export const problems = [
    {
        id: 0,
        text: "SAT"
    }, {
        id: 1,
        text: "Travelling Salesman"
    }, {
        id: 2,
        text: "Knapsack"
    }, {
        id: 3,
        text: "Minimal vertex cover"
    }
];

export const methodParamsTitles = {
    annealing: {
        start_temp: "Starting temperature",
        cool_coef: "Cooling coefficient",
        min_temp: "Minimal temperature",
        innerCycle: "Inner cycle"
    },
    genetic: {
        populationSize: "Population size",
        noGenerations: "Number of generations",
        selectionType: "Selection type",
        tournamentSize: "Tournament size",
        scaleMin: "Min scale",
        scaleMax: "Max scale",
        crossoverProb: "Crossover probability",
        crossoverType: "Crossover type",
        mutationRate: "Mutation rate",
        elitism: "Elitism"
    },
    tabu: {
        iterationLimit: "Iteration limit",
        tabuSize: "State tabu size",
        tabuSizeShort: "Changes tabu size"
    }
}

export const problemParamsTitles = {
    0: {
        noVariables: "Variables",
        noClausules: "Clausules"
    },
    1: {
        noNodes: "Nodes",
        noEdges: "Edges",
        noNodesToVisit: "Nodes to visit",
        maxPrice: "Maximal price"
    },
    2: {
        capacity: "Capacity",
        noItems: "Items",
        sumOfWeights: "Sum of weights",
        maxValue: "Max value",
        granularity: "Granularity"
    },
    3: {
        size : "Size",
        noEdges : "Edges"
    }
}

const getters = {
    methodEnum() {
        return methods;
    },
    problemEnum() {
        return problems;
    },
    methodParamsTitles() {
        return methodParamsTitles;
    },
    problemParamsTitles() {
        return problemParamsTitles;
    }
}

export default {
    getters
}
