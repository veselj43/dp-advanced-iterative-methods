import __mapValues from 'lodash/mapValues';
import __extend from 'lodash/extend';
import DBManager from './DBManager';

const dbName = "MyTestDatabase";
const dbVersion = 1;
const dbStructure = {
    computingHistory: {
        name: "computingHistory",
        pk: {
            keyPath: "id",
            autoIncrement: true
        },
        indexes: [
            {
                name: "by_method",
                column: "method",
                options: {unique: false}
            }, {
                name: "by_problem",
                column: "problem",
                options: {unique: false}
            }
        ]
    },
    instances: {
        name: "instances",
        pk: {
            keyPath: "id",
            autoIncrement: true
        }
    }
};
const dbTables = __mapValues(dbStructure, (tableMetaData) => tableMetaData.name);
const mode = {
    RO: 'readonly',
    RW: 'readwrite'
};

const mockData = {
    computingHistory: [
        {method: 'tabu', problem: 0, instance: 'SAT instance 01', params: { a: 1, b: 2 } },
        {method: 'tabu', problem: 1, instance: 'KNAP instance 01', params: { a: 1, b: 2 } },
        {method: 'annealing', problem: 0, instance: 'SAT instance 01', params: { c: 4, d: 3 } }
    ],
    instances: [
        {content: "instance content as string"}
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

// dbm.getAll(dbTables.computingHistory, "by_method", 'tabu').then(function(data) {
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
    loadComputingHistory: loadFactory(dbTables.computingHistory, 'updateComputingHistory'),
    loadInstances: loadFactory(dbTables.instances, 'updateInstances'),
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
        dbm.getStore(dbTables.computingHistory, mode.RW).then(function(store) {
            store.add(objForDB).then(function(data) {
                dispatch('loadComputingHistory');
            })
        });
    },

    removeHistory ({ dispatch }) {
        dbm.getStore(dbTables.computingHistory, mode.RW).then(function(store) {
            return store.clear();
        }).then(function(data) {
            console.log("[DB] cleared");
            dispatch('loadAll');
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
