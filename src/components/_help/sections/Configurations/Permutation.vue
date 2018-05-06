<template>
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
</template>
