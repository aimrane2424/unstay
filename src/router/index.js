import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LogementsPage from '../pages/LogementsPage.vue'
import ColocationPage from '../pages/ColocationPage.vue'
import VillesPage from '../pages/VillesPage.vue'
import ProprietairesPage from '../pages/ProprietairesPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/logements', component: LogementsPage },
  { path: '/colocation', component: ColocationPage },
  { path: '/villes', component: VillesPage },
  { path: '/proprietaires', component: ProprietairesPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})
