import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import RegisterView from '../views/RegisterView.vue'
import FilmsView from '../views/FilmsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ActorsView from '../views/ActorsView.vue'
import AboutView from '@/views/AboutView.vue'
import DetailMovieView from '@/views/DetailMovieView.vue'
import DetailsActorView from '@/views/DetailsActorView.vue'
import TvShowsView from '@/views/TvShowsView.vue'
import DetailTvShowView from '@/views/DetailTvShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

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
    { path: '/about', name: 'about', component: AboutView },
    { path: '/account', name: 'account', component: AccountView },
  ]
})

export default router
