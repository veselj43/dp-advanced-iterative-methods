<template>
    <div id="advancedIterativeMethods">
        <navbar></navbar>
        <router-view class="__router-view"></router-view>
        <dev-controls v-if="debugMode"></dev-controls>
    </div>
</template>

<script>
import DevControls from './components/devTools/DevControls';
import Navbar from './components/Navbar';

export default {
    name: 'advancedIterativeMethods',
    components: {
        DevControls,
        Navbar
    },
    data() {
        return {
            debugMode: this.$store.state.debugMode
        }
    }
}
</script>

<style lang="scss" src="./styles/_styles.scss"></style>
