<template>
    <div>
        <a href="#SAT"></a>
        <h3>SAT</h3>
        <p>
            Sat problem is basically finding an interpretation of variables that satisfies Boolean formula.
            In our interpretation its about finding interpretation that satisfies as much clauses as possible.
            The given boolean formula is inputed in CNF format.
        </p>

        <h4>Price function</h4>
        <p>
            Price function is the number of satisfied clauses for the given configuration.
        </p>

        <h4>Generator</h4>
        <p>
            The generator for SAT is pretty simple to use without any tricky parameters.
        </p>
        <p>
            Only problem is generating number of clauses which is close to maximum number of clauses that is |n^3| - 1.
            Because the generating is random so the algorithm has to "hit" the last missing clauses.
        </p>
        <p>
            We are not generating 3SAT so every clauses can consist of random number of literals/variables.
            But being completely random would cause the instances to be too easy, so the number of literals is 5 on average.
            So if the problem has low number of variables it can still be pretty easy so take that in mind when generating instances.
        </p>

        <h4>Instance format</h4>
        <p>
            Format used for the instances is the same as in MI-PAA, which is <a href="http://www.cs.ubc.ca/~hoos/SATLIB/benchm.html">DIMACS CNF</a>, so you should have no problem solving instances from MI-PAA.
        </p>
    </div>
</template>
