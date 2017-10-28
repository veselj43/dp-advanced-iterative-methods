<template>
    <nav class="navbar navbar-default">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- <a class="navbar-brand" href="#">DIA</a> -->
        </div>

        <div class="collapse navbar-collapse center">
            <ul class="nav navbar-nav center-panel">
                <li v-for="(method, index) in methodEnum" v-on:click="selectMethod(index)" v-bind:class="{ active: selectedMethod.id === method.id }">
                    <a>{{method.text}}</a>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState({
            selectedMethod: state => state.methods.selected
        }),
        ...mapGetters([
            'methodEnum'
        ])
    },
    methods: {
        ...mapMutations({
            selectMethod: 'selectMethod'
        })
    }
}
</script>

<style scoped>
    .navbar {
        margin-bottom: 0;
    }

    .navbar ul.nav li a {
        cursor: pointer;
    }
</style>
