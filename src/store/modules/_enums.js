
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
        equil: "Equilibrium"
    },
    genetic: {
        crossoverType: "Crossover type",
        elitism: "Elitism",
        mutationRate: "Mutation rate",
        noGenerations: "Number of generations",
        noIndividuals: "Number of individuals",
        selectionType: "Selection type"
    },
    tabu: {
        iterationLimit: "Iteration limit",
        tabuSize: "State tabu size",
        tabuSizeShort: "Changes tabu size"
    }
}
