import __mapValues from 'lodash/mapValues';

export const dbName = "MyTestDatabase";
export const dbVersion = 1;

export const defaultPK = {
    keyPath: "id",
    autoIncrement: true
};
export const problemIndex = {
    name: "by_problem",
    column: "problem",
    options: { unique: false }
};

export const dbStructure = {
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
export const dbTables = __mapValues(dbStructure, (tableMetaData) => tableMetaData.name);
export const mode = {
    RO: 'readonly',
    RW: 'readwrite'
};

export const mockData = {
    tabuComputingHistory: [
        { problem: 0, instance: 'SAT instance 01', params: { a: 1, b: 2 } },
        { problem: 1, instance: 'KNAP instance 01', params: { a: 1, b: 2 } },
        { problem: 0, instance: 'SAT instance 01', params: { c: 4, d: 3 } }
    ],
    instances: [
        { content: "instance content as string ???" }
    ]
};

export function upgradeDB(db) {
    // The database did not previously exist, so create object stores and indexes.
    console.log("[DB] Creating database", db.oldVersion); // db.oldVersion === 0 means it didnt exist

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