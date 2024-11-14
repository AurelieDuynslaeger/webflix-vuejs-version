<script>
//get favorites
import {
  getFavorites,
  getTvFavorites,
  removeMovieFromFavorites,
  removeTvShowFromFavorites,
} from '@/services/webflixApi'
import { fetchMovieDetails, fetchTvShowDetails } from '@/services/moviesApi'
export default {
  data() {
    return {
      favorites: [],
      favoriteMovies: [],
      showFavorites: [],
      favoritesTvShows: [],
    }
  },
  async mounted() {
    try {
      this.favorites = await getFavorites()
      this.showFavorites = await getTvFavorites()
      const movieRequests = this.favorites.map(filmId =>
        fetchMovieDetails(filmId),
      )
      const tvShowRequests = this.showFavorites.map(tvShowId =>
        fetchTvShowDetails(tvShowId),
      )
      const responses = await Promise.all(movieRequests)
      const responsesTv = await Promise.all(tvShowRequests)
      this.favoriteMovies = responses
      this.favoritesTvShows = responsesTv
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error)
    }
  },
  methods: {
    async RemoveFav(id, type) {
      try {
        if (type === 'movie') {
          await removeMovieFromFavorites(id)
          this.favoriteMovies = this.favoriteMovies.filter(
            movie => movie.id !== id,
          )
        } else if (type === 'tvShow') {
          await removeTvShowFromFavorites(id)
          this.favoritesTvShows = this.favoritesTvShows.filter(
            tvShow => tvShow.id !== id,
          )
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du favori:', error)
      }
    },
  },
}
</script>

<template>
  <div class="bg-background container m-auto mt-14 p-4 lg:mt-28">
    <h1
      class="text-3xl lg:text-6xl font-bold mb-8 py-8 text-center text-foreground font-Bebas"
    >
      Mon Compte
    </h1>
    <div>
      <h2
        class="text-xl lg:text-3xl font-bold mb-8 py-8 text-foreground font-Bebas"
      >
        Fav Films
      </h2>

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="movie in favoriteMovies" :key="movie.id" class="relative">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Film Poster"
            class="w- rounded-lg relative"
          />
          <span
            @click.stop="RemoveFav(movie.id, 'movie')"
            class="cursor-pointer absolute bottom-7 right-8 z-10 w-4 h-4"
          >
            <i
              class="mr-2 pi pi-trash text-xl text-white backdrop-blur-md p-2"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <div>
      <h2
        class="text-xl lg:text-3xl font-bold mb-8 py-8 text-foreground font-Bebas"
      >
        Fav Séries
      </h2>

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="tvShow in favoritesTvShows"
          :key="tvShow.id"
          class="relative"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`"
            alt="Tv Show Poster"
            class="w-full rounded-lg relative"
          />
          <p class="font-bold text-center mt-2">
            {{ tvShow.name }}
          </p>
          <span
            @click.stop="RemoveFav(tvShow.id, 'tvShow')"
            class="cursor-pointer absolute bottom-16 right-8 z-10 w-4 h-4"
          >
            <i
              class="mr-2 pi pi-trash text-xl text-white backdrop-blur-md p-2"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
