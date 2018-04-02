import {getRandomBoolean, getRandomInt} from "./Random";
import { BinaryIndividual, PermutationIndividual } from './Individual'

export const CrossoverEnum = {
    UNIFORM: "Uniform",
    ONE_POINT: "One-point",
    TWO_POINT: "Two-point",
    ORDER: "Order",
    PMX: "Partially matched",
    CYCLE: "Cycle",
}

//binary crossovers
export class UniformCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getBitArray();
        const parSeq2 = parent2.getBitArray();
        for (var i = 0; i < size; i++) {
            if (getRandomBoolean()) {
                offSeq1.push(parSeq1[i]);
                offSeq2.push(parSeq2[i]);
            } else {
                offSeq1.push(parSeq2[i]);
                offSeq2.push(parSeq1[i]);
            }
        }
        return [new BinaryIndividual(offSeq1), new BinaryIndividual(offSeq2)];
    }
}

export class TwoPointCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var first = getRandomInt(0, size);
        var second = getRandomInt(0, size);
        if (first > second) {
            var temp = first;
            first = second;
            second = temp;
        }
        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getBitArray();
        const parSeq2 = parent2.getBitArray();
        for (var i = 0; i < size; i++) {
            if (i < first || i > second) {
                offSeq1.push(parSeq1[i]);
                offSeq2.push(parSeq2[i]);
            } else {
                offSeq1.push(parSeq2[i]);
                offSeq2.push(parSeq1[i]);
            }
        }
        return [new BinaryIndividual(offSeq1), new BinaryIndividual(offSeq2)];
    }
}

export class OnePointCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var point = getRandomInt(0, size);
        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getBitArray();
        const parSeq2 = parent2.getBitArray();
        for (var i = 0; i < size; i++) {
            if (i < point) {
                offSeq1.push(parSeq1[i]);
                offSeq2.push(parSeq2[i]);
            } else {
                offSeq1.push(parSeq2[i]);
                offSeq2.push(parSeq1[i]);
            }
        }
        return [new BinaryIndividual(offSeq1), new BinaryIndividual(offSeq2)];
    }
}

//permutation crossovers
export class OrderCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var point = getRandomInt(0, size);

        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getGenotype();
        const parSeq2 = parent2.getGenotype();

        var off1Used = new Array(size).fill(false);
        var off2Used = new Array(size).fill(false);
        for (var i = 0; i < point; i++) {
            //copy start
            off1Used[parSeq1[i]] = true;
            offSeq1.push(parSeq1[i]);
            off2Used[parSeq2[i]] = true;
            offSeq2.push(parSeq2[i]);
        }
        //fill the rest
        var i = 0;
        while (offSeq1.length < size) {
            if (!off1Used[parSeq2[i]]) {
                off1Used[parSeq2[i]] = true;
                offSeq1.push(parSeq2[i]);
            }
            i++;
        }
        var i = 0;
        while (offSeq2.length < size) {
            if (!off2Used[parSeq1[i]]) {
                off2Used[parSeq1[i]] = true;
                offSeq2.push(parSeq1[i]);
            }
            i++;
        }
        return [new PermutationIndividual(offSeq1), new PermutationIndividual(offSeq2)];
    }
}

//Partially matched crossover
export class PartiallyMatchedCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var first = getRandomInt(0, size);
        var second = getRandomInt(0, size);
        if (first > second) {
            var temp = first;
            first = second;
            second = temp;
        }
        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getGenotype();
        const parSeq2 = parent2.getGenotype();

        //create mapping
        var permMap = new Map();
        for (var i = first; i <= second; i++) {
            //skip if key is already there
            if (!permMap.has(parSeq1[i]) && !permMap.has(parSeq2[i])) {
                permMap.set(parSeq1[i], parSeq2[i]);
                permMap.set(parSeq2[i], parSeq1[i]);
            }
        }
        //create offspring
        for (var i = 0; i < size; i++) {
            if (permMap.has(parSeq1[i])) {
                offSeq1.push(permMap.get(parSeq1[i]));
            } else {
                offSeq1.push(parSeq1[i]);
            }
            if (permMap.has(parSeq2[i])) {
                offSeq2.push(permMap.get(parSeq2[i]));
            } else {
                offSeq2.push(parSeq2[i]);
            }
        }
        return [new PermutationIndividual(offSeq1), new PermutationIndividual(offSeq2)];
    }
}

export class CycleCrossover {
    crossover(parent1, parent2) {
        var size = parent1.getSize();
        var point = getRandomInt(0, size);

        var offSeq1 = [];
        var offSeq2 = [];
        const parSeq1 = parent1.getGenotype();
        const parSeq2 = parent2.getGenotype();

        var inCycle = new Array(size).fill(false);
        //create cycle
        while (!inCycle[point]) {
            inCycle[point] = true;
            var i = 0;
            for (; i < size; i++) {
                if (parSeq1[i] === parSeq2[point]) {
                    break;
                }
            }
            point = i;
        }

        for (var i = 0; i < size; i++) {
            //copy start
            if (inCycle[i]) {
                offSeq1.push(parSeq1[i]);
                offSeq2.push(parSeq2[i]);
            } else {
                offSeq1.push(parSeq1[i]);
                offSeq2.push(parSeq2[i]);
            }
        }
        return [new PermutationIndividual(offSeq1), new PermutationIndividual(offSeq2)];
    }
}
