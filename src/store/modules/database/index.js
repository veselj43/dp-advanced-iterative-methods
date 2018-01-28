import Resource from '@/services/resource';
import __mapValues from 'lodash/mapValues';
import __extend from 'lodash/extend';
import DBManager from './DBManager';

const dbName = "MyTestDatabase";
const dbVersion = 1;

const defaultPK = {
    keyPath: "id",
    autoIncrement: true
};
const problemIndex = {
    name: "by_problem",
    column: "problem",
    options: {unique: false}
};

const dbStructure = {
    annealingComputingHistory: {
        name: "annealingComputingHistory",
        pk: defaultPK,
        indexes: [problemIndex]
    },
    geneticComputingHistory: {
        name: "geneticComputingHistory",
        pk: defaultPK,
        indexes: [problemIndex]
    },
    tabuComputingHistory: {
        name: "tabuComputingHistory",
        pk: defaultPK,
        indexes: [problemIndex]
    },
    instances: {
        name: "instances",
        pk: defaultPK,
        indexes: [problemIndex]
    }
};
const dbTables = __mapValues(dbStructure, (tableMetaData) => tableMetaData.name);
const mode = {
    RO: 'readonly',
    RW: 'readwrite'
};

const mockData = {
    tabuComputingHistory: [
        { problem: 0, instance: 'SAT instance 01', params: { a: 1, b: 2 } },
        { problem: 1, instance: 'KNAP instance 01', params: { a: 1, b: 2 } },
        { problem: 0, instance: 'SAT instance 01', params: { c: 4, d: 3 } }
    ],
    instances: [
        { content: "instance content as string ???" }
    ]
};

function upgradeDB(db) {
    // The database did not previously exist, so create object stores and indexes.
    console.log("[DB] Creating database");

    for (var tableKey in dbStructure) {
        var tableMetaData = dbStructure[tableKey];
        var tableObjectStore = db.createObjectStore(tableMetaData.name, tableMetaData.pk);

        if (tableMetaData.indexes) {
            for (var i = 0, index; index = tableMetaData.indexes[i]; i++) {
                tableObjectStore.createIndex(index.name, index.column, index.options);
            }
        }
    }
}

var dbm = new DBManager(dbName, dbVersion, upgradeDB);
var exampleInstanceAdded = false;

function getTableNameByMethod(inputData) {
    var table = inputData.method + 'ComputingHistory';
    return dbTables[table];
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
        return dbm.getStore(table, mode.RW).then(function(store) {
            return store.add(objForDB).then(function(data) {
                return dispatch('loadComputingHistory');
            });
        });
    },

    clearComputingHistory ({ getters, dispatch }) {
        var params = getters.getInputData;
        var table = getTableNameByMethod(params);
        dbm.getStore(table, mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] history cleared");
            return dispatch('loadComputingHistory');
        });
    },

    loadInstances ({ getters, commit }) {
        var params = getters.getInputData;
        return dbm.getAll(dbTables.instances, "by_problem", params.problem).then(function(instances) {
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
                    return dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
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
        return dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
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
        return dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
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
        return dbm.remove(dbTables.instances, id).then(function(ok) {
            return dispatch('loadInstances');
        });
    },

    clearInstances ({ dispatch }) {
        return dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
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
