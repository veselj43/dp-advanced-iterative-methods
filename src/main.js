// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import ToastedWrapper from './plugins/Notifier';

window._ = require('lodash');
window.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(ToastedWrapper);

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});
