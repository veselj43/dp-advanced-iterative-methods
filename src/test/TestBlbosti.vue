<template>
    <div class="testComponent">
        <p>printing variable: "{{someVariable}}"</p>

        <button class="btn btn-default" v-on:click="click">Hello world!</button>
    </div>
</template>

<script>
function clickHandler() {
    console.log("kliknul jsem");
}

export default {
    data: function() {
        return {
            someVariable: "variable content"
        };
    },
    mounted: function() {
        var i = [5, "ahoj", 5.854];
        var obj = {
            jmeno: "Pepa",
            vek: 50
        };

        console.log(obj.jmeno);
    },
    methods: {
        click: function() {
            clickHandler();

            // accessing data variables with this
            console.log(this.someVariable);
        }
    }
}
</script>

<style scoped>
    .testComponent {
        width: 80%;
        margin: 1em auto;
    }
</style>
