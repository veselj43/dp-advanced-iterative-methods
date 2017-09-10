<template>
    <div class="params">
        <div class="form-group">
            <label class="col-sm-6 control-label" for="param1">Param1</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" id="param1" v-model="params.genetic_param1" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-6 control-label" for="param2">Param2</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" id="param2" v-model="params.genetic_param2" placeholder="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['params']
}
</script>
