import __extend from 'lodash/extend';
import { storage, storageKeys, storageUtils } from '@/services/localStorage';
import resource from '@/services/resource';
import { readFile } from "@/services/fileReader";
import { getProblemClassFromId } from "@/services/classResolver";
import * as DBSchema from './DBSchema';
import DBManager from './DBManager';

var dbm = new DBManager(DBSchema.dbName, DBSchema.dbStructure, DBSchema.dbVersion);
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

    loadComputingHistory({ getters, commit }, pushOnly) {
        var params = getters.getInputData;
        var table = getTableNameByMethod(params);
        var selectedIndexes = JSON.parse(storage.get(storageUtils.getSelectedIndexesByTypeKey())) || [0];
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
        var objForDB = getters.getInputData;
        __extend(objForDB, {
            instance: getters.getComputingFile.name,
            data: {
                result: result,
                dataSet: getters.getChartValues
            }
        });
        var table = getTableNameByMethod(objForDB);
        return dbm.insert(table, objForDB).then(function(data) {
            return dispatch('loadComputingHistory', true);
        });
    },

    clearSelectedMethodComputingHistory ({ getters, dispatch }) {
        var params = getters.getInputData;
        var table = getTableNameByMethod(params);
        return dbm.remove(table, { problem: params.problem }).then(function(data) {
            return dispatch('loadComputingHistory');
        });
    },

    loadInstances ({ getters, commit }, firstLoad) { // todo rework exampleInstanceAdded to firstLoad
        var params = getters.getInputData;
        var resolveInstanceParams = getProblemClassFromId(getters.selectedProblemId).prototype.resolveInstanceParams;

        return dbm.getAll(DBSchema.dbTables.instances, { problem: params.problem }).then(function(instances) {
            if (instances.length > 0 || exampleInstanceAdded) {
                exampleInstanceAdded = true;
                commit('updateInstances', instances);
                return true;
            }
            else {
                exampleInstanceAdded = true;
                return resource.getExampleInstance().then(function(data) {
                    var instanceDbObj = {
                        problem: 0,
                        file: {
                            name: 'Example.cnf',
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
        var stringFilesArray = [];
        var promiseArray = [];

        var resolveInstanceParams = getProblemClassFromId(getters.selectedProblemId).prototype.resolveInstanceParams;

        for (var i = 0, fileDbObj; fileDbObj = filesArray[i]; i++) {
            promiseArray.push(
                readFile(fileDbObj).then((file) => {
                    stringFilesArray.push({
                        file, 
                        params: resolveInstanceParams(file.content)
                    });
                })
            );
        }

        return Promise.all(promiseArray).then(() => {
            return dispatch('addGeneratedInstances', stringFilesArray);
        });

    },

    addGeneratedInstances ({ getters, dispatch }, filesArray) {
        var inputParams = getters.getInputData;
        var toInsert = filesArray.map(fileObj => ({
            problem: inputParams.problem,
            file: fileObj.file,
            params: fileObj.params
        }));

        dispatch('insertInstances', toInsert)
    },

    insertInstances ({ getters, dispatch }, dbObjecstArray) {
        return dbm.insert(DBSchema.dbTables.instances, dbObjecstArray).then(function() {
            return dispatch('loadInstances');
        });
    },

    removeInstance ({ dispatch }, id) {
        return dbm.remove(DBSchema.dbTables.instances, id).then(function() {
            return dispatch('loadInstances');
        });
    },

    clearInstances ({ getters, dispatch }) {
        var params = getters.getInputData;
        return dbm.remove(DBSchema.dbTables.instances, { problem: params.problem }).then(function() {
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
