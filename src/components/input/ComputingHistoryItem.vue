<template>
    <div class="list-group-item">
        <div class="list-group-item-heading" v-on:click="toggle">
            <div class="collapse-header">{{item.instance}}</div>
            <span class="collapse-switch">
                <span v-if="isActive" class="glyphicon glyphicon-triangle-left"></span>
                <span v-else class="glyphicon glyphicon-triangle-bottom"></span>
            </span>
        </div>
        <ul class="list-group-item-text collapsable" v-bind:class="{'collapsed': !isActive}">
            <li v-for="(param, key) in item.params">
                {{key}}: {{param}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggle() {
            this.isActive =! this.isActive;
        }
    }
}
</script>

<style lang="scss" scoped>
    $duration-primary: 400ms;
    $duration-secondary: 300ms;

    .historyList {
        margin-top: 1em;
    }

    .list-group-item {
        padding: 0;
    }

    .list-group-item-heading {
        display: block;
        margin: 0;
        padding: 10px 15px;
        cursor: pointer;

        .collapse-header {
            display: inline-block;
            font-size: 110%;
        }

        .collapse-switch {
            display: inline-block;
            float: right;
            font-size: 90%;
        }
    }

    .list-group-item-text {
        &.collapsable {
            max-height: 500px;
            padding: 10px;
            padding-left: 25px;
            list-style-type: none;
            overflow: hidden;
            background-color: #ccc;
            -webkit-transition: max-height $duration-secondary, padding-top $duration-primary, padding-bottom $duration-primary;
            transition: max-height $duration-secondary, padding-top $duration-primary, padding-bottom $duration-primary;

            &.collapsed {
                max-height: 0;
                padding-top: 0;
                padding-bottom: 0;
            }
        }
    }
</style>
