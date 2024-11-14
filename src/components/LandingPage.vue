<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="bg-gray-900">
    <div class="mx-auto max-w-8xl py-24 sm:px-6 sm:py-32 lg:px-32">
      <div
        class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
      >
        <svg
          viewBox="0 0 1024 1024"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fill-opacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div
          class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left"
        >
          <span
            class="font-bold text-md"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :delay="500"
            :duration="1000"
          >
            Bienvenue sur
          </span>
          <img
            src="../assets/webflix_logo.svg"
            alt="webflix logo"
            class="w-full object-cover rounded shadow-md hover:shadow-lg m-0"
            v-motion
            :initial="{ opacity: 0, y: -100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="600"
            :duration="1000"
          />
          <h2
            class="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="700"
            :duration="1000"
          >
            Votre destination ultime pour la cinéma à portée de clics.
          </h2>
          <p
            class="mt-6 text-pretty text-lg/8 text-gray-300"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :delay="800"
            :duration="1000"
          >
            Explorez un univers cinématographique varié, de tous genres et
            horizons. Que vous soyez fan d’action, de drame ou de comédies,
            Webflix a ce qu’il vous faut pour peaufiner votre prochain
            binge-watching.
          </p>
          <div
            class="mt-10 flex flex-col items-center gap-2 justify-center gap-x-6 lg:justify-center lg:flex lg:flex-row"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :hovered="{ scale: 1.2 }"
            :delay="200"
            :duration="1200"
          >
            <RouterLink
              to="/login"
              class="text-sm/6 font-semibold text-white bg-primary rounded-3xl p-2 hover:bg-white hover:text-primary"
            >
              Se Connecter
              <span aria-hidden="true">→</span>
            </RouterLink>
            <RouterLink
              to="/register"
              class="text-sm/6 font-semibold text-white bg-[#4C2F64] rounded-3xl p-2 hover:bg-primary"
            >
              Créez votre compte maintenant
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
        <div
          class="relative mt-16 h-80 lg:mt-8"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0 }"
          :delay="1000"
          :duration="1000"
        >
          <img
            class="absolute left-0 top-0 w-[24rem] lg:w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src="../assets/landing_pic.png"
            alt="App screenshot"
            width="1824"
            height="1080"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
