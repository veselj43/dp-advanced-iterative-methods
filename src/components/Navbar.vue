<template>
    <nav class="navbar-default top-panel">
        <ul class="nav nav-pills nav-justified">
            <li v-for="(method, index) in methodEnum" :key="index" v-on:click="selectMethod(index)" v-bind:class="{ active: selectedMethod.id === method.id }">
                <a>{{method.text}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            selectedMethod: state => state.inputParams.params.method
        }),
        ...mapGetters([
            'methodEnum'
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

    .nav-pills>li>a {
        border-radius: unset;
    }
</style>
