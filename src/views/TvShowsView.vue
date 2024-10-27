<script setup>
import { ref, onMounted } from 'vue'
import { getPopularTvShows } from '@/services/moviesApi'
import TvShowCard from '@/components/TvShowCard.vue'

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
  <div class="bg-gray-800">
    <h1 class="text-4xl font-bold mb-8 py-8 text-center text-[#00bd7e]">
      Séries Top Rated
    </h1>

    <div v-if="isLoading" class="text-center text-white">
      Chargement des séries...
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap justify-center">
      <TvShowCard
        v-for="tvShow in tvShows"
        :key="tvShow.id"
        :id="tvShow.id"
        :name="tvShow.name"
        :firstDateAir="tvShow.first_air_date"
        :numberOfEpisodes="tvShow.number_of_episodes"
        :numberOfSeasons="tvShow.number_of_seasons"
        :posterPath="tvShow.poster_path"
        :overview="tvShow.overview"
      />
    </div>
  </div>
</template>
<style lang=""></style>
