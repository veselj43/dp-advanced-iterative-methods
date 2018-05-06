<template>
    <div class="help-problems">
        <h2>Problems</h2>
        <p>
            In this part you can find basic information about all problems and description of how price function is calculated.
        </p>
        <p>
            For each problem there is also a description of generator.
        </p>
        <div class="alert alert-info alert-with-icon">
            <i class="fas fa-info-circle"></i>
            <div class="alert-content">
                <p>Price function is what the methods are working with.</p>
                <p>Price function makes all the problems maximization to make the methods work with all problems.</p>
                <p>This value is then transformed to value of optimization criterion displayed in graph.</p>
            </div>
        </div>

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
