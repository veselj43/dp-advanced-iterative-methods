
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
        text: "MAX-SAT",
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
        text: "Minimum vertex cover",
        info: {
            goal: "min",
            description: "Minimize number of vertices"
        }
    },
    {
        id: 4,
        text: "Euclidean TSP",
        info: {
            goal: "min",
            description: "Minimize path cost"
        }
    }
];

export const problemExampleInstances = {
    0: {
        file: 'uf20-01.cnf',
        name: 'MAX-SAT_Example'
    },
    1: {
        file: 'ts20-30',
        name: 'TSP_Example'
    },
    2: {
        file: 'knap200-20',
        name: 'KNAP_Example'
    },
    3: {
        file: 'mvc20-20',
        name: 'MVC_Example'
    },
    4: {
        file: 'eucTSP10',
        name: 'ETSP_Example'
    },
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
        neighborsToCheck: "Checked neighborhood (%)",
        tabuSize: "State tabu size",
        tabuSizeShort: "Changes tabu size",
        randomStart: "Random start"
    }
}

export const problemParamsTitles = {
    0: {
        noVariables: "Variables",
        noClauses: "Clauses",
        noLiterals: "Average number of literals in clauses"
    },
    1: {
        type: "Type",
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
    },
    4: {
        noCities: "Number of cities",
        x: "X range",
        y: "Y range"
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
