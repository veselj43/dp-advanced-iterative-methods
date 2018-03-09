<template>
    <div id="advancedIterativeMethods">
        <navbar></navbar>
        <router-view class="__router-view"></router-view>
        <dev-controls v-if="debugMode"></dev-controls>
        <div v-if="computingIsRunning || computingIsProcessingResults" class="__disable-layer"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
            debugMode: this.$store.state.debugMode,
            status: this.$store.getters.getComputingStatus
        }
    },

    computed: {
        ...mapGetters([
            'computingIsRunning',
            'computingIsProcessingResults'
        ])
    },
}
</script>

<style lang="scss" src="./styles/_styles.scss"></style>
