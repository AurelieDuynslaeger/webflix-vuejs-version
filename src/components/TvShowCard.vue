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
      class="max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 bg-primary border-2 border-border"
    >
      <img
        :src="imageUrl"
        alt="Movie Poster"
        class="w-full h-48 object-cover filter grayscale"
      />
      <div class="px-6 py-4 bg-background">
        <div class="font-bold text-base mb-2 text-primary uppercase font-Work">
          {{ name }}
        </div>
        <p class="text-gray-300 text-base mb-2 line-clamp-3 font-Work">
          {{ overview }}
        </p>
        <p class="text-gray-500 text-sm">
          <strong>Date de Sortie:</strong> {{ firstDateAir }}
        </p>
      </div>
    </div>
  </router-link>
</template>
<style></style>
