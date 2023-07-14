
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Tranfer from "@/views/Transfer/Transfer.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/transfer',
    name:'transfer',
    component: Tranfer
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router