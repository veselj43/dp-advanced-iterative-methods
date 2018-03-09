import Vue from 'vue';

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

    initComparingResults(state, fromDB) {
        var index = (fromDB) ? state.computingHistory.length - 1 : 0;
        var toAdd = state.computingHistory[index];

        state.comparingResults.info.items = {};
        state.comparingResults.chart.dataSets = [];
        state.comparingResults.info.activeCount = 0;

        if (!toAdd) {
            return;
        }

        Vue.set(state.comparingResults.info.items, toAdd.id, {
            instance: toAdd.instance,
            params: toAdd.params,
            result: toAdd.data.result
        });

        state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));

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
        }
        else {
            Vue.set(state.comparingResults.info.items, toAdd.id, {
                instance: toAdd.instance,
                params: toAdd.params,
                result: toAdd.data.result
            });
            state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));
        }

        updateComparingResultsComputedValues(state.comparingResults);
    },

    toggleAllComparingResults(state, checkedAll) {
        if (checkedAll) {
            state.comparingResults.info.items = {};
            state.comparingResults.chart.dataSets = [];
            state.comparingResults.info.activeCount = 0;
        }
        else {
            state.comparingResults.info.items = {};
            state.comparingResults.chart.dataSets = [];
            state.comparingResults.info.activeCount = 0;

            state.computingHistory.forEach(toAdd => {
                Vue.set(state.comparingResults.info.items, toAdd.id, {
                    instance: toAdd.instance,
                    params: toAdd.params,
                    result: toAdd.data.result
                });
                state.comparingResults.chart.dataSets.push(new GeneratedDataSet(toAdd));
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
