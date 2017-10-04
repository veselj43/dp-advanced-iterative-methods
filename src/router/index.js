import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Generator from '@/components/generator/Generator'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/generator',
            name: 'Generator',
            component: Generator
        }
    ]
})
