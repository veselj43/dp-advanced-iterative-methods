import __extend from 'lodash/extend';
import { storage, storageKeys, storageUtils } from '@/services/localStorage';
import resource from '@/services/resource';
import { readFile } from "@/services/fileReader";
import { getProblemClassFromId } from "@/services/classResolver";
import { methods, problemExampleInstances } from '../_enums';
import * as DBSchema from './DBSchema';
import DBManager from './DBManager';

let dbm = new DBManager(DBSchema.dbName, DBSchema.dbStructure, DBSchema.dbVersion);
let exampleInstanceAdded = {};

let getTableNameByMethod = function (inputData) {
    let table = (inputData.method || inputData) + 'ComputingHistory';
    return DBSchema.dbTables[table];
};

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

    loadComputingHistory({ getters, commit }, pushOnly) {
        let params = getters.getInputData;
        let table = getTableNameByMethod(params);
        let selectedIndexes = JSON.parse(storage.get(storageUtils.getSelectedIndexesByTypeKey())) || [0];
        if (pushOnly) selectedIndexes = [0]; // show just computed result
        return dbm.getAll(table, { problem: params.problem }).then(function(data) {
            commit('updateComputingHistory', data);
            commit('initComparingResults', selectedIndexes);
            return true;
        }, function (err) {
            return false;
        });
    },

    pushComputingHistory ({ getters, dispatch }, result) {
        let dbObject = getters.getInputData;
        __extend(dbObject, {
            instance: getters.getComputingFile.name,
            data: {
                result: result,
                dataSet: getters.getChartValues
            },
            $pushComputed: true
        });

        return dispatch('insertComputingHistory', dbObject);
    },

    insertComputingHistory({ dispatch }, dbObject) {
        let table = getTableNameByMethod(dbObject);

        let pushComputed = dbObject.$pushComputed;
        if (pushComputed) delete dbObject.$pushComputed;
        
        return dbm.insert(table, dbObject).then(function(data) {
            return dispatch('loadComputingHistory', pushComputed);
        });
    },

    clearComputingHistoryItemInMethodById ({ getters, dispatch }, id) {
        let params = getters.getInputData;
        let table = getTableNameByMethod(params);
        return dbm.remove(table, { _id: id }).then(function(data) {
            return dispatch('loadComputingHistory');
        });
    },

    clearComputingHistoryByMethodAndProblem ({ getters, dispatch }) {
        let params = getters.getInputData;
        let table = getTableNameByMethod(params);
        return dbm.remove(table, { problem: params.problem }).then(function(data) {
            return dispatch('loadComputingHistory');
        });
    },

    clearAllComputingHistories ({ getters, dispatch }) {
        Promise.all(methods.map(function(method) {
            let table = getTableNameByMethod(method.id);
            return dbm.remove(table);
        })).then(function(data) {
            return dispatch('loadComputingHistory');
        });
    },

    loadInstances ({ getters, commit }, firstLoad) {
        let params = getters.getInputData;
        let resolveInstanceParams = getProblemClassFromId(getters.selectedProblemId).resolveInstanceParams;

        return dbm.getAll(DBSchema.dbTables.instances, { problem: params.problem }).then(function(instances) {
            if (instances.length > 0 || exampleInstanceAdded[params.problem]) {
                exampleInstanceAdded[params.problem] = true;
                commit('updateInstances', instances);
                return true;
            }
            else {
                exampleInstanceAdded[params.problem] = true;
                return resource.getExampleInstance(problemExampleInstances[params.problem]).then(function(data) {
                    let instanceDbObj = {
                        problem: params.problem,
                        file: {
                            name: 'Example',
                            content: data.bodyText
                        },
                        params: resolveInstanceParams(data.bodyText)
                    };
                    return dbm.insert(DBSchema.dbTables.instances, instanceDbObj).then(function() {
                        commit('updateInstances', [instanceDbObj, ...instances]);
                        return true;
                    });
                });
            }
        });
    },

    addInstances ({ getters, dispatch }, filesArray) {
        let stringFilesArray = [];
        let promiseArray = [];

        let problemClassPrototype = getProblemClassFromId(getters.selectedProblemId);
        let isInvalidInstance = problemClassPrototype.isInvalidInstance;
        let resolveInstanceParams = problemClassPrototype.resolveInstanceParams;

        for (let i = 0, fileDbObj; fileDbObj = filesArray[i]; i++) {
            promiseArray.push(
                readFile(fileDbObj).then((file) => {
                    let fileDbObj = {
                        file, 
                        params: resolveInstanceParams(file.content)
                    };
                    let invalidData = isInvalidInstance(file.content);
                    if (invalidData) {
                        fileDbObj.isInvalid = invalidData;
                    }
                    stringFilesArray.push(fileDbObj);
                })
            );
        }

        return Promise.all(promiseArray).then(() => {
            return dispatch('addGeneratedInstances', stringFilesArray);
        });

    },

    addGeneratedInstances ({ getters, dispatch }, filesArray) {
        let inputParams = getters.getInputData;
        let toInsert = filesArray.map(fileObj => ({
            problem: inputParams.problem,
            ...fileObj
        }));

        return dispatch('insertInstances', toInsert);
    },

    insertInstances ({ dispatch }, dbObjecstArray) {
        if (!dbObjecstArray.length) {
            return false;
        }

        return dbm.insert(DBSchema.dbTables.instances, dbObjecstArray).then(function() {
            return dispatch('loadInstances');
        });
    },

    removeInstance ({ dispatch }, id) {
        return dbm.remove(DBSchema.dbTables.instances, id).then(function() {
            return dispatch('loadInstances');
        });
    },

    clearInstancesByProblem ({ getters, dispatch }) {
        let params = getters.getInputData;
        return dbm.remove(DBSchema.dbTables.instances, { problem: params.problem }).then(function() {
            return dispatch('loadInstances');
        });
    },

    clearAllInstances ({ getters, dispatch }) {
        let params = getters.getInputData;
        return dbm.remove(DBSchema.dbTables.instances).then(function() {
            return dispatch('loadInstances');
        });
    },

    // dev tools
    deleteDB (context) {
        console.log("[DB] deleting database ...");
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
