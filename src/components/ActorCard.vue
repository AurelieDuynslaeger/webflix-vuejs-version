<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  profilePath: String,
  knownFor: Array,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.profilePath}`
</script>

<template>
  <a
    href="#"
    class="w-[450px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      :src="imageUrl"
      :alt="`Photo de ${props.name}`"
      class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg filter grayscale"
    />

    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ props.name }}
      </h5>
      <div class="mt-3">
        <h6 class="text-xl font-bold dark:text-white">Connu(e) pour :</h6>
        <div class="flex space-x-2 mt-2">
          <img
            v-for="movie in props.knownFor"
            :key="movie.id"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="`Affiche du film ${movie.title}`"
            class="w-16 h-24 object-cover rounded shadow-md hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  </a>
</template>

<style></style>
