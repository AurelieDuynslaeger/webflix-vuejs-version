<script>
import { fetchMovieDetails, fetchMovieVideos } from '@/services/moviesApi'
export default {
  data() {
    return {
      movie: {},
      trailers: [],
    }
  },
  async created() {
    const movieId = this.$route.params.id
    try {
      this.movie = await fetchMovieDetails(movieId)
      this.trailers = await fetchMovieVideos(movieId)
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
          class="text-4xl font-semibold leading-7 text-[#00bd7e] mb-12 uppercase"
        >
          {{ movie.title }}
        </h3>
        <p class="mt-1 max-w-4xl m-auto text-xl leading-10 text-gray-300 mb-12">
          {{ movie.overview }}
        </p>
      </div>

      <!-- video trailer -->
      <div class="px-4 py-6 w-1/2">
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <div v-if="getTrailer()" class="flex justify-center">
            <iframe
              width="560"
              height="315"
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
      <dl class="divide-y divide-[#00bd7e]">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-[#00bd7e]">
            Date de Sortie
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0"
          >
            {{ formatDate(movie.release_date) }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-[#00bd7e]">Genres</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <span
              v-for="(genre, index) in movie.genres"
              :key="genre.id"
              class="inline-block mr-2"
            >
              <a href="#" class="text-indigo-600 hover:text-indigo-500">{{
                genre.name
              }}</a>
              <span v-if="index < movie.genres.length - 1">, </span>
            </span>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-[#00bd7e]">Durée</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0"
          >
            {{ formatRuntime(movie.runtime) }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-[#00bd7e]">
            Produit par
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <span
              v-for="(company, index) in movie.production_companies"
              :key="company.id"
              class="inline-block mr-2"
            >
              <a href="#" class="text-indigo-600 hover:text-indigo-500">{{
                company.name
              }}</a>
              <span v-if="index < movie.production_companies.length - 1"
                >,
              </span>
            </span>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-[#00bd7e]">Casting</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <span
              v-for="(actor, index) in movie.cast"
              :key="actor.id"
              class="inline-block mr-2"
            >
              <a href="#" class="text-indigo-600 hover:text-indigo-500">{{
                actor.name
              }}</a>
              <span v-if="index < movie.cast.length - 1">, </span>
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style></style>
