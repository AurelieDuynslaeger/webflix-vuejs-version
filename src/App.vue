<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)

import 'primeicons/primeicons.css'

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('favorites')
  isAuthenticated.value = false
  // Redirige l'utilisateur si nécessaire
  router.push('/')
}

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token')
})
</script>

<template>
  <div class="h-full w-screen bg-background text-foreground">
    <header class="absolute inset-x-0 top-0 z-50 bg-background">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <RouterLink
            to="/"
            :class="{
              'text-foreground font-bold': route.path === '/',
              'hover:scale-125': route.path !== '/',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <span class="sr-only">Webflix</span>
            <img class="h-16 w-auto" src="./assets/webflix_logo.svg" alt="" />
          </RouterLink>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span class="sr-only">Menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <RouterLink
            to="/"
            :class="{
              'text-foreground font-bold': route.path === '/',
              'hover:text-primary hover:bg-slate-300': route.path !== '/',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-home"></i> Home
          </RouterLink>
          <RouterLink
            to="/films"
            :class="{
              'text-foreground font-bold': route.path === '/films',
              'hover:text-primary hover:bg-slate-300': route.path !== '/films',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-video"></i> Films
          </RouterLink>

          <RouterLink
            to="/series"
            :class="{
              'text-foreground font-bold': route.path === '/series',
              'hover:text-primary hover:bg-slate-300': route.path !== '/series',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-desktop"></i> Séries
          </RouterLink>
          <RouterLink
            to="/categories"
            :class="{
              'text-foreground font-bold': route.path === '/categories',
              'hover:text-primary hover:bg-slate-300':
                route.path !== '/categories',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-filter"></i> Categories
          </RouterLink>
          <RouterLink
            to="/actors"
            :class="{
              'text-foreground font-bold': route.path === '/actors',
              'hover:text-primary hover:bg-slate-300': route.path !== '/actors',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-users"></i> Actors
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated"
            to="/account"
            :class="{
              'text-foreground font-bold': route.path === '/account',
              'hover:text-black hover:bg-slate-300': route.path !== '/account',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-user"></i> Mon Compte
          </RouterLink>
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="flex items-center gap-1 p-2"
          >
            <i class="mr-2 pi pi-sign-out"></i> Déconnexion
          </button>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            :class="'hidden'"
            class="text-sm/6 font-semibold text-white"
            >Log in <span aria-hidden="true">&rarr;</span></RouterLink
          >
        </div>
      </nav>
      <!-- Mobile menu, show/hide based on menu open state. -->
      <div class="lg:hidden" role="dialog" aria-modal="true">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-50"></div>

        <div
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <RouterLink
              to="/"
              :class="{
                'text-foreground font-bold': route.path === '/',
                'hover:text-primary hover:bg-slate-300': route.path !== '/',
              }"
              class="flex items-center justify-start gap-1 rounded-md p-2"
            >
              <span class="sr-only">Webflix</span>
              <img class="h-16 w-auto" src="./assets/webflix_logo.svg" alt="" />
            </RouterLink>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Fermer Le Menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <RouterLink
                  to="/"
                  :class="{
                    'text-foreground font-bold': route.path === '/',
                    'hover:text-primary hover:bg-slate-300': route.path !== '/',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-home"></i> Home
                </RouterLink>
                <RouterLink
                  to="/films"
                  :class="{
                    'text-foreground font-bold': route.path === '/films',
                    'hover:text-primary hover:bg-slate-300':
                      route.path !== '/films',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-video"></i> Films
                </RouterLink>
                <RouterLink
                  to="/series"
                  :class="{
                    'text-foreground font-bold': route.path === '/series',
                    'hover:text-primary hover:bg-slate-300':
                      route.path !== '/series',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-desktop"></i> Séries
                </RouterLink>
                <RouterLink
                  to="/categories"
                  :class="{
                    'text-foreground font-bold': route.path === '/categories',
                    'hover:text-primary hover:bg-slate-300':
                      route.path !== '/categories',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-filter"></i> Categories
                </RouterLink>
                <RouterLink
                  to="/actors"
                  :class="{
                    'text-foreground font-bold': route.path === '/actors',
                    'hover:text-primary hover:bg-slate-300':
                      route.path !== '/actors',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-users"></i> Actors
                </RouterLink>
                <RouterLink
                  v-if="isAuthenticated"
                  to="/account"
                  :class="{
                    'text-foreground font-bold': route.path === '/account',
                    'hover:text-black hover:bg-slate-300':
                      route.path !== '/account',
                  }"
                  class="flex items-center justify-start gap-1 rounded-md p-2"
                >
                  <i class="mr-2 pi pi-user"></i> Mon Compte
                </RouterLink>
                <button
                  v-if="isAuthenticated"
                  @click="handleLogout"
                  class="flex items-center gap-1 p-2"
                >
                  <i class="mr-2 pi pi-sign-out"></i> Déconnexion
                </button>
              </div>
              <div class="py-6">
                <RouterLink
                  to="/login"
                  class="text-sm/6 font-semibold text-white"
                  >Log in <span aria-hidden="true">&rarr;</span></RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main
      class="bg-background text-foreground w-full h-screen overflow-x-hidden scrollbar-custom"
    >
      <RouterView />
    </main>
  </div>
</template>

<style></style>
