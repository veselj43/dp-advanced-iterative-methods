<template>
    <div>
        <a href="#SAT"></a>
        <h3>MAX-SAT</h3>
        <p>
            Sat problem is basically finding an interpretation of variables that satisfies Boolean formula.
            In our interpretation its about finding interpretation that satisfies as much clauses as possible.
            The given boolean formula is inputted in CNF format.
        </p>

        <h4>Price function</h4>
        <p>
            Price function is the number of satisfied clauses for the given configuration.
        </p>

        <h4>Configuration</h4>
        SAT uses bit array configuration. It says which variables / literals are true and which are false.

        <bit-array></bit-array>

        So the neighbour is interpretation with one variable changed to false or true.

        <a href="#SATgenerator"></a>
        <h4>Generator</h4>
        <p>
            The generator for SAT is pretty simple to use without any tricky parameters.
        </p>
        <p>
            We are not generating 3SAT so every clauses can consist of random number of literals/variables.
            But being completely random would cause the instances to be too easy, so the average number of literals should be much lower than number of variables.
        </p>

        <div class="alert alert-danger alert-with-icon">
            <i class="fas fa-info-circle"></i>
            <div class="alert-content">
                Problem is generating number of clauses which is close to maximum number of clauses that is |n^3| - 1.
                Because the generating is random so the algorithm has to "hit" the last missing clauses.
            </div>
        </div>

        <h4>Instance format</h4>
        <p>
            Format used for the instances is the same as in MI-PAA, which is <a href="http://www.cs.ubc.ca/~hoos/SATLIB/benchm.html">DIMACS CNF</a>, so you should have no problem solving instances from MI-PAA.
        </p>
    </div>
</template>

<script>
import BitArray from "../Configurations/BitArray";

export default {
    components: {
        BitArray,
    }
}
</script>
