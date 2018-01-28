import __extend from 'lodash/extend';
import Resource from '@/services/resource';
import * as DBSchema from './DBSchema';
import DBManager from './DBManager';

var dbm = new DBManager(DBSchema.dbName, DBSchema.dbVersion, DBSchema.upgradeDB);
var exampleInstanceAdded = false;

function getTableNameByMethod(inputData) {
    var table = inputData.method + 'ComputingHistory';
    return DBSchema.dbTables[table];
}

// initial state
const state = {}

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {
    loadAll ({ dispatch }) {
        dispatch('loadComputingHistory');
        dispatch('loadInstances');
    },

    loadComputingHistory ({ getters, commit }) {
        var params = getters.getInputData;
        var table = getTableNameByMethod(params);
        return dbm.getAll(table, "by_problem", params.problem).then(function(data) {
            commit('updateComputingHistory', data);
            commit('initComparingResults', true);
            return true;
        }, function (err) {
            console.log(err);
            return false;
        });
    },

    pushComputingHistory ({ getters, dispatch }, result) {
        var objForDB = getters.getInputData;
        __extend(objForDB, {
            instance: getters.getComputingFile.name,
            data: {
                result: result,
                dataSet: getters.getChartValues
            }
        });
        var table = getTableNameByMethod(objForDB);
        return dbm.getStore(table, DBSchema.mode.RW).then(function(store) {
            return store.add(objForDB).then(function(data) {
                return dispatch('loadComputingHistory');
            });
        });
    },

    clearComputingHistory ({ getters, dispatch }) {
        var params = getters.getInputData;
        var table = getTableNameByMethod(params);
        dbm.getStore(table, DBSchema.mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] history cleared");
            return dispatch('loadComputingHistory');
        });
    },

    loadInstances ({ getters, commit }) {
        var params = getters.getInputData;
        return dbm.getAll(DBSchema.dbTables.instances, "by_problem", params.problem).then(function(instances) {
            if (instances.length > 0 || exampleInstanceAdded) {
                exampleInstanceAdded = true;
                commit('updateInstances', instances);
                return true;
            }
            else {
                exampleInstanceAdded = true;
                return Resource.getExampleInstance().then(function(data) {
                    var instanceDbObj = {
                        problem: 0,
                        type: 'string',
                        file: {
                            name: 'Example SAT instance.cnf',
                            content: data.bodyText
                        }
                    };
                    return dbm.getStore(DBSchema.dbTables.instances, DBSchema.mode.RW).then(function(store) {
                        return store.add(instanceDbObj).then(function() {
                            commit('updateInstances', [instanceDbObj, ...instances]);
                            return true;
                        });
                    });
                });
            }
        });
    },

    addInstances ({ getters, dispatch }, filesArray) {
        var inputParams = getters.getInputData;
        return dbm.getStore(DBSchema.dbTables.instances, DBSchema.mode.RW).then(function(store) {
            var addPromises = [];

            for (var i = 0, fileDbObj; fileDbObj = filesArray[i]; i++) {
                addPromises.push(store.add({
                    problem: inputParams.problem,
                    type: 'file',
                    file: fileDbObj
                }));
            }

            return Promise.all(addPromises).then(function(values) {
                return dispatch('loadInstances');
            });
        });
    },

    addGeneratedInstances ({ getters, dispatch }, stringFilesArray) {
        var inputParams = getters.getInputData;
        return dbm.getStore(DBSchema.dbTables.instances, DBSchema.mode.RW).then(function(store) {
            var addPromises = [];

            for (var i = 0, fileDbObj; fileDbObj = stringFilesArray[i]; i++) {
                addPromises.push(store.add({
                    problem: inputParams.problem,
                    type: 'string',
                    file: fileDbObj
                }));
            }

            return Promise.all(addPromises).then(function(values) {
                return dispatch('loadInstances');
            });
        });
    },

    removeInstance ({ dispatch }, id) {
        return dbm.remove(DBSchema.dbTables.instances, id).then(function(ok) {
            return dispatch('loadInstances');
        });
    },

    clearInstances ({ dispatch }) {
        return dbm.getStore(DBSchema.dbTables.instances, DBSchema.mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] instances cleared");
            return dispatch('loadInstances');
        });
    },

    // dev tools
    deleteDB (context) {
        console.log("[DB] deleting...");
        return dbm.deleteDB();
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
