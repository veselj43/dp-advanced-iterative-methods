<template>
    <div class="help-body">
        <div class="help-panel-left">
            <ul class="nav nav-pills nav-stacked">
                <li>
                    <router-link to="/">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Back to application
                    </router-link>
                </li>
                <li>&nbsp;</li>
                <li>
                    <router-link to="#SA">SA</router-link>
                </li>
                <li>
                    <router-link to="#GA">GA</router-link>
                </li>
                <li>
                    <router-link to="#Tabu">Tabu</router-link>
                </li>
                <li>
                    <router-link to="#Problems">Problems
                      <li>
                          <router-link to="#Knapsack">Knapsack</router-link>
                      </li>
                      <li>
                          <router-link to="#SAT">SAT</router-link>
                      </li>
                      <li>
                          <router-link to="#TSP">Travelling salesman</router-link>
                      </li>
                        <li>
                        <router-link to="#ETSP">Euclidean travelling salesman</router-link>
                        </li>
                      <li>
                          <router-link to="#MVC">Minimal vertex cover</router-link>
                      </li>
                </router-link>
                </li>
            </ul>

        </div>

        <div class="page-content">
            <h1>Help page</h1>

                <p>On this page you can find some basic information about methods and problems including generators.</p>

            <a href="#SA"></a>
            <h2>SA</h2>
                <p>Simulated Annealing (SA) is an effective and general form of optimization.  It is useful in finding global optima in the presence of large numbers of local optima.  “Annealing” refers to an analogy with thermodynamics, specifically with the way that metals cool and anneal.  Simulated annealing uses the objective function of an optimization problem instead of the energy of a material.</p>

                <p>Implementation of SA is surprisingly simple.  The algorithm is basically hill-climbing except instead of picking the best move, it picks a random move.  If the selected move improves the solution, then it is always accepted.  Otherwise, the algorithm makes the move anyway with some probability less than 1.  The probability decreases exponentially with the “badness” of the move, which is the amount deltaE by which the solution is worsened (i.e., energy is increased.)</p>

                <p>Prob(accepting uphill move) ~ 1 - exp(deltaE / kT))</p>

                <p>A parameter T is also used to determine this probability.  It is analogous to temperature in an annealing system.  At higher values of T, uphill moves are more likely to occur.  As T tends to zero, they become more and more unlikely, until the algorithm behaves more or less like hill-climbing.  In a typical SA optimization, T starts high and is gradually decreased according to an “annealing schedule”.  The parameter k is some constant that relates temperature to energy (in nature it is Boltzmann’s constant.)</p>

                <p>Simulated annealing is typically used in discrete, but very large, configuration spaces, such as the set of possible orders of cities in the Traveling Salesman problem and in VLSI routing. It has a broad range of application that is still being explored. </p>

                <h3>Calculating starting temperature</h3>
                <p>Starting temperature is calculated from random set of transfers in the state space. The temperature is set so that the amount of accepted states is equal to 50 %.</p>

                <p>Because the set of transfers is random, the temperature may differ for each calculation.</p>

                <p>More about the exact method can be found in work Computing the Initial Temperature of Simulated Annealing by Ben Ameur</p>
            <a href="#GA"></a>
            <h2>Genetic algorithm</h2>
                <p>The genetic algorithm is a method for solving both constrained and unconstrained optimization problems that is based on natural selection, the process that drives biological evolution. The genetic algorithm repeatedly modifies a population of individual solutions. At each step, the genetic algorithm selects individuals at random from the current population to be parents and uses them to produce the children for the next generation. Over successive generations, the population "evolves" toward an optimal solution. You can apply the genetic algorithm to solve a variety of optimization problems that are not well suited for standard optimization algorithms, including problems in which the objective function is discontinuous, nondifferentiable, stochastic, or highly nonlinear.</p>
            <p>This GA starts with <b>population</b> of given <b>size</b>. Then computes given <b>number of generations</b> and stops and returns best found solution.</p>
                <ol>
                    <li>In selection phase potential parents are selected by desired <b>selection type</b>. Number of potential parents is same as population size without elite individuals.</li>
                    <li>Each potential parent decides if he goes into crossover based on <b>crossover probability</b>.</li>
                    <li>Then parent waits for its mate. If mate is found two parents produce two offspring based on <b>crossover type</b>.</li>
                    <li>If no mate is found or individual didn't go into crossover individual is just copied to new generation.</li>
                    <li>All individuals in new generation goes into mutation where <b>mutation rate</b> defines how much are they going to be changed.</li>
                    <li><b>Elite individuals</b> from old generation are added to new generation without mutation. So the new generation is of same size as the old one.</li>
                </ol>
            <h3>Selection</h3>
            <h4>Tournament</h4>
            <ul>
                <li>Randomly choose several (<em>k</em>) individuals and take the best one.</li>
                <li>Repeat, until the whole new population is generated.</li>
                <li>The selection pressure can be freely adjusted by setting <em>k</em>. If <em>k</em> is high, weak individuals have a smaller chance to be selected for reproduction.</li>
            </ul>
            <h4>Roulette wheel</h4>
            <ul>
                <li>The better the individuals are, the higher chance to be selected they have.</li>
                <li>Roulette wheel – all individuals in the population are placed on the wheel.</li>
                <li>The size of the sections in the roulette wheel is proportional to values of the fitness function of every individual - the bigger the value is, the larger the section is.</li>
            </ul>
            <h4>Ranking</h4>
            GA uses rank instead of fitness. Individuals are sorted by fitness. Each individual gets rank according to this order. Best individual gets highest rank. This implementation uses ranking in combination with linear scaling.

            <h4>Linear scaling</h4>
            <p>
            Linear scaling fits the fitness values into a defined range using this formula: <em>f' = scale_min + (f - f_min) &times; ((scale_max - scale_min) &divide; (f_max - f_min))</em>.
            Where <em>f</em> is old value, <em>f'</em> is new value, <em>f_min</em> is minimal fitness, <em>f_max</em> is maximal fitness, <em>scale_min</em> is desired minimum and <em>scale_max</em> is desired maximum.
            New fitness is linearly proportional to the original one.
            </p>
            <h3>Crossover</h3>
            <h4>Binary crossover</h4>
            <h5>One-point</h5>
            <p>Individuals are split at one point and recombined.</p>
            <img src="static/images/cross_one_before.png" alt="One-point crossover before" width="40%">
            <img src="static/images/cross_one_after.png" alt="One-point crossover after" width="40%">
            <h5>Two-point</h5>
            <p>Individuals are split at two points and recombined.</p>
            <img src="static/images/cross_two_before.png" alt="Two-point crossover before" width="40%">
            <img src="static/images/cross_two_after.png" alt="Two-point crossover after" width="40%">
            <h5>Uniform-point</h5>
            <p>Each bit of parent goes into first or second offspring with equal probability. We use random binary vector to indicate which genes are going to be swapped (1 in vector).</p>
            <img src="static/images/cross_uniform_before.png" alt="Uniform crossover before" width="40%">
            <img src="static/images/cross_uniform_after.png" alt="Uniform crossover after" width="40%">

            <h4>Permutation crossover</h4>
            <h5>Order</h5>
            <p>Individual is copied to random point then it starts copying values from second parent if possible to preserve permutation.</p>
            <img src="static/images/cross_order_before.png" alt="Order crossover before" width="30%">
            <img src="static/images/cross_order_inter.png" alt="Order crossover in progress" width="35%">
            <img src="static/images/cross_order_after.png" alt="Order crossover after" width="30%">
            <h5>Partially matched</h5>
            <p>Two random points designates section where values on corresponding positions are swapped.</p>
            <img src="static/images/cross_pmx_before.png" alt="Partially matched crossover before" width="40%">
            <img src="static/images/cross_pmx_map.png" alt="Partially matched crossover map" width="15%">
            <img src="static/images/cross_pmx_after0.png" alt="Partially matched crossover after" width="40%">
            <h5>Cycle</h5>
            <p>Cycle starts at random point in first parent. Next position of cycle is where gene has same value as value at corresponding position in other parent.
                Continue until the cycle is closed. Leave the cycle how it is and swap all other values between 2 parents.</p>
            <img src="static/images/cross_cycle_before.png" alt="Cycle crossover before" width="40%">
            <img src="static/images/cross_cycle_after.png" alt="Cycle crossover after" width="40%">

            <a href="#Tabu"></a>
            <h2>Tabu</h2>
                <p>Nullam rhoncus aliquam metus. Etiam neque. Fusce aliquam vestibulum ipsum. Nam quis nulla. Duis viverra diam non justo. Pellentesque sapien. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nulla est. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Nunc tincidunt ante vitae massa. Nullam sit amet magna in magna gravida vehicula. Mauris elementum mauris vitae tortor. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce nibh. Pellentesque arcu.</p>

                <p>Mauris elementum mauris vitae tortor. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Donec iaculis gravida nulla. Et harum quidem rerum facilis est et expedita distinctio. Proin in tellus sit amet nibh dignissim sagittis. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Vivamus luctus egestas leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Aenean fermentum risus id tortor. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Fusce consectetuer risus a nunc.</p>

                <p>Nullam dapibus fermentum ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Proin in tellus sit amet nibh dignissim sagittis. Etiam egestas wisi a erat. Integer lacinia. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Fusce suscipit libero eget elit. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Maecenas libero. Nullam eget nisl. Aliquam erat volutpat. Donec iaculis gravida nulla. Duis pulvinar.</p>

                <p>Nunc tincidunt ante vitae massa. Mauris tincidunt sem sed arcu. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Fusce aliquam vestibulum ipsum. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Nullam at arcu a est sollicitudin euismod. Phasellus et lorem id felis nonummy placerat. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Cras elementum. Etiam neque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam at arcu a est sollicitudin euismod.</p>

              <a href="#Problems"></a>
              <h2>Problems</h2>
              <p>In this part you can find basic information about all problems and description of how price function is calculated.</p>
              <p>Price function is what the methods are working with. Price function makes all the problems maximaĺization to make the methods work with all problems.  This value is then transformed to value of optimization criterion displayd in graph.</p>
                <a href="#Knapsack"></a>
                <h3>Knapsack</h3>
                <p>Given a Knapsack of a maximum capacity of W and N items each with its own value and weight, throw in items inside the Knapsack such that the final contents has the maximum value.</p>
                <p>Here’s the general way the problem is explained – Consider a thief gets into a home to rob and he carries a knapsack. There are fixed number of items in the home – each with its own weight and value – Jewellery, with less weight and highest value vs tables, with less value but a lot heavy. To add fuel to the fire, the thief has an old knapsack which has limited capacity. Obviously, he can’t split the table into half or jewellery into 3/4ths. He either takes it or leaves it.</p>
                  <h4>Price function</h4>
                  <p>Price function for this problem is really easy. We just take the sum of values and sum of weights of all items in the knapsack. If the weight is lower or equal to capacity, the result is the sum of values. If not the result is - the amount that is above the capacity. Using this method, overweight knapsack is always worse than the correct one and thats what we want.</p>

                  <h4>Generator</h4>
                  <p>Most of the generator parameters should be easy to understand. The only complicated one is granularity.</p>
                  <p>So granularity. Granularity is the way of saying if you want heavier of lighter things in the knapsack. For lighter choose value thats lower than one, for heavier value thats bigger than one.</p>
                  <p>How exactly does it work? For every generated item the chance of this item being in the knapsack is based on its weight. If you want heavier things, the chance is 1 / (sumOfWeights - n) ^ granularity. For lighter things its 1 / n ^ (-granularity).</p>
                  <p>There are few problems with this, if the value is not chosen wisely. First problem is that for very high or very low values the calculation will take a lot of time because many items will get rejected. The second problem is that if the value is very high or very low, the generated weights will be basically the same, because only max weight or minimal weights have real chance to get in the knapsack. So what would happen is that the weights will be the same so not really more lighter or heavier things, beacuse compared to max weight or capacity they are all the same.</p>
                  <p>So for the best results it is recommended to use numbers between -1 and 1. Sum of weights is also important because it is the max value for generated weight so take that in account. The higher the number the closer to 0 should granularity be. </p>
                  <h4>Instance format</h4>
                  <p>Instance format is the same as in MI-PAA. Just remove the instance index because our application is solving one instance a time, so the index is not needed.</p>
                <a href="#SAT"></a>
                <h3>SAT</h3>
                <p>Sat problem is basically finding an interpretation of variables that satisfies Boolean formula. In our interpretation its about finding interpretation that satisfies as much clausules as possible. The given boolean formula is inputed in CNF format.</p>
                  <h4>Price function</h4>
                  <p>Price function is the number of satisfied clausules for the given configuration</p>

                  <h4>Generator</h4>
                  <p>The generator for SAT is pretty simple to use without any tricky parameters.</p>
                  <p>Only problem is generating number of clausules which is close to maximum number of clausules that is |n^3| - 1. Because the generating is random so the algorithm has to "hit" the last missing clausules.</p>
                  <p>We are not generating 3SAT so every clausules can consist of random number of literals/variables. But being completely random would cause the instances to be too easy, so the number of literals is 5 on average. So if the problem has low number of variables it can still be pretty easy so take that in mind when generating instances.</p>
                  <h4>Instance format</h4>
                  <p>Format used for the instances is the same as in MI-PAA, which is DIMACS CNF, so you should have no problem solving instances from MI-PAA.</p>
                <a href="#TSP"></a>
                <h3>Travelling salesman</h3>
                <p>The travelling salesman problem (TSP) asks the following question: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?" It is an NP-hard problem in combinatorial optimization, important in operations research and theoretical computer science.</p>
                <p>So the problem is basically about finding the shortest hamiltonian cycle.</p>
                <p>In our application there are two types of this problem. One is finding the hamiltonian cycle so its called "Hamiltonian". The second is about finding the real shortest path so it allows to visit vertices multiple times. This type is called "Shortest" and it also allows to choose how many and which vertices in the given graph you want to visit. The second variant is harded for computing because of calculation of the shortest path using either Floyd-Warshall or Dijsktras algorithms.</p>
                  <h4>Price function</h4>
                  <p>Price function is the length of the cycle/sequence.</p>

                  <h4>Generator</h4>
                  <p>The generator is based on the type of travelling salesman problem you choose.</p>
                  <p>The parameter should be self -describing. Only thing that may be tricky is that all edges are undirected. That means that the actual number of edges is twice the number.</p>
                  <h4>Instance format</h4>
                  <p>Format is:</p>
                  <p>[type]</p>
                  <p>[number of nodes/vertices]</p>
                  <p>[number of edges]</p>
                  <p>[number of nodes to visit]</p>
                  <p>[maximum weight of an edge]</p>
                  <p>*[list of nodes to visit in ascending order]</p>
                  <p>[grapf as an 2D array, space separators, index is vertex, value is the weight of and edge, 0 means no edge]</p>
                  <p>* is there only for "Shortest" type</p>
            <a href="#ETSP"></a>
            <h3>Euclidean travelling salesman problem</h3>
            <p>Variant of travelling salesman problem. Distances between cities aren't given explicitly but they are computed as Euclidean distance from coordinates of cities. Application supports just 2 coordinates.</p>
            <p>Given <em>n</em> points in <em>R^2</em>, the problem is to find the minimum length tour of the n points starting and ending in the same point.
                The distance between any two points <em>x</em> and <em>y</em> is defined to be the Euclidean distance between them, i.e., <em>&radic;<span style="border-top: 1px solid #000000">(x_1 - y_1)*(x_1 - y_1) + (x_2 - y_2)*(x_2 - y_2)</span></em>.</p>
            <h4>Price function</h4>
            <p>Price function is the length of the cycle/sequence.</p>

            <h4>Generator</h4>
            <p>Generator generates coordinates uniformly from 0 to given non-negative range.</p>
            <h4>Instance format</h4>
            <p>Format is:</p>
            <p><b>[number of cities]</b> <em>//rest of the line is ignored</em></p>
            <p>{<b>[x coordinate] [y coordinate]</b>  <em>//rest of the line is ignored</em>}^number of cities</p>

                <a href="#MVC"></a>
                <h3>Minimum vertex cover</h3>
                <p>A minimum vertex cover is a vertex cover having the smallest possible number of vertices for a given graph.</p>
                <p>Vertex cover is a set fo vertices such that each edge of the graph is incident to at least one vertex of the set.</p>
                  <h4>Price function</h4>
                  <p>Price function is the number of vertices in the selected set. If not all edges are covered the function instead returns -number of not covered edges.</p>

                  <p>So at the start the algorithm tries to minimize the amount of not covered edges, and then minimize the amount of selected vertices.</p>

                  <h4>Generator</h4>
                  <p>The generator is pretty simple. Allowing to choose number of vertices and edges</p>
                  <h4>Instance format</h4>
                  <p>Format is:</p>
                  <p>[number of nodes/vertices]</p>
                  <p>[number of edges]</p>
                  <p>[grapf as an 2D array, space separators, index is vertex, 0 means no edge, 1 means there is an edge]</p>

        </div>

    </div>
</template>

<style lang="scss" scoped>
    $left-panel-width: 250px;

    .nav-pills>li>a {
        border-radius: unset;
    }

    .help-panel-left {
        position: fixed;
        width: $left-panel-width;
        min-height: 100vh;
        border-right: #ddd 1px solid;
    }

    .page-content {
        max-width: 800px;
        margin-left: $left-panel-width;
        padding: 50px;
    }
</style>
