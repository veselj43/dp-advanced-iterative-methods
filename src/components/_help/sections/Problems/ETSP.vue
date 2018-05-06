<template>
    <div>
        <a href="#ETSP"></a>
        <h3>Euclidean travelling salesman problem</h3>
        <p>
            Variant of travelling salesman problem.
            Distances between cities aren't given explicitly but they are computed as Euclidean distance from coordinates of cities.
            Application supports just 2 coordinates.
        </p>
        <p>
            Given <em>n</em> points in <em>R^2</em>, the problem is to find the minimum length tour of the n points starting and ending in the same point.
            The distance between any two points <em>x</em> and <em>y</em> is defined to be the Euclidean distance between them, i.e., <em>&radic;<span style="border-top: 1px solid #000000">(x_1 - y_1)*(x_1 - y_1) + (x_2 - y_2)*(x_2 - y_2)</span></em>.
        </p>

        <h4>Price function</h4>
        <p>
            Price function is the length of the cycle/sequence.
        </p>

        <h4>Configuration</h4>
        ETSP uses permutation configuration. It represents the order of visiting cities.

        <permutation></permutation>

        So the neighbour is permutation where the order of two cities was swapped.

        <h4>Generator</h4>
        <p>
            Generator generates coordinates uniformly from 0 to given non-negative range.
        </p>

        <h4>Instance format</h4>
        <pre>
[number of cities]
{[x coordinate] [y coordinate]}^number of cities
        </pre>
        <div class="alert alert-info alert-with-icon">
            <i class="fas fa-info-circle"></i>
            <div class="alert-content">
                After reading expected number of arguments on each line, the rest of the line will be ignored
            </div>
        </div>
    </div>
</template>

<script>
import Permutation from "../Configurations/Permutation";

export default {
    components: {
        Permutation,
    }
}
</script>