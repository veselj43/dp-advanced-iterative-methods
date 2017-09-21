<template>
    <div id="advancedIterativeMethods">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'advancedIterativeMethods'
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
