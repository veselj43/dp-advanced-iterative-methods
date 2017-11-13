<template>
    <div class="list-group-item">
        <div class="list-group-item-heading checkbox">
            <label>
                <input type="checkbox" v-model="checked">
                <div class="collapse-header">{{item.instance}}</div>
            </label>
            <span class="collapse-switch" v-on:click="toggle">
                <span v-if="isActive" class="glyphicon glyphicon-triangle-bottom"></span>
                <span v-else class="glyphicon glyphicon-triangle-left"></span>
            </span>
        </div>
        <div class="list-group-item-text collapsable" v-bind:class="{'collapsed': !isActive}">
            <table class="table">
                <tbody>
                    <tr v-for="(param, key) in item.params">
                        <td>{{key}}</td>
                        <td><strong>{{param}}</strong></td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            isActive: false,
            checked: false
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
        position: relative;
        display: block;
        margin: 0;
        padding: 10px 15px;
        cursor: pointer;

        .collapse-header {
            display: inline-block;
            font-size: 110%;
        }

        .collapse-switch {
            position: absolute;
            display: block;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            padding: 10px 1em;
            font-size: 90%;
        }
    }

    .list-group-item-text {
        .table {
            margin: 0;
        }

        &.collapsable {
            max-height: 500px;
            padding: 10px;
            padding-left: 25px;
            overflow: hidden;
            background-color: #ddd;
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
