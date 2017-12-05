// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Tooltip from 'vue-directive-tooltip';
import VeeValidate from 'vee-validate';
import App from './App';
import store from './store';
import router from './router';
import ToastedWrapper from './plugins/Notifier';
import Filters from './services/filters';

window._ = require('lodash');
window.$eventBus = new Vue();

Vue.config.productionTip = process.env.NODE_ENV === 'demo';

Vue.use(Tooltip);
Vue.use(VeeValidate);

Vue.use(ToastedWrapper);

for (var filterKey in Filters) {
    Vue.filter(filterKey, Filters[filterKey]);
}

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});
