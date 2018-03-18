<template>
    <div id="advancedIterativeMethods">
        <router-view class="__router-view"></router-view>
        <!-- <dev-controls v-if="debugMode"></dev-controls> -->
    </div>
</template>

<script>
// import DevControls from './components/devTools/DevControls';

export default {
    name: 'advancedIterativeMethods',
    components: {
        // DevControls
    },

    data() {
        return {
            // debugMode: this.$store.state.debugMode
        }
    },
}
</script>

<style lang="scss" src="./styles/_styles.scss"></style>
