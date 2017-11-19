<template>
    <div class="visualizeConfiguration">
        <table class="config" v-if="resultObj">
            <tr>
                <td v-for="(value, index) in resultObj.result">
                    {{index}}
                </td>
            </tr>
            <tr>
                <td v-for="(value, index) in resultObj.result" :class="{true: value, false: !value}">
                    {{value ? 'T' : 'F'}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['resultObj']
}
</script>

<style scoped>
    .visualizeConfiguration {
        display: inline-block;
    }

    table.config {
        margin: 0;
        padding: 0;
    }

    table.config td {
        width: 2em;
        margin: 0;
        padding: .1em .4em;
        text-align: center;
        font-weight: bold;
        border: #333 1px solid;
    }

    table.config td.true {
        background: #3c3;
        color: #000;
    }

    table.config td.false {
        background: #c33;
        color: #fff;
    }
</style>
