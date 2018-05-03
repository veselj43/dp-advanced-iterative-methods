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

        <h4>Generator</h4>
        <p>
            The generator is based on the type of travelling salesman problem you choose.
        </p>
        <p>
            The parameter should be self -describing.
            Only thing that may be tricky is that all edges are undirected.
            That means that the actual number of edges is twice the number.
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
* is there only for "Shortest" type
        </pre>
    </div>
</template>
