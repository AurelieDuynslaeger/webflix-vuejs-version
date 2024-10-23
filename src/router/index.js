import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FilmsView from '../views/FilmsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ActorsView from '../views/ActorsView.vue'
import AboutView from '@/views/AboutView.vue'
import DetailMovieView from '@/views/DetailMovieView.vue'
import DetailsActorView from '@/views/DetailsActorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/films', name: 'films', component: FilmsView },
    {
      path: '/film/:id',
      name: 'DetailMovie',
      component: DetailMovieView,
    },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/actors', name: 'actors', component: ActorsView },
    {
      path: '/actor/:id',
      name: 'actorDetails',
      component: DetailsActorView,
    },
    { path: '/about', name: 'about', component: AboutView },
  ]
})

export default router
