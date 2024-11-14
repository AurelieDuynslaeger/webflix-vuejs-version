<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { getTvFavorites } from '@/services/webflixApi'

const props = defineProps({
  id: Number,
  name: String,
  overview: String,
  firstDateAir: String,
  numberOfEpisodes: Number,
  numberOfSeasons: Number,
  posterPath: String,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.posterPath}`

const favorites = ref([])
const isFavorite = ref(false)

const loadFavorites = async () => {
  try {
    const favoriteTvShows = await getTvFavorites()
    favorites.value = favoriteTvShows // Stocker la liste des favoris
    checkIfFavorite() // Vérifier si le film actuel est dans les favoris
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error)
  }
}

// Fonction pour vérifier si le film est dans les favoris
const checkIfFavorite = () => {
  isFavorite.value = favorites.value.includes(props.id)
}

watch(favorites, () => {
  checkIfFavorite()
})
// On charge les favoris lors du montage du composant
onMounted(() => {
  loadFavorites()
})
</script>
<template>
  <router-link :to="{ name: 'DetailTvShow', params: { id: props.id } }">
    <div
      class="max-w-xs lg:max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 bg-primary border-2 border-border relative"
    >
      <img
        :src="imageUrl"
        alt="Movie Poster"
        class="w-full h-48 object-cover filter grayscale"
      />
      <div class="px-6 py-4 bg-background">
        <div
          class="font-bold text-base mb-2 text-primary uppercase font-Source"
        >
          {{ name }}
        </div>
        <p class="text-gray-300 text-base mb-2 line-clamp-3 font-Source">
          {{ overview }}
        </p>
        <p class="text-gray-500 text-sm">
          <strong>Date de Sortie:</strong> {{ firstDateAir }}
        </p>
      </div>
      <div class="absolute -bottom-3 -right-5">
        <span v-if="isFavorite" class="text-6xl rotate-45">
          <i
            class="mr-2 pi pi-heart text-6xl text-primary -rotate-45 opacity-35"
          ></i>
        </span>
      </div>
    </div>
  </router-link>
</template>
<style></style>
