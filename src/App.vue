<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token')
})

const store = useStore()
const route = useRoute()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const handleLogout = () => {
  store.dispatch('logout')
  router.push('/')
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    store.dispatch('login', localStorage.getItem('token'))
  }
})
</script>

<template>
  <header class="w-full fixed top-0 left-0 z-50 bg-gray-900">
    <nav
      class="w-full flex items-center justify-between p-4 lg:p-6 lg:px-8"
      aria-label="Global"
    >
      <!-- Afficher le menu complet pour un utilisateur authentifié -->
      <div
        class="w-full flex items-center justify-around text-sm lg:text-xl"
        v-if="isAuthenticated"
      >
        <RouterLink
          to="/"
          :class="{
            'text-foreground font-bold': route.path === '/',
            'hover:scale-125': route.path !== '/',
          }"
          class="hidden lg:flex lg:items-center lg:justify-start lg:gap-1 lg:rounded-md lg:p-2"
        >
          <span class="sr-only">Webflix</span>
          <img class="h-20 w-auto" src="./assets/webflix_logo.svg" alt="" />
        </RouterLink>
        <RouterLink
          to="/films"
          :class="{
            'text-foreground font-bold': route.path === '/films',
            'hover:text-white hover:bg-gray-700': route.path !== '/films',
          }"
          class="flex items-center justify-start gap-1 rounded-md p-2"
        >
          Films
        </RouterLink>
        <RouterLink
          to="/series"
          :class="{
            'text-foreground font-bold': route.path === '/series',
            'hover:text-white hover:bg-gray-700': route.path !== '/series',
          }"
          class="flex items-center justify-start gap-1 rounded-md p-2"
        >
          Séries
        </RouterLink>
        <RouterLink
          to="/categories"
          :class="{
            'text-foreground font-bold': route.path === '/categories',
            'hover:text-white hover:bg-gray-700': route.path !== '/categories',
          }"
          class="flex items-center justify-start gap-1 rounded-md p-2"
        >
          Categories
        </RouterLink>
        <RouterLink
          to="/actors"
          :class="{
            'text-foreground font-bold': route.path === '/actors',
            'hover:text-white hover:bg-gray-700': route.path !== '/actors',
          }"
          class="flex items-center justify-start gap-1 rounded-md p-2"
        >
          Actors
        </RouterLink>
        <RouterLink
          to="/account"
          :class="{
            'text-foreground font-bold': route.path === '/account',
            'hover:text-white hover:bg-gray-700': route.path !== '/account',
          }"
          class="flex items-center justify-start gap-1 rounded-md p-2"
        >
          Profil
        </RouterLink>
        <button
          @click="handleLogout"
          class="flex items-center gap-1 p-2 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <i class="mr-2 pi pi-sign-out"></i>
        </button>
      </div>
    </nav>
  </header>
  <main class="text-foreground w-full min-h-screen overflow-x-hidden">
    <RouterView />
  </main>
</template>

<style></style>
