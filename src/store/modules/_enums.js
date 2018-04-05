
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
        text: "SAT",
        info: {
            goal: "max",
            description: "Maximize number of satisfied clauses"
        }
    }, {
        id: 1,
        text: "Travelling Salesman",
        info: {
            goal: "min",
            description: "Minimize path cost"
        }
    }, {
        id: 2,
        text: "Knapsack",
        info: {
            goal: "max",
            description: "Maximize knapsack cost"
        }
    }, {
        id: 3,
        text: "Minimal vertex cover",
        info: {
            goal: "min",
            description: "Minimize number of vertices"
        }
    }
];

export const problemExampleInstances = {
    0: 'uf20-01.cnf',
    1: 'ts20-30',
    2: 'knap200-20',
    3: 'mvc20-20',
};

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
