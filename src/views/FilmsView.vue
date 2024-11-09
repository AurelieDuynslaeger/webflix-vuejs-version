<script setup>
import { ref, onMounted } from 'vue'
import { getPopularMovies } from '@/services/moviesApi'
import MovieCard from '@/components/MovieCard.vue'
import { Skeleton } from 'ant-design-vue'

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
  <div class="mt-14 lg:mt-28 w-screen">
    <h1
      class="text-3xl lg:text-6xl font-bold mb-8 py-8 text-center text-foreground font-Bebas"
    >
      Films Populaires
    </h1>

    <div v-if="isLoading" class="mt-28 container m-auto">
      <Skeleton active :paragraph="{ rows: 4 }" />
      <Skeleton active :paragraph="{ rows: 4 }" />
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

<style>
/*type titre et paragraphe */
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-title::after,
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-paragraph
  > li::after {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(67, 35, 113, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  ) !important;
  animation-name: css-dev-only-do-not-override-17yhhjv-ant-skeleton-loading;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  content: '';
}

/* Skeleton Avatar et d'autres éléments */
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-avatar::after,
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-button::after,
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-input::after,
:where(.css-dev-only-do-not-override-17yhhjv).ant-skeleton.ant-skeleton-active
  .ant-skeleton-image::after {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(67, 35, 113, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  ) !important;
  animation-name: css-dev-only-do-not-override-17yhhjv-ant-skeleton-loading;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  content: '';
}
</style>
