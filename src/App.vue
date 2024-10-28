<script setup>
import { RouterLink, RouterView } from 'vue-router'

import 'primeicons/primeicons.css'
</script>

<template>
  <div class="min-h-screen w-screen bg-background text-foreground">
    <div class="w-screen h-screen flex relative">
      <div class="p-4 w-1/8 flex flex-col justify-evenly font-Abril">
        <nav
          class="flex flex-col justify-between space-y-4 text-xl font-mangoExtLt"
        >
          <RouterLink
            to="/"
            v-slot="{ isActive }"
            :class="{
              'text-foreground font-bold': isActive,
              'hover:text-primary': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-home"></i> Home
          </RouterLink>

          <RouterLink
            to="/films"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-video"></i> Films
          </RouterLink>

          <RouterLink
            to="/series"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-desktop"></i> Séries
          </RouterLink>

          <RouterLink
            to="/categories"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-filter"></i> Categories
          </RouterLink>

          <RouterLink
            to="/actors"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            <i class="mr-2 pi pi-users"></i> Actors
          </RouterLink>
        </nav>

        <nav class="flex flex-col space-y-4">
          <RouterLink
            to="/login"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            v-slot="{ isActive }"
            :class="{
              'text-primary-foreground font-bold': isActive,
              'hover:text-primary-foreground': !isActive,
            }"
            class="flex items-center justify-start gap-1 rounded-md p-2"
          >
            Register
          </RouterLink>
          <RouterLink
            to="/about"
            v-slot="{ isActive }"
            :class="{
              'text-foreground font-bold': isActive,
              'hover:text-primary': !isActive,
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
