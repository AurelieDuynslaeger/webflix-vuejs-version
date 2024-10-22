<script>
import { fetchMovieDetails } from '@/services/moviesApi'
export default {
  data() {
    return {
      movie: {},
    }
  },
  async created() {
    const movieId = this.$route.params.id
    try {
      this.movie = await fetchMovieDetails(movieId)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`
    },
  },
}
</script>
<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Movie Details
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        {{ movie.overview }}
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ movie.original_title }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Release Date
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ movie.release_date }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Genres</dt>
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
          <dt class="text-sm font-medium leading-6 text-gray-900">Runtime</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ movie.runtime }} minutes
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Production Companies
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
          <dt class="text-sm font-medium leading-6 text-gray-900">Cast</dt>
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
