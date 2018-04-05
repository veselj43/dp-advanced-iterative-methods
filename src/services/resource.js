import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    getExampleInstance(fileName) {
        return Vue.http.get('static/exampleData/' + fileName);
    }
}
