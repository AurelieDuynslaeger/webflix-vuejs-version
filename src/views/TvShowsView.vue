<script setup>
import { ref, onMounted } from 'vue'
import { getPopularTvShows } from '@/services/moviesApi'
import TvShowCard from '@/components/TvShowCard.vue'
import { Skeleton } from 'ant-design-vue'

const tvShows = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await getPopularTvShows()
    tvShows.value = response
  } catch (err) {
    error.value = 'Erreur lors de la récupération des séries.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <div class="mt-14 lg:mt-28">
    <h1
      class="text-3xl lg:text-6xl font-bold mb-8 py-8 text-center text-foreground font-Bebas"
    >
      Séries Top Rated
    </h1>

    <div v-if="isLoading" class="text-center text-white">
      <Skeleton :active="true" :paragraph="{ rows: 4 }" />
      <Skeleton :active="true" :paragraph="{ rows: 4 }" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap justify-center">
      <TvShowCard
        v-for="tvShow in tvShows"
        :key="tvShow.id"
        :id="tvShow.id"
        :name="tvShow.name"
        :firstDateAir="tvShow.first_air_date"
        :posterPath="tvShow.poster_path"
        :overview="tvShow.overview"
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
