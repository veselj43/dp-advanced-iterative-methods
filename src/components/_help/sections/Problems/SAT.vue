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

        <h4>Configuration</h4>
        SAT uses bit array configuration. It says which variables / literals are true and which are false.

        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="panel-title">Bit array</span>
            </div>
            <div class="panel-body">
                <ul>
                    <li>Represented as boolean array</li>
                    <li>
                        Implementation of <code>getNeighbor</code> method
                        <ol>
                            <li>Method parameter defines array <code>index</code> so that 0 &le; <code>index</code> &lt; <code>array.length</code></li>
                            <li>Flip the bit on position <code>index</code> (<code>array[index] = !array[index]</code>)</li>
                            <li>Return the new configuration</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>

        So the neighbour is interpretation with one variable changed to false or true.

        <h4>Generator</h4>
        <p>
            The generator for SAT is pretty simple to use without any tricky parameters.
        </p>
        <p>
            We are not generating 3SAT so every clauses can consist of random number of literals/variables.
            But being completely random would cause the instances to be too easy, so the average number of literals should be much lower than number of variables.
        </p>

        <div class="alert alert-danger">
	         <i class="fas fa-info-circle"></i>
            Problem is generating number of clauses which is close to maximum number of clauses that is |n^3| - 1.
            Because the generating is random so the algorithm has to "hit" the last missing clauses.
        </div>

        <h4>Instance format</h4>
        <p>
            Format used for the instances is the same as in MI-PAA, which is <a href="http://www.cs.ubc.ca/~hoos/SATLIB/benchm.html">DIMACS CNF</a>, so you should have no problem solving instances from MI-PAA.
        </p>
    </div>
</template>
