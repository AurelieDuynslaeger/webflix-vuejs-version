<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  overview: String,
  releaseDate: String,
  vote_average: Number,
  posterPath: String,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.posterPath}`

const filledStars = Math.min(Math.floor(props.vote_average), 10)
const totalStars = 10
</script>
<template>
  <router-link :to="{ name: 'DetailMovie', params: { id: props.id } }">
    <div
      class="max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 bg-background border-2 border-border"
    >
      <img
        :src="imageUrl"
        alt="Movie Poster"
        class="w-full h-48 object-cover filter grayscale"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-base mb-2 text-primary uppercase">
          {{ title }}
        </div>
        <p class="text-gray-300 text-base mb-2 line-clamp-3">{{ overview }}</p>
        <p class="text-gray-500 text-sm">
          <strong>Release Date:</strong> {{ releaseDate }}
        </p>
        <div class="flex mt-2">
          <span
            v-for="star in filledStars"
            :key="star"
            class="text-primary text-xl"
            >&#9733;</span
          >
          <span
            v-for="star in totalStars - filledStars"
            :key="star"
            class="text-gray-300 text-xl"
            >&#9734;</span
          >
        </div>
      </div>
    </div>
  </router-link>
</template>
<style></style>
