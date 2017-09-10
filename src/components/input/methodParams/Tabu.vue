<template>
    <div class="params">
        <div class="form-group">
            <label class="col-sm-6 control-label" for="multiplierLimit">multiplierLimit</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" id="multiplierLimit" v-model="params.tabu_multiplierLimit" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-6 control-label" for="multiplierTabuSize">multiplierTabuSize</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.tabu_multiplierTabuSize" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-6 control-label" for="dividerTabuSize2">dividerTabuSize2</label>
            <div class="col-sm-4">
                <input class="form-control" type="number" id="dividerTabuSize2" v-model="params.tabu_dividerTabuSize2" placeholder="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['params']
}
</script>
