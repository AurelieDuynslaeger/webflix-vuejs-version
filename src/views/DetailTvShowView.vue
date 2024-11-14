<script>
import { fetchTvShowDetails } from '@/services/moviesApi'
import {
  getTvFavorites,
  removeTvShowFromFavorites,
  addMovieComment,
  getAllMovieComments,
  getCurrentUser,
  editMovieComment,
  deleteMovieComment,
  addTvShowToFavorites,
} from '@/services/webflixApi'
import { Skeleton } from 'ant-design-vue'
import 'primeicons/primeicons.css'

export default {
  components: {
    ASkeleton: Skeleton,
  },
  data() {
    return {
      tvShow: {},
      isLoading: true,
      error: null,
      isFavorite: false,
      showfavorites: [],
      newComment: '',
      comments: [],
      currentUserId: null,
      commentToEdit: null,
      updatedCommentContent: '',
      commentContent: '',
      showEditModal: false,
    }
  },
  async mounted() {
    const tvShowId = this.$route.params.id
    this.currentUserId = await getCurrentUser()
    try {
      this.tvShow = await fetchTvShowDetails(tvShowId)
      this.showfavorites = await getTvFavorites(tvShowId)
      this.comments = await getAllMovieComments(Number(tvShowId))
      this.isFavorite = this.showfavorites.includes(Number(tvShowId))
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
    async toggleFavorite() {
      const tvShowId = Number(this.$route.params.id)
      try {
        if (this.isFavorite) {
          await removeTvShowFromFavorites(tvShowId)
          this.isFavorite =
            this.showfavorites.find(favoriteId => favoriteId === tvShowId) !==
            undefined
        } else {
          if (!this.showfavorites.includes(Number(tvShowId))) {
            await addTvShowToFavorites(tvShowId)
            this.showfavorites.push(tvShowId)
          }
        }
        this.isFavorite = !this.isFavorite
      } catch (error) {
        this.error = this.isFavorite
          ? 'Erreur lors du retrait des favoris.'
          : "Erreur lors de l'ajout aux favoris."
        console.error(this.error, error)
      }
    },
    async submitComment() {
      if (!this.currentUserId) {
        console.error('Utilisateur non connecté')
        return
      }
      const tvShowId = Number(this.$route.params.id)

      try {
        const response = await addMovieComment(tvShowId, this.newComment)
        this.comments.push(response.comment)
        this.newComment = ''
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error)
      }
    },
    formatCommentDate(dateString) {
      const date = new Date(dateString)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear()).slice(-2)
      return `${day}/${month}/${year}`
    },
    async fetchCurrentUser() {
      try {
        const user = await getCurrentUser()
        this.currentUserId = user.id
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur actuel:",
          error,
        )
      }
    },
    isCommentAuthor(userId) {
      if (!this.currentUserId) {
        return false
      }
      return this.currentUserId.id === userId
    },
    openEditModal(comment) {
      this.commentContent = comment.content
      this.commentToEdit = comment
      this.showEditModal = true
    },

    editComment(comment) {
      this.commentToEdit = comment
      this.updatedCommentContent = comment.content
    },
    async submitEdit() {
      if (!this.commentToEdit) return

      try {
        this.updatedCommentContent = this.commentContent
        const response = await editMovieComment(
          this.commentToEdit._id,
          this.updatedCommentContent,
        )
        //mettre à jour la liste des commentaires
        const index = this.comments.findIndex(
          comment => comment._id === this.commentToEdit._id,
        )
        if (index !== -1) {
          this.comments.splice(index, 1, response.comment)
        }

        this.commentToEdit = null
        this.updatedCommentContent = ''
        this.commentContent = ''
        this.showEditModal = false
      } catch (error) {
        console.error('Erreur lors de la modification du commentaire:', error)
      }
    },
    cancelEdit() {
      this.commentToEdit = null
      this.commentContent = ''
      this.showEditModal = false
    },
    async deleteComment(commentId) {
      const confirmed = window.confirm(
        'Êtes-vous sûr de vouloir supprimer ce commentaire ?',
      )
      if (!confirmed) return
      try {
        await deleteMovieComment(commentId)
        this.comments = this.comments.filter(
          comment => comment._id !== commentId,
        )
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error)
      }
    },
  },
}
</script>
<template>
  <div v-if="isLoading" class="mt-28 container m-auto">
    <ASkeleton :active="true" :paragraph="{ rows: 4 }" />
    <ASkeleton :active="true" :paragraph="{ rows: 4 }" />
  </div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="mt-28 m-auto max-w-6xl">
    <!-- Bannière Principale -->
    <section
      class="relative h-80 lg:h-96 flex items-end justify-center text-center"
      :style="{
        backgroundImage: `url(${getImageUrl(tvShow.backdrop_path)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <!-- Évaluation des Spectateurs -->
      <section
        class="px-4 md:px-8 py-6 md:py-10 max-w-screen-xl mx-auto text-center text-foreground backdrop-blur-sm"
      >
        <h2 class="text-2xl mb-2 font-Bebas">Évaluation des Spectateurs</h2>
        <p class="text-4xl font-bold font-Source">
          {{ tvShow.vote_average }}
        </p>
        <p class="font-Source">Basé sur {{ tvShow.vote_count }} votes</p>
      </section>
    </section>

    <!-- Informations Clés -->
    <section
      class="px-6 md:px-12 py-8 md:py-8 max-w-screen-xl mx-auto relative flex flex-col"
    >
      <div class="flex items-center justify-center gap-40">
        <h1
          class="text-4xl md:text-6xl text-primary uppercase mb-0 text-center font-Bebas"
        >
          {{ tvShow.name }}
        </h1>

        <span
          @click.stop="toggleFavorite"
          class="cursor-pointer z-10 w-10 h-10"
        >
          <i
            :class="
              isFavorite
                ? 'mr-2 pi pi-heart-fill text-4xl text-primary'
                : 'mr-2 pi pi-heart text-4xl text-primary'
            "
          ></i>
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 font-Source mt-24">
        <div class="w-3/4">
          <h2 class="text-2xl font-semibold mb-2 text-chart-4">
            Informations Clés
          </h2>
          <p>
            <strong>Créateur(s):</strong>
            {{ tvShow.created_by.map(creator => creator.name).join(', ') }}
          </p>
          <p>
            <strong>Genre(s):</strong>
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
        </div>
        <div class="flex flex-col">
          <div>
            <h2 class="text-2xl font-semibold mb-2 text-chart-4">Résumé</h2>
            <p class="text-gray-300 leading-loose text-base">
              {{ tvShow.overview }}
            </p>
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
              :src="
                season.poster_path
                  ? getImageUrl(season.poster_path)
                  : '/unavailable.png'
              "
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

    <div class="w-full lg:w-4/5 lg:m-auto">
      <h4
        class="text-2xl font-medium leading-6 text-primary font-Bebas text-center"
      >
        Commentaires
      </h4>
      <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <form
          @submit.prevent="submitComment"
          class="flex flex-col justify-center items-center"
        >
          <textarea
            v-model="newComment"
            placeholder="Écrivez votre commentaire ici..."
            required
            class="p-4 w-3/4 lg:w-1/2 rounded-lg"
          ></textarea>

          <button
            type="submit"
            class="w-1/2 lg:w-1/4 bg-primary text-white p-2 m-2 rounded-lg"
          >
            Ajouter le commentaire
          </button>
        </form>

        <div v-if="comments.length === 0">
          <p>Aucun commentaire pour ce film.</p>
        </div>
        <div
          v-else
          class="mt-8 flex flex-col justify-center w-full p-2 lg:w-2/3 m-auto"
        >
          <ul class="flex flex-col gap-2 justify-center">
            <li
              v-for="comment in comments"
              :key="comment._id"
              class="text-gray-900 relative p-4 rounded-md bg-white bg-opacity-30 backdrop-blur-md"
            >
              <div class="flex items-center justify-between">
                <p class="text-xl">{{ comment.content }}</p>
                <p
                  class="border border-1 border-gray-400 rounded-full px-2 py-1"
                >
                  {{ comment.user.username }}
                </p>
                <span
                  class="absolute bottom-1 left-3 text-xs font-bold text-gray-400"
                  >{{ formatCommentDate(comment.createdAt) }}</span
                >
              </div>

              <div
                v-if="comment.user && isCommentAuthor(comment.user._id)"
                class="ml-4 flex gap-1 justify-end items-center"
              >
                <button
                  @click="openEditModal(comment)"
                  class="text-gray-400 px-2 py-1 rounded-md flex items-center justify-center"
                >
                  <i class="mr-2 pi pi-pen-to-square"></i>
                </button>
                <button
                  @click="deleteComment(comment._id)"
                  class="text-gray-400 px-2 py-1 rounded-md flex items-center justify-center"
                >
                  <i class="mr-2 pi pi-trash"></i>
                </button>
              </div>
            </li>
          </ul>
          <div
            v-if="showEditModal"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50"
          >
            <div
              class="bg-gray-700 bg-opacity-90 rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3"
            >
              <h2 class="text-white">Éditer le commentaire :</h2>
              <form
                @submit.prevent="submitEdit"
                class="flex flex-col items-center w-full"
              >
                <textarea
                  v-model="commentContent"
                  placeholder="Modifiez votre commentaire..."
                  required
                  ref="editTextarea"
                  class="p-4 w-3/4 lg:w-full rounded-lg border-0 border-black mb-4"
                ></textarea>
                <button
                  type="submit"
                  class="w-3/4 lg:w-2/3 bg-primary text-white p-2 m-2 rounded-2xl"
                >
                  Soumettre la modification
                </button>
                <button
                  type="button"
                  @click="cancelEdit"
                  class="w-3/4 lg:w-2/3 bg-gray-500 text-white p-2 m-2 rounded-2xl"
                >
                  Annuler
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
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
