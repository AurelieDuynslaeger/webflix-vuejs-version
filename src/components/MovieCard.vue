<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  overview: String,
  releaseDate: String,
  rating: Number,
  posterPath: String,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.posterPath}`
</script>
<template>
  <div
    class="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-gray-800 border-2 border-[#00bd7e]"
  >
    <img
      :src="imageUrl"
      alt="Movie Poster"
      class="w-full h-48 object-cover filter grayscale"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-2xl mb-2 text-[#00bd7e] uppercase">
        {{ title }}
      </div>
      <p class="text-gray-700 text-base mb-2">{{ overview }}</p>
      <p class="text-gray-600 text-sm">
        <strong>Release Date:</strong> {{ releaseDate }}
      </p>
      <p class="text-gray-600 text-sm"><strong>Rating:</strong> {{ rating }}</p>
    </div>
  </div>
</template>
<style></style>
