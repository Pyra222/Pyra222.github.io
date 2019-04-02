import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import Articles from '../components/Articles.vue'
import Info from '../components/Info.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/articles',
            name: 'articles',
            component: Articles
        },
        {
            path: '/info',
            name: 'info',
            component: Info
        },
    ]
})