<script setup>
import { ref, onMounted } from 'vue'
import {
  getPopularMovies,
  getGenres,
  getMoviesByGenre,
} from '@/services/moviesApi'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])
const genres = ref([])

onMounted(async () => {
  const genresResponse = await getGenres()
  genres.value = genresResponse.genres

  const moviesResponse = await getPopularMovies()
  movies.value = moviesResponse
})

// Méthode pour récupérer les films par genre
const fetchMoviesByGenre = async genreId => {
  const moviesResponse = await getMoviesByGenre(genreId)
  movies.value = moviesResponse
}
</script>

<template>
  <div class="">
    <h1 class="text-4xl font-bold mb-8 py-8 text-center text-primary">
      Catégories
    </h1>

    <!-- Liste des genres -->
    <div class="mb-8 text-center">
      <div class="flex flex-wrap justify-center max-w-6xl m-auto">
        <button
          v-for="genre in genres"
          :key="genre.id"
          @click="fetchMoviesByGenre(genre.id)"
          class="m-2 bg-chart-4 text-white py-2 px-4 rounded hover:bg-foreground hover:text-primary"
        >
          {{ genre.name }}
        </button>
      </div>
    </div>

    <!-- Liste des films -->
    <div class="flex flex-wrap justify-center">
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
