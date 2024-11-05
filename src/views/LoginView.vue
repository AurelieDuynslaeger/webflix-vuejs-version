<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/webflixApi'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async e => {
  e.preventDefault() //Empêche le rechargement de la page

  try {
    const response = await login(email.value, password.value)
    localStorage.setItem('token', response.data.token)
    console.log(localStorage.getItem('token'))
    message.success('Connexion réussie !')
    router.push('/account')
  } catch (error) {
    let errorMessage = "Une erreur s'est produite lors de la connexion."
    if (error.response && error.response.status === 400) {
      errorMessage = 'Email ou mot de passe incorrect.'
    }
    message.error(errorMessage)
  }
}
</script>
<template>
  <div
    class="h-screen flex flex-col items-center justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-foreground"
  >
    <form class="space-y-6 w-full" @submit="handleSubmit">
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
          <label for="password" class="block text-base font-Source leading-6"
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
  </div>
</template>
<style></style>
