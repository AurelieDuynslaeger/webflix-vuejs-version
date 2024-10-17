<script setup>
import { ref, onMounted } from 'vue'
import { getMovies } from '@/services/moviesApi'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])

onMounted(async () => {
  const response = await getMovies()
  console.log(response)
  movies.value = response.results
})
</script>
<template>
  <div class="bg-gray-800">
    <h1 class="text-4xl font-bold mb-8 py-8 text-center text-[#00bd7e]">
      Films Populaires
    </h1>
    <div class="flex flex-wrap justify-center">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
        :overview="movie.overview"
        :releaseDate="movie.release_date"
        :rating="movie.vote_average"
        :posterPath="movie.poster_path"
      />
    </div>
    <pre>{{ movies }}</pre>
    <!-- Pour voir les données dans l'interface -->
  </div>
</template>
<style></style>
