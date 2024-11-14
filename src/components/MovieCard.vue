<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { getFavorites } from '@/services/webflixApi'

const props = defineProps({
  id: Number,
  title: String,
  overview: String,
  releaseDate: String,
  vote_average: Number,
  posterPath: String,
})

const imageUrl = `https://image.tmdb.org/t/p/w500${props.posterPath}`

const filledStars = Math.min(Math.floor(props.vote_average), 10)
const totalStars = 10

const favorites = ref([])
const isFavorite = ref(false)
// Fonction pour vérifier si le film est dans les favoris
// Fonction pour récupérer les favoris et mettre à jour l'état
const loadFavorites = async () => {
  try {
    const favoriteMovies = await getFavorites()
    favorites.value = favoriteMovies // Stocker la liste des favoris
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
  <router-link :to="{ name: 'DetailMovie', params: { id: props.id } }">
    <div
      class="max-w-xs lg:max-w-sm w-full rounded-lg overflow-hidden m-4 bg-background border-2 border-border relative"
    >
      <img
        :src="imageUrl"
        alt="Movie Poster"
        class="w-full h-48 object-cover filter grayscale"
      />

      <div class="px-6 py-4">
        <div
          class="font-bold text-base mb-2 text-primary uppercase font-Source"
        >
          {{ title }}
        </div>
        <p class="text-gray-300 text-base mb-2 line-clamp-3 font-Source">
          {{ overview }}
        </p>
        <p class="text-gray-500 text-sm">
          <strong>Date de Sortie:</strong> {{ releaseDate }}
        </p>
        <div class="flex mt-2">
          <span
            v-for="star in filledStars"
            :key="star"
            class="text-primary text-3xl"
            >&#9733;</span
          >
          <span
            v-for="star in totalStars - filledStars"
            :key="star"
            class="text-gray-300 text-3xl"
            >&#9734;</span
          >
        </div>
      </div>
      <div class="absolute -bottom-5 -right-6">
        <span v-if="isFavorite" class="text-8xl rotate-45">
          <i
            class="mr-2 pi pi-heart text-8xl text-primary -rotate-45 opacity-35"
          ></i>
        </span>
      </div>
    </div>
  </router-link>
</template>
<style>
.custom-shadow {
  box-shadow: 0 4px 6px rgb(128, 0, 0);
  border-radius: 25px; /* Violet clair */
}
</style>
