<script setup>
import { RouterLink, RouterView } from 'vue-router'

import 'primeicons/primeicons.css'
</script>

<template>
  <div class="min-h-screen w-screen bg-background text-foreground">
    <div class="w-screen h-screen flex relative">
      <div class="p-4 w-1/8 flex flex-col justify-evenly">
        <img
          src="./assets/webflix_logo.svg"
          alt="webflix logo"
          class="w-full"
        />
        <nav
          class="flex flex-col justify-between space-y-4 text-xl font-mangoExtLt"
        >
          <RouterLink
            to="/"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="pi pi-home"></i> Home
          </RouterLink>

          <RouterLink
            to="/films"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="pi pi-video"></i> Films
          </RouterLink>

          <RouterLink
            to="/series"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="pi pi-desktop"></i> Séries
          </RouterLink>

          <RouterLink
            to="/categories"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="pi pi-filter"></i> Categories
          </RouterLink>

          <RouterLink
            to="/actors"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="pi pi-users"></i> Actors
          </RouterLink>
        </nav>

        <nav class="flex flex-col space-y-4">
          <RouterLink
            to="/login"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
          >
            Register
          </RouterLink>
          <RouterLink
            to="/about"
            class="hover:text-primary-foreground hover:font-bold flex items-center justify-start gap-1 rounded-md p-2"
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
