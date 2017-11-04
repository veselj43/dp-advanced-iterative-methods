<template>
    <div class="dev-controls panel panel-default">
        <div class="panel-body">
            <ul class="dev-control-menu">
                <li class="btn btn-default">
                    <span>DB</span>
                    <ul class="btn-group-vertical">
                        <li class="btn btn-default" v-on:click="mockDB">Mock db</li>
                        <li class="btn btn-default" v-on:click="removeHistory">Clear history</li>
                        <li class="btn btn-default" v-on:click="deleteDB">Delete db</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions([
            'mockDB',
            'removeHistory',
            'deleteDB'
        ])
    }
}
</script>

<style lang="scss" scoped>
    $dev-bg-color: #789;
    $dev-border-color: #ccc;

    .dev-controls {
        position: absolute;
        max-width: 20%;
        right: 15%;
        bottom: 5%;
        z-index: 100;
        background-color: $dev-bg-color;
        border: $dev-border-color 1px solid;

        ul.dev-control-menu {
            &, & ul {
                padding: 0;
                margin: 0;
                list-style-type: none;
            }

            li {
                position: relative;

                ul {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    margin-bottom: 1px;
                    border-radius: 4px;
                    background-color: #fff;

                    li {
                        display: block;
                        white-space: nowrap;
                        line-height: 2;
                        padding: 0 1em;
                        cursor: pointer;
                    }
                }

                &:hover ul {
                    display: block;
                }
            }
        }
    }
</style>
