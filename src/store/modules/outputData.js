import Vue from 'vue';
import { storage, storageKeys, storageUtils } from '@/services/localStorage'

function GeneratedInfo(index, params) {
    this.index = index;
    this.params = params;
}

function GeneratedDataSet(historyRecord) {
    this.itemId = historyRecord.id;
    this.data = historyRecord.data.dataSet;
}

function updateComparingResultsComputedValues(comparingResults) {
    comparingResults.info.activeCount = comparingResults.chart.dataSets.length;
    storage.set(storageUtils.getSelectedIndexesByTypeKey(), JSON.stringify(comparingResults.info.selectedIndexes));
}

// initial state
const state = {
    computingHistory: [],
    comparingResults: {
        chart: {
            dataSets: []
        },
        info: {
            activeCount: 0,
            items: {},
            selectedIndexes: []
        }
    }
}

// getters
const getters = {
    dataForMultipleLineChart(state) {
        return state.comparingResults.chart;
    },
    comparingResultsInfo(state) {
        return state.comparingResults.info;
    },
    comparingResultsItems(state) {
        return state.comparingResults.info.items;
    }
}

// mutations
const mutations = {
    updateComputingHistory(state, data) {
        state.computingHistory = data.reverse();
    },

    initComparingResults(state, indexesToActivate) {
        // reset comparingResults state
        state.comparingResults.chart.dataSets = [];
        state.comparingResults.info.items = {};
        state.comparingResults.info.activeCount = 0;

        state.comparingResults.info.selectedIndexes = indexesToActivate.filter(index => {
            var toAdd = state.computingHistory[index];
            if (!toAdd) {
                return false;
            }

            Vue.set(state.comparingResults.info.items, toAdd.id, {
                instance: toAdd.instance,
                params: toAdd.params,
                result: toAdd.data.result
            });

            state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));

            return true;
        });

        updateComparingResultsComputedValues(state.comparingResults);
    },

    toggleIndexInComparingResults(state, index) {
        var toAdd = state.computingHistory[index];
        if (!toAdd) {
            return;
        }

        if (state.comparingResults.info.items[toAdd.id]) {
            var removeIndex = -1;
            for (var i in state.comparingResults.chart.dataSets) {
                if (state.comparingResults.chart.dataSets[i].itemId === toAdd.id) {
                    removeIndex = i;
                    break;
                }
            }
            state.comparingResults.chart.dataSets.splice(removeIndex, 1);
            Vue.delete(state.comparingResults.info.items, toAdd.id);
            state.comparingResults.info.selectedIndexes.splice(state.comparingResults.info.selectedIndexes.indexOf(index), 1);
        }
        else {
            Vue.set(state.comparingResults.info.items, toAdd.id, {
                instance: toAdd.instance,
                params: toAdd.params,
                result: toAdd.data.result
            });
            state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));
            state.comparingResults.info.selectedIndexes.push(index);
        }

        updateComparingResultsComputedValues(state.comparingResults);
    },

    toggleAllComparingResults(state, checkedAll) {
        state.comparingResults.chart.dataSets = [];
        state.comparingResults.info.items = {};
        state.comparingResults.info.activeCount = 0;
        state.comparingResults.info.selectedIndexes = [];

        if (!checkedAll) {
            state.computingHistory.forEach((toAdd, index) => {
                Vue.set(state.comparingResults.info.items, toAdd.id, {
                    instance: toAdd.instance,
                    params: toAdd.params,
                    result: toAdd.data.result
                });
                state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));
                state.comparingResults.info.selectedIndexes.push(index);
            });
        }

        updateComparingResultsComputedValues(state.comparingResults);
    }
}

// actions
const actions = {}

// modules
const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
