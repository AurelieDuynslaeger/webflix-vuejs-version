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
      <div class="container m-auto lg:flex lg:items-center lg:justify-center">
        <div class="w-full h-full lg:w-1/3">
          <img
            :src="
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : 'path/to/default_image.jpg'
            "
            :alt="actor.name"
            class="rounded-lg mb-4 w-full md:w-2/3 md:m-auto lg:w-64 h-full lg:h-96 object-cover"
          />

          <p
            v-if="actor.place_of_birth"
            class="text-sm text-gray-400 font-Source md:text-center"
          >
            {{ actor.place_of_birth }}
          </p>
          <p v-else class="text-sm text-gray-400 font-Source md:text-center">
            Lieu de naissance inconnu
          </p>
          <p class="text-md mb-4 font-Source md:text-center">
            Né(e) le: {{ formatDate(actor.birthday) }}
          </p>
        </div>

        <div class="mt-4 w-full container m-auto lg:w-2/3">
          <h1 class="text-5xl mb-2 font-Bebas md:text-center mt-4">
            {{ actor.name }}
          </h1>
          <p
            v-if="actor.biography"
            class="text-left p-4 md:text-xl text-base lg:text-xl font-Source leading-loose"
          >
            {{ actor.biography }}
          </p>
          <p v-else class="text-justify">
            Biographie indisponible pour cet acteur.
          </p>
        </div>
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
