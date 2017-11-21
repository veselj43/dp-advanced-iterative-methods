import Vue from 'vue';
import __range from 'lodash/range';

function GeneratedInfo(index, params) {
    this.index = index;
    this.params = params;
}

function GeneratedDataSet(historyRecord) {
    this._itemId = historyRecord.id;
    this.label = historyRecord.instance;
    this.data = historyRecord.data.dataSet;
    this.borderColor = "#f87979";
    this.backgroundColor = "transparent";
}

// initial state
const state = {
    computingHistory: [],
    comparingResults: {
        chart: {
            labels: [],
            dataSets: []
        },
        info: {
            activeCount: 0,
            items: {}
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
    }
}

// mutations
const mutations = {
    updateComputingHistory(state, data) {
        state.computingHistory = data;
    },

    // TODO refactoring !!!
    initComparingResults(state, fromDB) {
        var index = (fromDB) ? state.computingHistory.length - 1 : 0;
        var toAdd = state.computingHistory[index];
        if (!toAdd) {
            return;
        }

        state.comparingResults.info.items = {};
        Vue.set(state.comparingResults.info.items, toAdd.id, {
            instance: toAdd.instance,
            params: toAdd.params,
            result: toAdd.data.result
        });

        state.comparingResults.chart.dataSets = [new GeneratedDataSet(toAdd)];

        var maxLength = 0;
        state.comparingResults.chart.dataSets.forEach(function(set) {
            maxLength = Math.max(maxLength, set.data.length);
        });

        state.comparingResults.chart.labels = __range(maxLength);
        state.comparingResults.info.activeCount = state.comparingResults.chart.dataSets.length;
    },

    // TODO refactoring !!!
    toggleIndexInComparingResults(state, index) {
        var toAdd = state.computingHistory[index];
        if (!toAdd) {
            return;
        }

        if (state.comparingResults.info.items[toAdd.id]) {
            var removeIndex = -1;
            for (var i in state.comparingResults.chart.dataSets) {
                if (state.comparingResults.chart.dataSets[i]._itemId === toAdd.id) {
                    removeIndex = i;
                    break;
                }
            }
            state.comparingResults.chart.dataSets.splice(removeIndex, 1);
            Vue.delete(state.comparingResults.info.items, toAdd.id);
        }
        else {
            Vue.set(state.comparingResults.info.items, toAdd.id, {
                instance: toAdd.instance,
                params: toAdd.params,
                result: toAdd.data.result
            });
            state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));
        }

        var maxLength = 0;
        state.comparingResults.chart.dataSets.forEach(function(set) {
            maxLength = Math.max(maxLength, set.data.length);
        });

        state.comparingResults.chart.labels = __range(maxLength);
        state.comparingResults.info.activeCount = state.comparingResults.chart.dataSets.length;
    }
}

// actions
const actions = {
    pushResult({ dispatch }, data) {
        dispatch('pushComputingHistory', data);
    }
}

// modules
const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
