<template>
    <div class="visualizeConfiguration">
        <permutation v-if="problemType === ProblemTypeEnum.PERMUTATION"></permutation>
        <bit-array v-else></bit-array>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProblemClassFromId } from '@/services/classResolver';
import { ProblemTypeEnum } from '@/computing/problems/Problem';
import BitArray from './configType/BitArray';
import Permutation from './configType/Permutation';

export default {
    components: {
        BitArray,
        Permutation
    },

    data () {
        return {
            ProblemTypeEnum,
        }
    },

    computed: {
        ...mapGetters([
            'selectedProblemId'
        ]),

        problemType() {
            return getProblemClassFromId(this.selectedProblemId).prototype.getType();
        }
    },
}
</script>

<style lang="scss">
    .visualizeConfiguration {
        display: inline-block;

        table {
            margin: 0;
            padding: 0;
            margin-right: 1em;

            td {
                width: 2em;
                margin: 0;
                padding: .1em .4em;
                text-align: center;
                // font-weight: bold;
                border: #ccc 1px solid;

                &.instanceName {
                    text-align: left;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
