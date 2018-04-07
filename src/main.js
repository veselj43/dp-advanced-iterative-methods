// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Tooltip from 'vue-directive-tooltip';
import VeeValidate from 'vee-validate';
import * as uiv from 'uiv';
import App from './App';
import store from './store';
import router from './router';
import ToastedWrapper from './plugins/Notifier';
import filters from './services/filters';

// window.$eventBus = new Vue();

Vue.config.productionTip = process.env.NODE_ENV === 'demo';

Vue.use(VeeValidate);
Vue.use(uiv);
Vue.use(Tooltip, {
    delay: 0
});
Vue.use(ToastedWrapper);

for (var filterKey in filters) {
    Vue.filter(filterKey, filters[filterKey]);
}

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    created: function() {
        var vm = this;
        window.addEventListener('keydown', function(event) {
            if (event.keyCode == 112) {
                event.preventDefault();
                event.stopPropagation();
                vm.$router.push('help');
            }
        });
    }
});
