<template>
    <div id="advancedIterativeMethods">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
    name: 'advancedIterativeMethods',
    components: {
        Navbar
    }
}
</script>

<style src="./styles/layout.css"></style>
<style>
    .toasted-container .toasted .action,
    .toasted-container .toasted .action:hover {
        text-transform: uppercase;
        font-size: 12px;
    }

    .toasted.primary.success {
        background-color: #d33;
    }
    .toasted.primary.info {
        background-color: #46b;
    }
    .toasted.primary.error {
        background-color: #d33;
    }
</style>
