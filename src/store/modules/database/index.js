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

// dbm.getAll(dbTables.tabuComputingHistory, "by_method", 'tabu').then(function(data) {
//     console.log(data);
// });

// initial state
const state = {}

// getters
const getters = {}

// mutations
const mutations = {}

var loadFactory = (dbTableName, mutationName) => ({ commit }) => {
    dbm.getAll(dbTableName).then(function(data) {
        commit(mutationName, data);
    });
}

// actions
const actions = {
    loadComputingHistory ({ getters, commit }) {
        var params = getters.getInputData;
        var table = params.method + 'ComputingHistory';
        dbm.getAll(dbTables[table], "by_problem", params.problem).then(function(data) {
            commit('updateComputingHistory', data);
        });
    },
    loadInstances ({ getters, commit }) {
        var params = getters.getInputData;
        dbm.getAll(dbTables.instances, "by_problem", params.problem).then(function(data) {
            commit('updateInstances', data);
        });
    },
    loadAll ({ dispatch }) {
        dispatch('loadComputingHistory');
        dispatch('loadInstances');
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
        dbm.getStore(dbTables.tabuComputingHistory, mode.RW).then(function(store) {
            store.add(objForDB).then(function(data) {
                dispatch('loadComputingHistory');
            });
        });
    },

    clearHistory ({ dispatch }) {
        dbm.getStore(dbTables.tabuComputingHistory, mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] history cleared");
            dispatch('loadComputingHistory');
        });
    },

    addInstances ({ getters, dispatch }, filesArray) {
        var inputParams = getters.getInputData;
        dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
            var addPromises = [];

            for (var i = 0, fileDbObj; fileDbObj = filesArray[i]; i++) {
                addPromises.push(store.add({ problem: inputParams.problem, file: fileDbObj}));
            }

            Promise.all(addPromises).then(function(values) {
                dispatch('loadInstances');
            });
        });
    },

    removeInstance ({ dispatch }, id) {
        dbm.remove(dbTables.instances, id).then(function() {
            dispatch('loadInstances');
        });
    },

    clearInstances ({ dispatch }) {
        dbm.getStore(dbTables.instances, mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] instances cleared");
            dispatch('loadInstances');
        });
    },

    // dev tools
    mockDB ({ dispatch }) {
        function fillStore(dbTable) {
            dbm.getStore(dbTables[dbTable], mode.RW).then(function(store) {
                store.clear().then(function() {
                    mockData[dbTable].forEach(function(item) {
                        store.add(item).then(function (data) {
                            console.log("[DB]["+dbTable+"]["+data+"] added");
                        });
                    });
                });
            });
        }

        var fillPromises = [];
        for (var dbTable in mockData) {
            fillPromises.push(fillStore(dbTable));
        }

        Promise.all(fillPromises).then(function(values) {
            dispatch('loadAll');
        });
    },
    deleteDB (context) {
        console.log("[DB] deleting...");
        dbm.deleteDB();
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
