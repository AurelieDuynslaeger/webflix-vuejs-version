<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchActorDetail, fetchActorMoviesCredits } from '@/services/moviesApi'

const route = useRoute()
const actor = ref({})
const movies = ref([])

const formatDate = dateString => {
  if (!dateString) return 'Date de naissance inconnue'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const actorId = route.params.id
    // Récupérer les détails de l'acteur
    const actorResponse = await fetchActorDetail(actorId)
    actor.value = actorResponse

    // Récupérer les crédits de films de l'acteur
    const moviesResponse = await fetchActorMoviesCredits(actorId)
    movies.value = moviesResponse
  } catch (error) {
    console.error('Error fetching actor details or movies:', error)
  }
})
</script>
<template>
  <div class="p-8 text-foreground mt-20 lg:mt-36">
    <div class="flex flex-col items-center">
      <img
        :src="
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : 'path/to/default_image.jpg'
        "
        :alt="actor.name"
        class="rounded-lg mb-4 w-64 h-96 object-cover"
      />
      <h1 class="text-5xl mb-2 font-Bebas">{{ actor.name }}</h1>
      <p v-if="actor.place_of_birth" class="text-sm text-gray-400 font-Source">
        {{ actor.place_of_birth }}
      </p>
      <p v-else class="text-sm text-gray-400 font-Source">
        Lieu de naissance inconnu
      </p>
      <p class="text-md mb-4 font-Source">
        Né le: {{ formatDate(actor.birthday) }}
      </p>

      <div class="mt-4">
        <p
          v-if="actor.biography"
          class="text-left max-w-6xl leading-10 text-base lg:text-xl font-Source"
        >
          {{ actor.biography }}
        </p>
        <p v-else class="text-justify">
          Biographie indisponible pour cet acteur.
        </p>
      </div>
      <h2 class="text-2xl lg:text-5xl m-16 font-Bebas">
        Connu(e) aussi pour :
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-2">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="transition-transform duration-200 hover:scale-105"
        >
          <router-link :to="{ name: 'DetailMovie', params: { id: movie.id } }">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="h-54 rounded-xl"
            />
            <p v-else>Affiche non disponible</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
