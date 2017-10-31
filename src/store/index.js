import Vue from 'vue';
import Vuex from 'vuex';
import inputParams from './modules/inputParams/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // strict: true,
    state: {
        debugMode: debug
    },
    modules: {
        inputParams
    }
});
