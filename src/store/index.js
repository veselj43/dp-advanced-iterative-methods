import Vue from 'vue';
import Vuex from 'vuex';
import methods from './modules/methods/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        methods
    }
});
