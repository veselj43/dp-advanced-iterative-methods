<template>
    <div>
        <h2>Tabu Search algorithm for this application</h2>
        <a href="#concepts"></a>
        <h3>Concepts</h3>
        <h4>Neighbor and neighborhood</h4>
        <p>
            <strong>Neighbor</strong> definition depends on problem configuration type.
        </p>
        <p>
            There are two types of configurations in this application:
        </p>

        <bit-array></bit-array>
        
        <permutation></permutation>

        <p>
            <strong>Neighborhood</strong> is set of all neighbors from a given problem configuration.
        </p>

        <h4>Aspiration criteria</h4>
        <p>
            If cost of a tabu state is greater than the best cost yet found, consider the state as if it wasn't tabu.
        </p>

        <a href="#input"></a>
        <h3>Input parameters</h3>
        <h4>Iteration limit</h4>
        <p>
            Sets how many iterations will the algorithm go through.
        </p>

        <h4>Neighbor states to check</h4>
        <p>
            How big part of the neighborhood will be checked in one iteration.
        </p>

        <h4>State tabu size</h4>
        <p>
            How many previous states are considered as tabu.
        </p>

        <h4>Change tabu size</h4>
        <p>
            How many previous state modifications are considered as tabu.
        </p>

        <h4>Starting configuration</h4>
        <p>
            There are two options: Default and Random.
            And again, there are two configuration types.
        </p>

        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="panel-title">Default</span>
            </div>
            <div class="panel-body">
                <ul>
                    <li>Always return the same configuration for selected problem instance</li>
                    <li>Should simulate constructive approach</li>
                    <li>
                        Implementation for <strong>Bit array</strong>
                        <ul>
                            <li>Return array with all bits set to 0 (false).</li>
                        </ul>
                    </li>
                    <li>
                        Implementation for <strong>Permutation</strong>
                        <ul>
                            <li>Return array with element identifiers in the same order as definition of elements in the instance.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="panel-title">Random</span>
            </div>
            <div class="panel-body">
                <ul>
                    <li>Generate random state</li>
                    <li>
                        Implementation for <strong>Bit array</strong>
                        <ul>
                            <li>Return array with all bits set to random value (0 or 1).</li>
                        </ul>
                    </li>
                    <li>
                        Implementation for <strong>Permutation</strong>
                        <ul>
                            <li>Return array with element identifiers randomly shuffled.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BitArray from "./Configurations/BitArray";
import Permutation from "./Configurations/Permutation";

export default {
    components: {
        BitArray,
        Permutation,
    }
}
</script>
