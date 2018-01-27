<template>
    <div class="main-page">

        <div class="left-panel">
            <params-input class="component"></params-input>
            <controls class="component"></controls>
            <problem-select class="component"></problem-select>
            <files-input></files-input>
        </div>

        <div class="right-panel">
            <computing-history></computing-history>
            <info></info>
        </div>

        <div class="main-panel center-panel __above-disable-layer">
            <div class="middle-panel">
                <results></results>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Controls from './Controls'

import ParamsInput from './input/ParamsInput'
import ProblemSelect from './input/ProblemSelect'
import FilesInput from './input/FilesInput'

import Results from './output/Results'
import ComputingHistory from './output/ComputingHistory'
import Info from './Info'

export default {
    components: {
        Controls,
        ParamsInput,
        ProblemSelect,
        FilesInput,
        Results,
        ComputingHistory,
        Info
    }
}
</script>
