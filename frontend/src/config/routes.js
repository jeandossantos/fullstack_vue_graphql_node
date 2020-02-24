import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import DomainList from '@/components/DomainList';
import DomainView from '@/components/DomainView';

const router = new VueRouter({
    routes: [
        {
            name: 'Domains',
            path: '/domains',
            component: DomainList
        },
        {
            path: '/',
            redirect: '/domains'
        },
        {
            name: 'DomainView',
            path: '/domains/:domain',
            component: DomainView,
            props: true
        }
    ],
    mode: 'history'
})

export default router;