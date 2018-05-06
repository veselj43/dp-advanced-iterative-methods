<template>
    <div>
        <h2>Genetic algorithm</h2>

        <p>
            The genetic algorithm is a method for solving both constrained and unconstrained optimization problems that is based on natural selection, the process that drives biological evolution.
            The genetic algorithm repeatedly modifies a population of individual solutions.
            At each step, the genetic algorithm selects individuals at random from the current population to be parents and uses them to produce the children for the next generation.
            Over successive generations, the population "evolves" toward an optimal solution.
            You can apply the genetic algorithm to solve a variety of optimization problems that are not well suited for standard optimization algorithms, including problems in which the objective function is discontinuous, nondifferentiable, stochastic, or highly nonlinear.
        </p>
        <a href="#basic"></a>
        <h3>GA cycle</h3>
        <p>
            This GA starts with <b>population</b> of given <b>size</b>.
            Then computes given <b>number of generations</b> and stops and returns best found solution.
        </p>
        <ol>
            <li>In selection phase potential parents are selected by desired <b>selection type</b>. Number of potential parents is same as population size without elite individuals.</li>
            <li>Each potential parent decides if he goes into crossover based on <b>crossover probability</b>.</li>
            <li>Then parent waits for its mate. If mate is found two parents produce two offspring based on <b>crossover type</b>.</li>
            <li>If no mate is found or individual didn't go into crossover individual is just copied to new generation.</li>
            <li>All individuals in new generation goes into mutation where <b>mutation rate</b> defines how much are they going to be changed.</li>
            <li><b>Elite individuals</b> from old generation are added to new generation without mutation. So the new generation is of same size as the old one.</li>
        </ol>
        <a href="#selection"></a>
        <h3>Selection</h3>
        <a href="#tournament"></a>
        <h4>Tournament</h4>
        <ul>
            <li>Randomly choose several (<em>k</em>) individuals and take the best one.</li>
            <li>Repeat, until the whole new population is generated.</li>
            <li>The selection pressure can be freely adjusted by setting <em>k</em>. If <em>k</em> is high, weak individuals have a smaller chance to be selected for reproduction.</li>
        </ul>
        <p><b>Tournament size</b> defines how many individuals compete in single tournament. If number isn't integer sizes of tournaments varies based on decimal part.
            Example: For tournament size 2.75 there is 25 % tournaments of size 2 and 75 % tournaments of size 3.</p>
        <a href="#roulette"></a>
        <h4>Roulette wheel</h4>
        <ul>
            <li>The better the individuals are, the higher chance to be selected they have.</li>
            <li>Roulette wheel – all individuals in the population are placed on the wheel.</li>
            <li>The size of the sections in the roulette wheel is proportional to values of the fitness function of every individual - the bigger the value is, the larger the section is.</li>
        </ul>
        <a href="#ranking"></a>
        <h4>Ranking</h4>
        <p>
            GA uses rank instead of fitness.
            Individuals are sorted by fitness.
            Each individual gets rank according to this order.
            Best individual gets highest rank.
            This implementation uses ranking in combination with linear scaling.
        </p>
        <a href="#scaling"></a>
        <h4>Linear scaling</h4>
        <p>
            Linear scaling fits the fitness values into a defined range using this formula: <em>f' = scale_min + (f - f_min) &times; ((scale_max - scale_min) &divide; (f_max - f_min))</em>.
            Where <em>f</em> is old value, <em>f'</em> is new value, <em>f_min</em> is minimal fitness, <em>f_max</em> is maximal fitness, <em>scale_min</em> is desired minimum and <em>scale_max</em> is desired maximum.
            New fitness is linearly proportional to the original one.
        </p>

        <h3>Crossover</h3>
        <a href="#bincross"></a>
        <h4>Binary crossover</h4>
        <h5>One-point</h5>
        <p>
            Individuals are split at one point and recombined.
        </p>
        <img src="static/images/cross_one_before.png" alt="One-point crossover before" width="40%">
        <img src="static/images/cross_one_after.png" alt="One-point crossover after" width="40%">

        <h5>Two-point</h5>
        <p>Individuals are split at two points and recombined.</p>
        <img src="static/images/cross_two_before.png" alt="Two-point crossover before" width="40%">
        <img src="static/images/cross_two_after.png" alt="Two-point crossover after" width="40%">

        <h5>Uniform-point</h5>
        <p>
            Each bit of parent goes into first or second offspring with equal probability.
            We use random binary vector to indicate which genes are going to be swapped (1 in vector).
        </p>
        <img src="static/images/cross_uniform_before.png" alt="Uniform crossover before" width="40%">
        <img src="static/images/cross_uniform_after.png" alt="Uniform crossover after" width="40%">

        <a href="#permcross"></a>
        <h4>Permutation crossover</h4>
        <h5>Order</h5>
        <p>
            Individual is copied to random point then it starts copying values from second parent if possible to preserve permutation.
        </p>
        <img src="static/images/cross_order_before.png" alt="Order crossover before" width="30%">
        <img src="static/images/cross_order_inter.png" alt="Order crossover in progress" width="35%">
        <img src="static/images/cross_order_after.png" alt="Order crossover after" width="30%">

        <h5>Partially matched</h5>
        <p>
            Two random points designates section where values on corresponding positions are swapped.
        </p>
        <img src="static/images/cross_pmx_before.png" alt="Partially matched crossover before" width="40%">
        <img src="static/images/cross_pmx_map.png" alt="Partially matched crossover map" width="15%">
        <img src="static/images/cross_pmx_after0.png" alt="Partially matched crossover after" width="40%">

        <h5>Cycle</h5>
        <p>
            Cycle starts at random point in first parent.
            Next position of cycle is where gene has same value as value at corresponding position in other parent.
            Continue until the cycle is closed. Leave the cycle how it is and swap all other values between 2 parents.
        </p>
        <img src="static/images/cross_cycle_before.png" alt="Cycle crossover before" width="40%">
        <img src="static/images/cross_cycle_after0.png" alt="Cycle crossover after" width="40%">
        <a href="#mutation"></a>
        <h3>Mutation</h3>
        <b>Mutation rate</b> specifies probability that mutation is performed. Algorithm checks this probability for each position in genotype.
        <h4>Binary mutation</h4>
        Mutated gene is inverted.
        <h4>Permutation mutation</h4>
        Mutated gene is swapped with another one.
    </div>
</template>
