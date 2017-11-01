<template>
    <div class="testComponent">
        <span v-on:click="click">Hello world!</span>
    </div>
</template>

<script>
function clickHandler() {
    console.log("kliknul jsem");
}

export default {
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
        }
    }
}
</script>
