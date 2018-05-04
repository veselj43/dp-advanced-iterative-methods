<template>
    <div>
        <a href="#TSP"></a>
        <h3>Travelling salesman</h3>
        <p>
            The travelling salesman problem (TSP) asks the following question: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?" It is an NP-hard problem in combinatorial optimization, important in operations research and theoretical computer science.
        </p>
        <p>
            So the problem is basically about finding the shortest hamiltonian cycle.
        </p>
        <p>
            In our application there are two types of this problem.
            One is finding the hamiltonian cycle so its called "Hamiltonian".
            The second is about finding the real shortest path so it allows to visit vertices multiple times.
            This type is called "Shortest" and it also allows to choose how many and which vertices in the given graph you want to visit.
            The second variant is harded for computing because of calculation of the shortest path using either Floyd-Warshall or Dijsktras algorithms.
        </p>

        <h4>Price function</h4>
        <p>
            Price function is the length of the cycle/sequence.
        </p>

        <h4>Configuration</h4>
        TSP uses permutation configuration. It represents the order of visiting cities.

        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="panel-title">Permutation</span>
            </div>
            <div class="panel-body">
                <ul>
                    <li>Represented as permutation of element identifiers stored in array</li>
                    <li>
                        Implementation of <code>getNeighbor</code> method
                        <ol>
                            <li>Method parameter defines two array indexes so that 0 &le; <code>index1</code>, <code>index2</code> &lt; <code>array.length</code></li>
                            <li>Flip the identifiers on defined array indexes (<code>swap(array[index1], array[index2])</code>)</li>
                            <li>Return the new configuration</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>

        So the neighbour is permutation where the order of two cities was swapped.

        <h4>Generator</h4>
        <p>
            The generator is based on the type of travelling salesman problem you choose.
        </p>
        <p>
            The parameter should be self -describing.
            Only thing that may be tricky is that all edges are undirected.
        </p>

        <h4>Instance format</h4>
        <pre>
[type]
[number of nodes/vertices]
[number of edges]
[number of nodes to visit]
[maximum weight of an edge]
*[list of nodes to visit in ascending order]
[grapf as an 2D array, space separators, index is vertex, value is the weight of and edge, 0 means no edge]
        </pre>
        <p>* is there only for "Shortest" type.</p>

        <p>For "Hamiltonian" type the number of edges is equal to (numberOfNodes * (numberOfNodes - 1)) / 2. And number of nodes to visit is equal to number of nodes.</p>
    </div>
</template>
