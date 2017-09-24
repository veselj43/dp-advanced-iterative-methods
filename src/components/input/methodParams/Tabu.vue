<template>
    <div class="params">
        <div class="form-group">
            <label class="col-md-8 control-label" for="multiplierLimit">multiplierLimit</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="multiplierLimit" v-model="params.tabu.multiplierLimit" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-8 control-label" for="multiplierTabuSize">multiplierTabuSize</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="multiplierTabuSize" v-model="params.tabu.multiplierTabuSize" placeholder="">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-8 control-label" for="tabuSize2">tabuSize2</label>
            <div class="col-md-4">
                <input class="form-control" type="number" id="tabuSize2" v-model="params.tabu.tabuSize2" placeholder="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['params']
}
</script>
