<script setup>
import { ref } from 'vue'
import { login } from '../services/webflixApi'

const email = ref('')
const password = ref('')

const handleSubmit = async e => {
  e.preventDefault() //Empêche le rechargement de la page

  try {
    const response = await login(email.value, password.value)
    console.log('Connexion réussie:', response.data.token)
    //stocker le token dans le localStorage ou l'état de votre application
    localStorage.setItem('token', response.data.token)
    //Rediriger vers la page d'accueil ou un tableau de bord
    //router.push('/dashboard');
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    alert(
      "Une erreur s'est produite lors de la connexion. Veuillez vérifier vos identifiants.",
    )
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-y-10">
    <h1 class="text-foreground text-6xl font-Bebas">Bienvenue!</h1>
    <p class="text-xl w-[50%] leading-10 font-Source">
      Explorez un univers cinématographique varié, de tous genres et horizons.
      Que vous soyez fan d’action, de drame ou de comédies, Webflix a ce qu’il
      vous faut pour une immersion totale, votre destination ultime pour le
      cinéma à portée de clic !
    </p>
    <div class="flex flex-col justify-center px-6 py-12 lg:px-8 w-1/2">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-16 w-auto"
          src="./../assets/webflix_logo.svg"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-Bebas leading-9 tracking-tight text-foreground"
        >
          Connectez-vous
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-foreground">
        <form class="space-y-6" @submit="handleSubmit">
          <div>
            <label for="email" class="block text-base font-Source leading-6"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-base font-Source leading-6"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-chart-4 hover:text-primary font-Source"
                  >Mot de passe oublié ?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-base font-Source leading-6 text-white shadow-sm hover:bg-chart-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-chart-4 font-Source">
          Devenir membre?
          <RouterLink
            to="/register"
            class="font-bold font-Source leading-6 text-chart-4 hover:text-primary"
          >
            Créez-vous un compte !</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
