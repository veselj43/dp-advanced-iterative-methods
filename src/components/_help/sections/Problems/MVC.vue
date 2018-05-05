<template>
    <div>
        <a href="#MVC"></a>
        <h3>Minimum vertex cover</h3>
        <p>
            A minimum vertex cover is a vertex cover having the smallest possible number of vertices for a given graph.
        </p>
        <p>
            Vertex cover is a set of vertices such that each edge of the graph is incident to at least one vertex of the set.
        </p>
        <div class="alert alert-info">
	         <i class="fas fa-info-circle"></i>
          Edges are undirected.
        </div>

        <h4>Price function</h4>
        <p>
            Price function is the number of not selected vertices in the set.
            If not all edges are covered the function instead returns - the number of not covered edges.
        </p>

        <p>In the graph you see number of selected vertices if it is a vertex cover. If not it shows number of vertices + number of not covered edges.</p>

        <p>
            So at the start the algorithm tries to minimize the amount of not covered edges, and then minimize the amount of selected vertices.
        </p>

        <h4>Configuration</h4>
        Minimum vertex cover uses bit array configuration. The config says which vertices are chosen.

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

        So the neighbour is set of vertices with one vertex added or removed from the parent set.

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
