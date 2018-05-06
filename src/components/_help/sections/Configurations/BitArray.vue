<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <span class="panel-title">Bit array</span>
        </div>
        <div class="panel-body">
            <ul>
                <li>Represented as boolean array</li>
                <li>
                    Implementation of <code>getNeighbour</code> method
                    <ol>
                        <li>Method parameter defines array <code>index</code> so that 0 &le; <code>index</code> &lt; <code>array.length</code></li>
                        <li>Flip the bit on position <code>index</code> (<code>array[index] = !array[index]</code>)</li>
                        <li>Return the new configuration</li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
</template>
