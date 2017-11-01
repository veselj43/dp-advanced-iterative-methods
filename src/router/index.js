import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import TestBlbosti from '@/test/TestBlbosti'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/test-blbosti',
            name: 'TestBlbosti',
            component: TestBlbosti
        }
    ]
})
