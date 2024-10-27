<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: Number,
  name: String,
  overview: String,
  firstDateAir: String,
  numberOfEpisodes: Number,
  numberOfSeasons: Number,
  posterPath: String,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.posterPath}`
</script>
<template>
  <router-link :to="{ name: 'DetailTvShow', params: { id: props.id } }">
    <div
      class="max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 bg-gray-800 border-2 border-[#00bd7e]"
    >
      <img
        :src="imageUrl"
        alt="Movie Poster"
        class="w-full h-48 object-cover filter grayscale"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-base mb-2 text-[#00bd7e] uppercase">
          {{ name }}
        </div>
        <p class="text-gray-300 text-base mb-2 line-clamp-3">{{ overview }}</p>
        <p class="text-gray-500 text-sm">
          <strong>Release Date:</strong> {{ firstDateAir }}
        </p>
        <div class="flex flex-col mt-2">
          <p>Nombre d'épisodes : {{ numberOfEpisodes }}</p>
          <p>Nombre de saisons : {{ numberOfSeasons }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style></style>
