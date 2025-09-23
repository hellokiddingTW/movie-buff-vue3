import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ListPage from '@/pages/ListPage.vue'
import NowPlayingPage from '@/pages/NowPlayingPage.vue'
import UpComingPage from '@/pages/UpComingPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/list', component: ListPage },
  { path: '/nowPlaying', component: NowPlayingPage },
  { path: '/upComing', component: UpComingPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

export default router
