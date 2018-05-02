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
            <h2>GA</h2>
                <p>Suspendisse sagittis ultrices augue. Maecenas sollicitudin. Nulla non arcu lacinia neque faucibus fringilla. Aliquam id dolor. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nullam eget nisl. Donec iaculis gravida nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In enim a arcu imperdiet malesuada. Proin mattis lacinia justo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer malesuada. Praesent dapibus.</p>

                <p>Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Maecenas libero. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Nulla pulvinar eleifend sem. Suspendisse sagittis ultrices augue. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Nullam eget nisl. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Nullam sit amet magna in magna gravida vehicula. Suspendisse sagittis ultrices augue.</p>

                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. In enim a arcu imperdiet malesuada. Cras elementum. Suspendisse sagittis ultrices augue. Donec iaculis gravida nulla. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Etiam dictum tincidunt diam. Curabitur sagittis hendrerit ante. Aenean fermentum risus id tortor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Praesent vitae arcu tempor neque lacinia pretium.</p>

                <p>Vestibulum fermentum tortor id mi. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Praesent vitae arcu tempor neque lacinia pretium. Cras elementum. Donec iaculis gravida nulla. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Integer in sapien. Maecenas aliquet accumsan leo. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nullam rhoncus aliquam metus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Aliquam erat volutpat.</p>

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
