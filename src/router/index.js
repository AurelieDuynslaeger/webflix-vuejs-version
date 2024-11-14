import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '../views/AccountView.vue'
import RegisterView from '../views/RegisterView.vue'
import FilmsView from '../views/FilmsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ActorsView from '../views/ActorsView.vue'
import DetailMovieView from '@/views/DetailMovieView.vue'
import DetailsActorView from '@/views/DetailsActorView.vue'
import TvShowsView from '@/views/TvShowsView.vue'
import DetailTvShowView from '@/views/DetailTvShowView.vue'
import LoginView from '@/views/LoginView.vue'
import LandingPage from '@/components/LandingPage.vue'
import ResetPwdView from '@/views/ResetPwdView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LandingPage },

    { path: '/register', name: 'register', component: RegisterView },
    { path: '/films', name: 'films', component: FilmsView },
    {
      path: '/film/:id',
      name: 'DetailMovie',
      component: DetailMovieView,
    },
    { path: '/series', name: 'series', component: TvShowsView },
    {
      path: '/serie/:id',
      name: 'DetailTvShow',
      component: DetailTvShowView,
    },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/actors', name: 'actors', component: ActorsView },
    {
      path: '/actor/:id',
      name: 'actorDetails',
      component: DetailsActorView,
    },
    { path: '/account', name: 'account', component: AccountView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/reset-password', name: 'reset-password', component: ResetPwdView },
  ]
})

export default router
