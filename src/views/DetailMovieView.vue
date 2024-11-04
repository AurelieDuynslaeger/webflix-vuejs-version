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
} from '@/services/webflixApi'
import 'primeicons/primeicons.css'

export default {
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
    }
  },

  async mounted() {
    const movieId = this.$route.params.id
    try {
      // Récupérer les détails du film
      this.movie = await fetchMovieDetails(movieId)
      this.trailers = await fetchMovieVideos(movieId)
      this.similars = await fetchMovieSimilar(movieId)
      this.favorites = await getFavorites(movieId)
      // this.comments = await getComments(movieId)

      // Vérifier si le film est dans les favoris
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
      console.log(`Toggle Favorite pour le film ID: ${filmId}`)
      try {
        if (this.isFavorite) {
          // Retirer des favoris
          await removeMovieFromFavorites(filmId)
          console.log('Film retiré des favoris')
          this.isFavorite =
            this.favorites.find(favoriteId => favoriteId === filmId) !==
            undefined
        } else {
          // Ajouter aux favoris
          if (!this.favorites.includes(Number(filmId))) {
            await addMovieToFavorites(filmId)
            console.log('Film ajouté aux favoris')
            this.favorites.push(filmId)
          }
        }
        // Mettre à jour l'état de isFavorite
        this.isFavorite = !this.isFavorite
        console.log(`État après modification: ${this.isFavorite}`)
        // Mettre à jour le local storage
        // localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } catch (error) {
        this.error = this.isFavorite
          ? 'Erreur lors du retrait des favoris.'
          : "Erreur lors de l'ajout aux favoris."
        console.error(this.error, error)
      }
    },
    async submitComment() {
      const filmId = Number(this.$route.params.id)
      console.log(this.newComment)

      try {
        const response = await addMovieComment(filmId, this.newComment)
        console.log('Commentaire ajouté avec succès:', response)

        // Optionnel : Ajouter le commentaire localement sans recharger
        this.comments.push(response.comment) // Assurez-vous que la réponse contient le commentaire
        this.newComment = '' // Réinitialiser le champ de saisie
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error)
      }
    },
    // Optionnel : Récupérer les commentaires existants lors du montage du composant
    async fetchComments() {
      // Vous pouvez créer une fonction d'API pour récupérer les commentaires du film
      // const response = await getCommentsForMovie(this.movieId);
      // this.comments = response.data; // Assurez-vous que la réponse contient les commentaires
    },
  },
}
</script>
<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="h-full flex flex-col justify-center w-3/4 m-auto">
    <div class="px-4 sm:px-0 text-left flex items-center justify-between">
      <div class="w-1/2 relative">
        <h3
          class="text-3xl font-bold leading-7 text-primary mb-8 uppercase font-Bebas"
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
      <div class="grid grid-cols-3 gap-4">
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
            <router-link :to="`/film/${similar.id}`" class="">
              <img
                :src="
                  similar.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${similar.poster_path}`
                    : 'path/to/default_image.jpg'
                "
                :alt="similar.original_title"
                class="rounded-lg mb-4 w-24 h-24 object-cover"
              />
            </router-link>
          </span>
        </span>
      </div>
    </div>
    <div class="px-4 py-6 flex flex-wrap">
      <h4 class="text-base font-medium leading-6 text-primary font-Bebas">
        Commentaires
      </h4>
      <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <!-- <span v-if="comments.length === 0">Aucun commentaire pour ce film.</span> -->
        <!-- <span v-else>
          <span
            v-for="similar in similars"
            :key="similar.id"
            class="inline-block mr-2 transition-transform duration-200 hover:scale-105"
          >
            <router-link :to="`/film/${similar.id}`" class="">
              <img
                :src="
                  similar.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${similar.poster_path}`
                    : 'path/to/default_image.jpg'
                "
                :alt="similar.original_title"
                class="rounded-lg mb-4 w-24 h-24 object-cover"
              />
            </router-link>
          </span>
        </span> -->
        <form @submit.prevent="submitComment">
          <textarea
            v-model="newComment"
            placeholder="Écrivez votre commentaire ici..."
            required
          ></textarea>
          <button type="submit">Ajouter un commentaire</button>
        </form>

        <div v-if="comments.length">
          <h3>Commentaires :</h3>
          <ul>
            <li v-for="comment in comments" :key="comment._id">
              {{ comment.content }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
