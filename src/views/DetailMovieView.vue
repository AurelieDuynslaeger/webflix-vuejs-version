<script>
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieSimilar,
} from '@/services/moviesApi'
export default {
  data() {
    return {
      movie: {},
      trailers: [],
      similars: [],
    }
  },
  async created() {
    const movieId = this.$route.params.id
    try {
      this.movie = await fetchMovieDetails(movieId)
      this.trailers = await fetchMovieVideos(movieId)
      this.similars = await fetchMovieSimilar(movieId)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`
    },
    // Fonction pour formater la date
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    // Fonction pour formater la durée en heures et minutes
    formatRuntime(runtime) {
      const hours = Math.floor(runtime / 60)
      const minutes = runtime % 60
      return `${hours}h${minutes}min`
    },
    // Nouvelle méthode pour obtenir l'URL de la bande-annonce
    getTrailer() {
      const trailer = this.trailers.find(
        trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube',
      )
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
    },
  },
}
</script>
<template>
  <div class="bg-gray-800 h-screen flex flex-col justify-center w-3/4 m-auto">
    <div class="px-4 sm:px-0 text-left flex items-center justify-between">
      <div class="w-1/2">
        <h3
          class="text-4xl font-semibold leading-7 text-[#00bd7e] mb-8 uppercase"
        >
          {{ movie.title }}
        </h3>
        <p class="mt-1 max-w-4xl m-auto text-xl leading-8 text-gray-300 mb-6">
          {{ movie.overview }}
        </p>
      </div>

      <!-- video trailer -->
      <div class="px-4 py-6 w-1/2">
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <div v-if="getTrailer()" class="flex justify-center">
            <iframe
              width="560"
              height="280"
              :src="getTrailer()"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <span v-else>Aucune bande-annonce disponible.</span>
        </dd>
      </div>
    </div>
    <div class="mt-6 border-t border-[#00bd7e]">
      <div class="grid grid-cols-3 gap-4">
        <!-- Colonne 1 -->
        <div class="col-span-1 p-4">
          <!-- Date de Sortie -->
          <dt class="text-base font-medium leading-6 text-[#00bd7e]">
            Date de Sortie
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-400">
            {{ formatDate(movie.release_date) }}
          </dd>

          <!-- Durée -->
          <dt class="text-base font-medium leading-6 text-[#00bd7e]">Durée</dt>
          <dd class="mt-1 text-base leading-6 text-gray-400">
            {{ formatRuntime(movie.runtime) }}
          </dd>
        </div>

        <!-- Colonne 2 -->
        <div class="col-span-1 p-4">
          <!-- Genres -->
          <dt class="text-base font-medium leading-6 text-[#00bd7e]">Genres</dt>
          <dd class="mt-1 text-base leading-6 text-gray-700">
            <span
              v-for="(genre, index) in movie.genres"
              :key="genre.id"
              class="inline-block mr-2"
            >
              <a href="#" class="text-gray-400 hover:text-[#00bd7e]">{{
                genre.name
              }}</a>
              <span v-if="index < movie.genres.length - 1">, </span>
            </span>
          </dd>
        </div>

        <!-- Colonne 3 -->
        <div class="col-span-1 p-4">
          <!-- Produit par -->
          <dt class="text-base font-medium leading-6 text-[#00bd7e]">
            Produit par
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-700">
            <ul class="list-disc pl-5">
              <li
                v-for="(company, index) in movie.production_companies"
                :key="company.id"
                class="text-gray-400 mb-1"
              >
                {{ company.name
                }}<span v-if="index < movie.production_companies.length - 1"
                  >,</span
                >
              </li>
            </ul>
          </dd>
        </div>
      </div>
    </div>
    <div class="px-4 py-6 flex flex-wrap">
      <h4 class="text-base font-medium leading-6 text-[#00bd7e]">
        Films similaires
      </h4>
      <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <span v-if="similars.length === 0">Aucun film similaire trouvé.</span>
        <span v-else>
          <span
            v-for="similar in similars"
            :key="similar.id"
            class="inline-block mr-2"
          >
            <router-link :to="`/movie/${similar.id}`" class="">
              <img
                :src="
                  similar.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${similar.poster_path}`
                    : 'path/to/default_image.jpg'
                "
                :alt="similar.original_title"
                class="rounded-lg mb-4 w-24 h-24 object-cover"
              />
            </router-link>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
