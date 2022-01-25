import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/home/index.vue'
import Detail from '@/views/detail/index.vue'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: 'dc-charts',
    },
    children: [
      {
        path: '/list',
        component: Index,
        meta: {
          title: 'dc-charts',
        },
        children: [ ]
      },
      {
        path: '/detail',
        component: Detail,
        meta: {
          title: 'dc-charts',
        },
        children: [ ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
