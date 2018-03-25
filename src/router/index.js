import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Help from '@/components/_help/Help'
import TestBlbosti from '@/test/TestBlbosti'

Vue.use(Router)

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
        }, {
            path: '/test-blbosti',
            name: 'TestBlbosti',
            component: TestBlbosti
        }
    ],
    scrollBehavior: (to, from, savedPosition) => (
        (savedPosition) ? savedPosition : {
            selector: `a[href='${to.hash}']`
        }
    )
})
