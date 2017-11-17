import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    getExampleInstance: function () {
        return Vue.http.get('static/exampleData/uf20-01.cnf');
    }
}
