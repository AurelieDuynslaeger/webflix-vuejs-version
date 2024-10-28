<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

import 'primeicons/primeicons.css'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen w-screen bg-background text-foreground">
    <div class="w-screen h-screen flex relative">
      <div class="p-4 w-1/8 flex flex-col justify-evenly font-Bebas">
        <nav
          class="flex flex-col justify-between space-y-4 text-xl font-mangoExtLt"
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
        </nav>

        <nav class="flex flex-col space-y-4">
          <RouterLink
            to="/login"
            :class="{
              'text-foreground font-bold': route.path === '/login',
              'hover:text-primary': route.path !== '/login',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            :class="{
              'text-primary-foreground font-bold': route.path === '/register',
              'hover:text-primary-foreground': route.path !== '/register',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            Register
          </RouterLink>
          <RouterLink
            to="/about"
            :class="{
              'text-foreground font-bold': route.path === '/about',
              'hover:text-primary': route.path !== '/about',
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            About
          </RouterLink>
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
