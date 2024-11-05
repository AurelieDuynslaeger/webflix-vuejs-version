<script>
//get favorites
import { getFavorites } from '@/services/webflixApi'
import { fetchMovieDetails } from '@/services/moviesApi'
export default {
  data() {
    return {
      favorites: [],
      favoriteMovies: [],
    }
  },
  async created() {
    try {
      this.favorites = await getFavorites()
      const movieRequests = this.favorites.map(filmId =>
        fetchMovieDetails(filmId),
      )
      const responses = await Promise.all(movieRequests)
      this.favoriteMovies = responses
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error)
    }
  },
}
</script>

<template>
  <div class="bg-background container m-auto mt-24">
    <h1
      class="text-6xl font-bold mb-8 py-8 text-center text-foreground font-Bebas"
    >
      Mon Compte
    </h1>
    <div>
      <h2 class="text-3xl font-bold mb-8 py-8 text-foreground font-Bebas">
        Mes Favoris
      </h2>

      <div class="grid grid-cols-5 gap-4">
        <div v-for="movie in favoriteMovies" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Film Poster"
            class="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
