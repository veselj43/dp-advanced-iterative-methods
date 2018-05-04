<template>
    <div class="help-problems">
        <h2>Problems</h2>
        <p>
            In this part you can find basic information about all problems and description of how price function is calculated.
        </p>
        <p>
            Price function is what the methods are working with. 
            Price function makes all the problems maximaĺization to make the methods work with all problems. 
            This value is then transformed to value of optimization criterion displayd in graph.
        </p>

        <KNAP></KNAP>
        <SAT></SAT>
        <TSP></TSP>
        <ETSP></ETSP>
        <MVC></MVC>
    </div>
</template>

<script>
import ETSP from './ETSP'
import KNAP from './KNAP'
import MVC from './MVC'
import SAT from './SAT'
import TSP from './TSP'

export default {
    components: {
        ETSP,
        KNAP,
        MVC,
        SAT,
        TSP
    }
}
</script>

<style lang="scss">
</style>