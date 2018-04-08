import Vue from 'vue';
import Vuex from 'vuex';
import { deps, missingFeatures, metFeatures } from './featureSupportCheck';
import database from './modules/database/index';
import enums from './modules/_enums';
import inputParams from './modules/inputParams';
import liveData from './modules/liveData';
import outputData from './modules/outputData';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'demo';

export default new Vuex.Store({
    strict: true,
    state: {
        debugMode: debug,
        requiredDependencies: {
            deps,
            missingFeatures: missingFeatures.length,
            metFeatures: metFeatures.length
        }
    },
    modules: {
        database,
        enums,
        inputParams,
        liveData,
        outputData
    }
});
