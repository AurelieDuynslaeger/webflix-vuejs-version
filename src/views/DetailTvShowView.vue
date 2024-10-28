<script>
import { fetchTvShowDetails } from '@/services/moviesApi'
export default {
  data() {
    return {
      tvShow: {},
      isLoading: true,
      error: null,
    }
  },
  async created() {
    const tvShowId = this.$route.params.id
    try {
      this.tvShow = await fetchTvShowDetails(tvShowId)
    } catch (error) {
      this.error = 'Erreur lors du chargement des données.'
      console.error(error)
    } finally {
      this.isLoading = false
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
  },
}
</script>
<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="w-full text-foreground">
    <!-- Bannière Principale -->
    <section
      class="relative bg-cover bg-center h-96 flex items-end justify-center text-center"
      :style="{
        backgroundImage: `url(${getImageUrl(tvShow.backdrop_path)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <!-- Évaluation des Spectateurs -->
      <section
        class="px-6 md:px-12 py-8 md:py-12 max-w-screen-xl mx-auto text-center text-foreground"
      >
        <h2 class="text-2xl font-semibold mb-2">Évaluation des Spectateurs</h2>
        <p class="text-4xl font-bold">
          {{ tvShow.vote_average }}
        </p>
        <p class="">Basé sur {{ tvShow.vote_count }} votes</p>
      </section>
    </section>

    <!-- Informations Clés -->
    <section class="px-6 md:px-12 py-8 md:py-8 max-w-screen-xl mx-auto">
      <h1
        class="text-4xl md:text-7xl text-primary uppercase mb-12 text-center font-mango"
      >
        {{ tvShow.name }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-2 text-chart-4">
            Informations Clés
          </h2>
          <p>
            <strong>Créateur(s):</strong>
            {{ tvShow.created_by.map(creator => creator.name).join(', ') }}
          </p>
          <p>
            <strong>Créateur(s):</strong>
            {{ tvShow.genres.map(genre => genre.name).join(', ') }}
          </p>
          <p>
            <strong>Durée Moyenne:</strong>
            {{ tvShow.episode_run_time[0] }} minutes
          </p>
          <p>
            <strong>Statut:</strong>
            {{ tvShow.in_production ? 'En production' : 'Terminée' }}
          </p>
          <p>
            <strong>Nombre de Saisons:</strong> {{ tvShow.number_of_seasons }}
          </p>
          <p>
            <strong>Nombre d'Épisodes:</strong> {{ tvShow.number_of_episodes }}
          </p>
          <p class="uppercase">
            <strong>Langue Originale:</strong> {{ tvShow.original_language }}
          </p>
          <a
            href="{{ tvShow.homepage }}"
            class="inline-block bg-primary hover:bg-white text-white hover:text-primary px-4 py-2 rounded m-4"
            >Site Officiel</a
          >
        </div>
        <div>
          <h2 class="text-2xl font-semibold mb-2 text-chart-4">Résumé</h2>
          <p class="text-gray-300">{{ tvShow.overview }}</p>
        </div>
      </div>
    </section>

    <!-- Épisodes Récents et À Venir -->
    <section class="px-6 md:px-12 py-8 md:py-8 max-w-screen-xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-chart-4">Épisodes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold">Dernier Épisode Diffusé</h3>
          <p><strong>Titre:</strong> {{ tvShow.last_episode_to_air.name }}</p>
          <p>
            <strong>Numéro:</strong> S{{
              tvShow.last_episode_to_air.season_number
            }}
            E{{ tvShow.last_episode_to_air.episode_number }}
          </p>
          <p>
            <strong>Date:</strong> {{ tvShow.last_episode_to_air.air_date }}
          </p>
          <p>
            <strong>Note:</strong>
            {{ tvShow.last_episode_to_air.vote_average }} / 10
          </p>
        </div>
        <!-- Réseaux de Diffusion et Compagnies de Production -->
        <div class="px-6 md:px-12 py-8 md:py-12 max-w-screen-xl mx-auto">
          <div class="flex">
            <div>
              <h2 class="text-2xl font-semibold mb-4 text-chart-4">
                Réseaux de Diffusion
              </h2>
              <div class="flex space-x-4">
                <template v-for="network in tvShow.networks" :key="network.id">
                  <img
                    :src="getImageUrl(network.logo_path)"
                    :alt="network.name"
                    class="h-6 grayscale"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Saisons Disponibles -->
    <section class="px-6 md:px-12 py-8 md:py-12 max-w-screen-xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-chart-4">
        Saisons Disponibles
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-6 gap-8">
        <template v-for="season in tvShow.seasons" :key="season.id">
          <div class="rounded-lg p-4 text-center">
            <img
              :src="getImageUrl(season.poster_path)"
              :alt="'Saison ' + season.season_number"
              class="h-40 mx-auto mb-4"
            />
            <h3 class="text-lg font-semibold">
              Saison {{ season.season_number }}
            </h3>
            <p>Épisodes: {{ season.episode_count }}</p>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style></style>
