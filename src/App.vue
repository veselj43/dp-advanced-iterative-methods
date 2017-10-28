<template>
    <div id="advancedIterativeMethods">
        <navbar></navbar>
        <router-view class="__router-view"></router-view>
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

<style lang="scss" src="./styles/_styles.scss"></style>
