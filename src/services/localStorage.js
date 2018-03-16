import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

export default {
    set() {
        Vue.localStorage.set(...arguments);
    },
    get() {
        return Vue.localStorage.get(...arguments);
    }
}