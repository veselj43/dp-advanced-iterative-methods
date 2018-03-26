import __mapValues from 'lodash/mapValues';

export const dbName = "MyTestDatabase";
export const dbVersion = 1;

export const problemIndex = ["problem"]

export const dbStructure = {
    annealingComputingHistory: problemIndex,
    geneticComputingHistory: problemIndex,
    tabuComputingHistory: problemIndex,
    instances: problemIndex
};
export const dbTables = __mapValues(dbStructure, (tableMetaData, key) => key);

export const pk = '_id';