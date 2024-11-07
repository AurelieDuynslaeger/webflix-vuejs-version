<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { signup } from '@/services/webflixApi'
import 'primeicons/primeicons.css'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas !')
    return
  }

  try {
    const response = await signup(username.value, email.value, password.value)

    if (response.status === 200 || response.status === 201) {
      router.push('/')
    } else {
      throw new Error("Échec de l'inscription")
    }
  } catch (error) {
    console.error(error.response?.data || error)
    alert("Une erreur s'est produite lors de l'inscription : " + error.message)
  }
}
</script>

<template>
  <div
    class="w-full h-fit flex flex-col items-center justify-center mt-16 lg:mt-36"
  >
    <RouterLink
      to="/"
      class="text-sm/6 font-semibold text-white rounded-sm p-2"
    >
      <span aria-hidden="true">←</span>
      Retour
    </RouterLink>
    <h1
      class="text-base lg:text-4xl w-full lg:w-[50%] font-Source text-center uppercase"
    >
      Rejoignez notre communauté et commencez votre aventure cinématographique.
    </h1>
    <p class="text-sm lg:text-xl w-3/4 lg:w-[50%] font-Source text-center">
      Créez un compte pour accéder à une vaste bibliothèque de films et de
      séries.
    </p>
    <div class="flex flex-col justify-center px-6 py-4 lg:px-8 w-full lg:w-1/2">
      <div
        class="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center gap-2"
      >
        <i class="m-2 pi pi-arrow-circle-down text-base lg:text-xl"></i>
        <h2
          class="mt-6 text-center text-base lg:text-2xl font-Bebas leading-9 tracking-tight text-foreground"
        >
          c'est par ici
        </h2>
        <i class="m-2 pi pi-arrow-circle-down text-base lg:text-xl"></i>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg text-foreground">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="username" class="block text-base font-Source leading-6"
              >Nom d'utilisateur</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                v-model="username"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-base font-Source leading-6"
              >Email</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-base font-Source leading-6"
              >Mot de passe</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-base font-Source leading-6"
              >Confirmez le mot de passe</label
            >
            <div class="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                v-model="confirmPassword"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-primary p-4 text-base font-Source leading-6 text-white shadow-sm hover:bg-chart-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
