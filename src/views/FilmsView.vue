<script setup>
import { ref, onMounted } from 'vue'
import { getPopularMovies } from '@/services/moviesApi'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await getPopularMovies()
    movies.value = response
  } catch (err) {
    error.value = 'Erreur lors de la récupération des films.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="bg-background">
    <h1 class="text-4xl font-bold mb-8 py-8 text-center text-primary">
      Films Populaires
    </h1>

    <div v-if="isLoading" class="text-center text-white">
      Chargement des films...
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap justify-center">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :overview="movie.overview"
        :releaseDate="movie.release_date"
        :vote_average="movie.vote_average"
        :posterPath="movie.poster_path"
      />
    </div>
  </div>
</template>

<style></style>
