<template>
    <div class="help-body">
        <div class="help-panel-left">
            <ul class="nav nav-pills nav-stacked">
                <li>
                    <router-link to="/">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        Back to application
                    </router-link>
                </li>
                <li>&nbsp;</li>
                <router-link tag="li" to="/help" exact>
                    <a>Help Page</a>
                </router-link>
                <router-link tag="li" to="/help/SA">
                    <a>Simulated Annealing</a>
                </router-link>
                <router-link tag="li" to="/help/GA">
                    <a>Genetic Algorithm</a>
                </router-link>
                <router-link tag="li" to="/help/Tabu">
                    <a>Tabu Search</a>
                </router-link>
                <router-link tag="li" to="/help/Problems">
                    <a>Problems</a>
                    <ul>
                        <router-link tag="li" to="/help/Problems#Knapsack">
                            <a>Knapsack</a>
                        </router-link>
                        <router-link tag="li" to="/help/Problems#SAT">
                            <a>MAX-SAT</a>
                        </router-link>
                        <router-link tag="li" to="/help/Problems#TSP">
                            <a>Travelling salesman</a>
                        </router-link>
                        <router-link tag="li" to="/help/Problems#ETSP">
                            <a>Euclidean travelling salesman</a>
                        </router-link>
                        <router-link tag="li" to="/help/Problems#MVC">
                            <a>Minimal vertex cover</a>
                        </router-link>
                    </ul>
                </router-link>
            </ul>

        </div>

        <div class="help-content-wrapper">
            <div class="help-content">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
    .help-content {
        h3 {
            margin-top: 2em;
            border-bottom: #ccc 1px dashed;
        }

        h4 {
            margin-top: 1.5em;
        }
    }
</style>

<style lang="scss" scoped>
    $left-panel-width: 250px;

    .nav-pills {
        & > li {
            & > a {
                border-radius: unset;
            }

            & > ul {
                list-style: none;
                padding: 0;

                & > li > a,
                & > li.active > a {
                    display: block;
                    padding: 5px 0;
                    padding-left: 2em;
                    text-decoration: none;

                    &:hover {
                        text-decoration: none;
                        background-color: #eee;
                    }
                }

                & > li.active > a,
                & > li.active > a:hover {
                    color: #fff;
                    background-color: #337ab7;
                }
            }
        }
    }

    .help-panel-left {
        position: fixed;
        width: $left-panel-width;
        min-height: 100vh;
        border-right: #ddd 1px solid;
    }

    .help-content-wrapper {
        margin-left: $left-panel-width;
        padding: 50px;

        .help-content {
            max-width: 800px;
            margin: 0 auto;
        }
    }
</style>
