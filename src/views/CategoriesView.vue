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
const selectedGenres = ref(new Set())

onMounted(async () => {
  const genresResponse = await getGenres()
  genres.value = genresResponse.genres

  const moviesResponse = await getPopularMovies()
  movies.value = moviesResponse
})

// Méthode pour récupérer les films par plusieurs genres
const fetchMoviesByGenre = async genreId => {
  // Ajout ou suppression du genre sélectionné
  if (selectedGenres.value.has(genreId)) {
    selectedGenres.value.delete(genreId)
  } else {
    selectedGenres.value.add(genreId)
  }

  // Transformation en tableau pour passer à l'API
  const genreIds = Array.from(selectedGenres.value)
  const moviesResponse = await getMoviesByGenre(genreIds)
  movies.value = moviesResponse
}

// Méthode pour réinitialiser les filtres
const resetFilters = async () => {
  selectedGenres.value.clear() // Vide la sélection de genres
  const moviesResponse = await getPopularMovies() // Recharge les films populaires
  movies.value = moviesResponse
}
</script>

<template>
  <div class="mt-14 lg:mt-28">
    <h1
      class="text-3xl lg:text-6xl font-bold mb-4 py-8 text-center text-foreground font-Bebas"
    >
      Catégories
    </h1>
    <!-- Bouton de réinitialisation des filtres -->
    <div v-if="selectedGenres.size > 0" class="text-center mb-4">
      <button
        @click="resetFilters"
        class="py-2 px-4 mb-4 font-semibold text-white bg-primary rounded-3xl p-2 hover:bg-white hover:text-primary"
      >
        Réinitialiser les filtres
      </button>
    </div>

    <!-- Liste des genres -->
    <div class="mb-8 text-center">
      <div class="flex flex-wrap justify-center max-w-6xl m-auto">
        <button
          v-for="genre in genres"
          :key="genre.id"
          @click="fetchMoviesByGenre(genre.id)"
          :class="{
            'bg-primary text-white': selectedGenres.has(genre.id),
            'bg-secondary text-primary': !selectedGenres.has(genre.id),
          }"
          class="m-2 py-2 px-4 rounded hover:bg-foreground hover:text-primary"
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
