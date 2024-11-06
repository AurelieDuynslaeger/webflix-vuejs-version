<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/webflixApi'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import 'ant-design-vue/dist/reset.css'

const email = ref('')
const password = ref('')
const router = useRouter()
const isLoading = ref(false)
const emailRef = ref(null)
const store = useStore()
const handleSubmit = async e => {
  e.preventDefault()
  isLoading.value = true
  try {
    const response = await login(email.value, password.value)
    store.dispatch('login', response.data.token)
    message.success('Connexion réussie !')
    router.push('/account')
  } catch (error) {
    let errorMessage = "Une erreur s'est produite lors de la connexion."
    if (error.response && error.response.status === 400) {
      errorMessage = 'Email ou mot de passe incorrect.'
    } else if (error.response && error.response.status >= 500) {
      errorMessage = 'Problème de serveur, veuillez réessayer plus tard.'
    }
    message.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  emailRef.value?.focus()
})
</script>
<template>
  <div
    class="h-screen flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm text-foreground"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-20 w-auto"
        src="../assets/webflix_logo.svg"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-200"
      >
        Bienvenue à nouveau !
      </h2>
      <p class="text-center text-xl/9 font-bold tracking-tight text-gray-200">
        Connectez vous
      </p>
    </div>
    <form class="mt-8 space-y-6 w-3/4 lg:w-full" @submit="handleSubmit">
      <div>
        <label for="email" class="block text-base font-Source leading-6"
          >Email address</label
        >
        <div class="mt-2">
          <input
            v-model="email"
            ref="emailRef"
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
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Sign in</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>
<style></style>
