<script>
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieSimilar,
} from '@/services/moviesApi'
import {
  addMovieToFavorites,
  getFavorites,
  removeMovieFromFavorites,
  addMovieComment,
  getAllMovieComments,
  getCurrentUser,
  editMovieComment,
  deleteMovieComment,
} from '@/services/webflixApi'
import { Skeleton } from 'ant-design-vue'
import 'primeicons/primeicons.css'

export default {
  components: {
    ASkeleton: Skeleton,
  },
  data() {
    return {
      movie: {},
      trailers: [],
      similars: [],
      isLoading: true,
      error: null,
      isFavorite: false,
      favorites: [],
      newComment: '',
      comments: [],
      currentUserId: null,
      commentToEdit: null,
      updatedCommentContent: '',
      commentContent: '',
      showEditModal: false,
    }
  },
  watch: {
    showEditModal(newValue) {
      if (newValue) {
        //focus sur le textarea lorsque la modale s'ouvre
        this.$nextTick(() => {
          this.$refs.editTextarea.focus()
        })
      }
    },
  },

  async mounted() {
    const movieId = this.$route.params.id
    this.currentUserId = await getCurrentUser()

    try {
      this.movie = await fetchMovieDetails(movieId)
      this.trailers = await fetchMovieVideos(movieId)
      this.similars = await fetchMovieSimilar(movieId)
      this.favorites = await getFavorites(movieId)
      this.comments = await getAllMovieComments(Number(movieId))
      this.isFavorite = this.favorites.includes(Number(movieId))
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
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    formatRuntime(runtime) {
      const hours = Math.floor(runtime / 60)
      const minutes = runtime % 60
      return `${hours}h${minutes}min`
    },
    getTrailer() {
      const trailer = this.trailers.find(
        trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube',
      )
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
    },
    async toggleFavorite() {
      const filmId = Number(this.$route.params.id)
      try {
        if (this.isFavorite) {
          await removeMovieFromFavorites(filmId)
          this.isFavorite =
            this.favorites.find(favoriteId => favoriteId === filmId) !==
            undefined
        } else {
          if (!this.favorites.includes(Number(filmId))) {
            await addMovieToFavorites(filmId)
            this.favorites.push(filmId)
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
      const filmId = Number(this.$route.params.id)

      try {
        const response = await addMovieComment(filmId, this.newComment)
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
  <div
    v-else
    class="h-fit flex flex-col justify-center w-full lg:w-3/4 m-auto mt-28 lg:mt-40"
  >
    <div
      class="px-4 sm:px-0 text-left flex flex-col lg:flex-row items-center justify-between"
    >
      <div class="w-full lg:w-1/2 relative">
        <h3
          class="text-3xl font-bold leading-7 text-primary mb-8 uppercase font-Bebas w-80"
        >
          {{ movie.title }}
        </h3>
        <p
          class="mt-1 max-w-4xl m-auto text-sm leading-8 text-gray-300 mb-6 font-Source"
        >
          {{ movie.overview }}
        </p>
        <span
          @click.stop="toggleFavorite"
          class="cursor-pointer absolute top-0 right-8 z-10 w-4 h-4"
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

      <!-- video trailer -->
      <div class="px-4 py-6 w-1/2">
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <div v-if="getTrailer()" class="flex justify-center">
            <iframe
              width="560"
              height="280"
              :src="getTrailer()"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <span v-else>Aucune bande-annonce disponible.</span>
        </dd>
      </div>
    </div>
    <div class="mt-6 border-t border-chart-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Colonne 1 -->
        <div class="col-span-1 p-4">
          <!-- Date de Sortie -->
          <dt class="text-base font-medium leading-6 text-primary font-Bebas">
            Date de Sortie
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-400 font-Source">
            {{ formatDate(movie.release_date) }}
          </dd>

          <!-- Durée -->
          <dt class="text-base font-medium leading-6 text-primary font-Bebas">
            Durée
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-400 font-Source">
            {{ formatRuntime(movie.runtime) }}
          </dd>
        </div>

        <!-- Colonne 2 -->
        <div class="col-span-1 p-4">
          <!-- Genres -->
          <dt class="text-base font-medium leading-6 text-primary font-Bebas">
            Genres
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-700">
            <span
              v-for="(genre, index) in movie.genres"
              :key="genre.id"
              class="inline-block mr-2"
            >
              <a href="#" class="text-gray-400 hover:text-primary">{{
                genre.name
              }}</a>
              <span v-if="index < movie.genres.length - 1">, </span>
            </span>
          </dd>
        </div>

        <!-- Colonne 3 -->
        <div class="col-span-1 p-4">
          <!-- Produit par -->
          <dt class="text-base font-medium leading-6 text-primary font-Bebas">
            Produit par
          </dt>
          <dd class="mt-1 text-base leading-6 text-gray-700">
            <ul class="list-disc pl-5">
              <li
                v-for="(company, index) in movie.production_companies"
                :key="company.id"
                class="text-gray-400 mb-1"
              >
                {{ company.name
                }}<span v-if="index < movie.production_companies.length - 1"
                  >,</span
                >
              </li>
            </ul>
          </dd>
        </div>
      </div>
    </div>
    <div class="px-4 py-6 flex flex-wrap">
      <h4 class="text-base font-medium leading-6 text-primary font-Bebas">
        Films similaires
      </h4>
      <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <span v-if="similars.length === 0">Aucun film similaire trouvé.</span>
        <span v-else>
          <span
            v-for="similar in similars"
            :key="similar.id"
            class="inline-block mr-2 transition-transform duration-200 hover:scale-105"
          >
            <router-link
              :to="{ name: 'DetailMovie', params: { id: similar.id } }"
            >
              <img
                :src="
                  similar.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${similar.poster_path}`
                    : '/unavailable.png'
                "
                :alt="similar.original_title"
                class="rounded-lg mb-4 w-24 h-24 object-cover"
              />
            </router-link>
          </span>
        </span>
      </div>
    </div>
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
              <h2 class="text-white">Éditer le commentaire</h2>
              <form
                @submit.prevent="submitEdit"
                class="flex flex-col items-center w-full"
              >
                <textarea
                  v-model="commentContent"
                  placeholder="Modifiez votre commentaire..."
                  required
                  ref="editTextarea"
                  class="p-4 w-3/4 lg:w-full rounded-lg border-0 border-black"
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
