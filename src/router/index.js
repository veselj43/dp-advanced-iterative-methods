import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Help from '@/components/_help/Help';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        }, {
            path: '/help',
            name: 'Help',
            component: Help
        }
    ],
    scrollBehavior: (to, from, savedPosition) => (
        (savedPosition) ? savedPosition : {
            selector: `a[href='${to.hash}']`
        }
    )
});
