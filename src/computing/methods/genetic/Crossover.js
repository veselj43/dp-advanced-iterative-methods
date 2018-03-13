import {getRandomBoolean, getRandomInt} from "./Random";
import {BinaryIndividual} from "./Individual";

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
