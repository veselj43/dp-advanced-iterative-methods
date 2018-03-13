import {getRandomBoolean} from "./Random";
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
