<template>
    <div>
        <a href="#Knapsack"></a>
        <h3>Knapsack</h3>
        <p>
            Given a Knapsack of a maximum capacity of W and N items each with its own value and weight, throw in items inside the Knapsack such that the final contents has the maximum value.
        </p>
        <p>
            Here’s the general way the problem is explained – Consider a thief gets into a home to rob and he carries a knapsack.
            There are fixed number of items in the home – each with its own weight and value – Jewellery, with less weight and highest value vs tables, with less value but a lot heavy.
            To add fuel to the fire, the thief has an old knapsack which has limited capacity.
            Obviously, he can’t split the table into half or jewellery into 3/4ths.
            He either takes it or leaves it.
        </p>

        <h4>Price function</h4>
        <p>
            Price function for this problem is really easy.
            We just take the sum of values and sum of weights of all items in the knapsack.
            If the weight is lower or equal to capacity, the result is the sum of values.
            If not the result is - the amount that is above the capacity.
            Using this method, overweight knapsack is always worse than the correct one and thats what we want.
        </p>

        <h4>Configuration</h4>
        Knapsack uses bit array configuration. It says which items are in the knapsack.

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

        So the neighbour is knapsack with one thing removed or added.

        <h4>Generator</h4>
        <p>
            Most of the generator parameters should be easy to understand.
            The only complicated one is granularity.
        </p>
        <p>
            So granularity.
            Granularity is the way of saying if you want heavier of lighter things in the knapsack.
            For lighter choose value thats lower than one, for heavier value thats bigger than one.
        </p>
        <p>
            How exactly does it work? For every generated item the chance of this item being in the knapsack is based on its weight.
            If you want heavier things, the chance is <code>1 / (sumOfWeights - n) ^ granularity</code>.
            For lighter things its <code>1 / n ^ (-granularity)</code>.
        </p>
        <p>
            There are few problems with this, if the value is not chosen wisely.
            First problem is that for very high or very low values the calculation will take a lot of time because many items will get rejected.
            The second problem is that if the value is very high or very low, the generated weights will be basically the same, because only max weight or minimal weights have real chance to get in the knapsack.
            So what would happen is that the weights will be the same so not really more lighter or heavier things, beacuse compared to max weight or capacity they are all the same.
        </p>
        <p>
            <div class="alert alert-info">
  	           <i class="fas fa-info-circle"></i>
               So for the best results it is recommended to use numbers between -1 and 1.
            </div>
            Sum of weights is also important because it is the max value for generated weight so take that in account.
            The higher the number the closer to 0 should granularity be.

        </p>

        <h4>Instance format</h4>
        <p>
            Instance format is the same as in MI-PAA.
            Just remove the instance index (id) because our application is solving one instance a time, so the index is not needed.
        </p>
    </div>
</template>
