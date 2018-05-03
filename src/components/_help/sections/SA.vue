<template>
    <div>
        <h2>SA</h2>

        <p>
            Simulated Annealing (SA) is an effective and general form of optimization.

            It is useful in finding global optima in the presence of large numbers of local optima.

            “Annealing” refers to an analogy with thermodynamics, specifically with the way that metals cool and anneal. 
            Simulated annealing uses the objective function of an optimization problem instead of the energy of a material.
        </p>
        <p>
            Implementation of SA is surprisingly simple. 
            The algorithm is basically hill-climbing except instead of picking the best move, it picks a random move. 
            If the selected move improves the solution, then it is always accepted. 
            Otherwise, the algorithm makes the move anyway with some probability less than 1. 
            The probability decreases exponentially with the “badness” of the move, which is the amount deltaE by which the solution is worsened (i.e., energy is increased.)
        </p>
        <p>
            Prob(accepting uphill move) ~ 1 - exp(deltaE / kT))
        </p>
        <p>
            A parameter T is also used to determine this probability.
            It is analogous to temperature in an annealing system.
            At higher values of T, uphill moves are more likely to occur.
            As T tends to zero, they become more and more unlikely, until the algorithm behaves more or less like hill-climbing.
            In a typical SA optimization, T starts high and is gradually decreased according to an “annealing schedule”.
            The parameter k is some constant that relates temperature to energy (in nature it is Boltzmann’s constant.)
        </p>
        <p>
            Simulated annealing is typically used in discrete, but very large, configuration spaces, such as the set of possible orders of cities in the Traveling Salesman problem and in VLSI routing.
            It has a broad range of application that is still being explored.
        </p>

        <h3>Calculating starting temperature</h3>
        <p>
            Starting temperature is calculated from random set of transfers in the state space.
            The temperature is set so that the amount of accepted states is equal to 50 %.
        </p>
        <p>
            Because the set of transfers is random, the temperature may differ for each calculation.
        </p>
        <p>
            More about the exact method can be found in work Computing the Initial Temperature of Simulated Annealing by Ben Ameur
        </p>
    </div>
</template>
