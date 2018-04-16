import { SAT } from '../computing/problems/SAT';
import { Knapsack } from '../computing/problems/Knapsack';
import { MinimalVertexCover } from '../computing/problems/MinimalVertexCover';
import { TravellingSalesman } from '../computing/problems/TravellingSalesman';

import { TabuSolver } from '../computing/methods/Tabu';
import { GeneticSolver } from '../computing/methods/genetic/Genetic';
import { AnnealingSolver } from '../computing/methods/Annealing';
import {EuclideanTSP} from "../computing/problems/EuclideanTSP";

export function getProblemClassFromId(id) {
    if (id === 0) return SAT;
    else if (id === 1) return TravellingSalesman;
    else if (id === 2) return Knapsack;
    else if (id === 3) return MinimalVertexCover;
    else if (id === 4) return EuclideanTSP;

    return null;
}

export function getMethodClassFromId(id) {
    if (id === 'tabu') return TabuSolver;
    else if (id === 'genetic') return GeneticSolver;
    else if (id === 'annealing') return AnnealingSolver;

    return null;
}
