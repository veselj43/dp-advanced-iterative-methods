<template>
    <nav class="navbar-default top-panel">
        <ul class="nav nav-pills nav-justified">
            <li v-for="(method, index) in methodEnum" :key="index" v-on:click="selectMethod(index)" v-bind:class="{ active: selectedMethodId === method.id }">
                <a>{{method.text}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'methodEnum',
            'selectedMethodId'
        ])
    },
    methods: {
        ...mapActions({
            selectMethod: 'selectMethod'
        })
    }
}
</script>

<style scoped>
    .navbar {
        margin-bottom: 0;
    }

    nav ul.nav li {
        cursor: pointer;
    }

    nav ul.nav li + li {
        border-left: #ccc 1px solid;
    }

    .nav-pills>li>a {
        border-radius: unset;
    }
</style>
