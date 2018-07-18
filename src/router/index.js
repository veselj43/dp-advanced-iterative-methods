import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Help from '@/components/_help/Help';
import HelpDefault from '@/components/_help/sections/Default';
import SA from '@/components/_help/sections/SA';
import GA from '@/components/_help/sections/GA';
import Tabu from '@/components/_help/sections/Tabu';
import Problems from '@/components/_help/sections/Problems/Default';

import TestChart from '@/components/devTools/TestChart';
import TestSeriesChart from '@/components/devTools/TestSeriesChart';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        }, {
            path: '/help',
            component: Help,
            children: [
                {
                    path: '/',
                    component: HelpDefault
                }, {
                    path: 'SA',
                    component: SA
                }, {
                    path: 'GA',
                    component: GA
                }, {
                    path: 'Tabu',
                    component: Tabu
                }, {
                    path: 'Problems',
                    component: Problems
                }
            ]
        }, {
            path: '/test-chart',
            component: TestChart,
        }, {
            path: '/test-chart-series',
            component: TestSeriesChart,
        }
    ],

    scrollBehavior: (to, from, savedPosition) => {
        return (to.hash) ? {
            selector: `a[href='${to.hash}']`,
            offset: { y: 20 }
        } : {
            x: 0,
            y: 0
        }
    },
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if (from.name === 'Main') {
        document.body.style.height = null;
        document.body.style.overflow = null;
    }
    next();
});

export default router;