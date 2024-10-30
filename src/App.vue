<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)

import 'primeicons/primeicons.css'

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  // Redirige l'utilisateur si nécessaire
  router.push('/login')
}

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token')
})
</script>

<template>
  <div class="min-h-screen w-screen bg-background text-foreground">
    <div class="w-screen h-screen flex relative">
      <div
        class="p-4 w-1/8 flex flex-col justify-evenly font-Bebas border-r-2 border-primary h-full rounded-r-2xl"
      >
        <nav
          class="flex flex-col justify-envenly gap-12 my-4 text-xl font-mangoExtLt"
        >
          <RouterLink
            to="/"
            :class="{
              'text-foreground font-bold': route.path === '/',
              'hover:text-primary': route.path !== '/',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-home"></i> Home
          </RouterLink>

          <RouterLink
            to="/films"
            :class="{
              'text-foreground font-bold': route.path === '/films',
              'hover:text-primary': route.path !== '/films',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-video"></i> Films
          </RouterLink>

          <RouterLink
            to="/series"
            :class="{
              'text-foreground font-bold': route.path === '/series',
              'hover:text-primary': route.path !== '/series',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-desktop"></i> Séries
          </RouterLink>

          <RouterLink
            to="/categories"
            :class="{
              'text-foreground font-bold': route.path === '/categories',
              'hover:text-primary': route.path !== '/categories',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-filter"></i> Categories
          </RouterLink>

          <RouterLink
            to="/actors"
            :class="{
              'text-foreground font-bold': route.path === '/actors',
              'hover:text-primary': route.path !== '/actors',
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
              'hover:text-primary': route.path !== '/account',
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
        </nav>
      </div>

      <main
        class="bg-background text-foreground w-full h-screen overflow-y-auto overflow-x-hidden scrollbar-custom"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style></style>
