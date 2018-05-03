import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

export const storage = {
    set() {
        Vue.localStorage.set(...arguments);
    },
    get() {
        return Vue.localStorage.get(...arguments);
    }
};

export const storageKeys = {
    method: "activeMethod",
    problem: "activeProblem",
    selectedIndexes: "selectedIndexes",
    selectedFile: "selectedFile",
};

export const storageUtils = {
    getSelectedIndexesByTypeKey() {
        let methodIndex = storage.get(storageKeys.method);
        let problemIndex = storage.get(storageKeys.problem);
        return storageKeys.selectedIndexes + '-' + methodIndex + '-' + problemIndex
    },

    getSelectedFileKeyByProblem() {
        let problemIndex = storage.get(storageKeys.problem);
        return storageKeys.selectedFile + '-' + problemIndex;
    }
}