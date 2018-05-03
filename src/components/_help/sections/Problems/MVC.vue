<template>
    <div>
        <a href="#MVC"></a>
        <h3>Minimum vertex cover</h3>
        <p>
            A minimum vertex cover is a vertex cover having the smallest possible number of vertices for a given graph.
        </p>
        <p>
            Vertex cover is a set fo vertices such that each edge of the graph is incident to at least one vertex of the set.
        </p>

        <h4>Price function</h4>
        <p>
            Price function is the number of vertices in the selected set. 
            If not all edges are covered the function instead returns -number of not covered edges.
        </p>

        <p>
            So at the start the algorithm tries to minimize the amount of not covered edges, and then minimize the amount of selected vertices.
        </p>

        <h4>Generator</h4>
        <p>
            The generator is pretty simple. Allowing to choose number of vertices and edges.
        </p>

        <h4>Instance format</h4>
        <pre>
[number of nodes/vertices]
[number of edges]
[grapf as an 2D array, space separators, index is vertex, 0 means no edge, 1 means there is an edge]
        </pre>
    </div>
</template>
