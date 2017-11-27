<template>
    <div class="visualizeConfiguration">
        <table class="config" v-if="itemsArray">
            <tr>
                <td>Instance</td>
                <td v-for="(value, index) in varCount">
                    {{index}}
                </td>
            </tr>
            <tr v-for="item in itemsArray">
                <td class="instanceName">{{item.instance}}</td>
                <td v-for="(value, index) in item.result.result" :class="{true: value, false: !value}">
                    {{value ? 'T' : 'F'}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    computed: {
        itemsArray() {
            return this.$store.state.outputData.comparingResults.info.items;
        },

        varCount() {
            var count = 0;
            for (var i in this.itemsArray) {
                count = Math.max(count, this.itemsArray[i].result.result.length);
            }
            return _.range(count);
        }
    }
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

    table td.instanceName {
        white-space: nowrap;
    }
</style>
