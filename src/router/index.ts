import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ListPage from '@/pages/ListPage.vue'
import GenresPage from '@/pages/GenresPage.vue'
import UpComingPage from '@/pages/UpComingPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/upComing', component: UpComingPage },
  { path: '/genres', component: GenresPage },
  // { path: '/list', component: ListPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
