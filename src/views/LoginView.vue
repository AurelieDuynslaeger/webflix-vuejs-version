<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/webflixApi'
import { useStore } from 'vuex'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const loginEmail = ref('')
const loginPassword = ref('')
const router = useRouter()
const isLoading = ref(false)
const emailRef = ref(null)
const store = useStore()

const handleSubmit = async e => {
  console.log('Début handleSubmit')
  console.log('Valeurs de connexion:', {
    email: loginEmail.value,
    password: loginPassword.value,
  })
  e.preventDefault()
  isLoading.value = true
  // Validation des champs
  if (!loginEmail.value || !loginPassword.value) {
    notification.error({
      message: 'Erreur',
      description: 'Veuillez remplir tous les champs.',
    })
    isLoading.value = false
    return
  }

  // Validation du format de l'email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(loginEmail.value)) {
    notification.error({
      message: 'Erreur',
      description: "L'adresse e-mail est invalide.",
    })
    isLoading.value = false
    return
  }

  // Validation du mot de passe (au moins 8 caractères, une lettre, un chiffre)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  if (!passwordPattern.test(loginPassword.value)) {
    notification.error({
      message: 'Erreur',
      description:
        'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.',
    })
    isLoading.value = false
    return
  }

  try {
    console.log('Tentative de connexion avec:', loginPassword.value)
    const response = await login(loginEmail.value, loginPassword.value)
    store.dispatch('login', response.data.token)
    notification.success({
      message: 'Succès',
      description: response.data.message || 'Connexion réussie !',
    })
    router.push('/account')
  } catch (error) {
    let errorMessage = "Une erreur s'est produite lors de la connexion."
    if (error.response && error.response.status === 400) {
      errorMessage = 'Email ou mot de passe incorrect.'
    } else if (error.response && error.response.status >= 500) {
      errorMessage = 'Problème de serveur, veuillez réessayer plus tard.'
    }
    notification.error({
      message: 'Erreur',
      description: errorMessage,
    })
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
    <RouterLink
      to="/"
      class="text-sm/6 font-semibold text-white rounded-sm p-2"
    >
      <span aria-hidden="true">←</span>
      Retour
    </RouterLink>
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
        Connectez-vous
      </p>
    </div>
    <form class="mt-8 space-y-6 w-3/4 lg:w-full" @submit="handleSubmit">
      <div>
        <label for="email" class="block text-base font-Source leading-6"
          >Email address</label
        >
        <div class="mt-2">
          <input
            v-model="loginEmail"
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
            <RouterLink
              to="/reset-password"
              class="font-semibold text-chart-4 hover:text-primary font-Source"
            >
              Mot de passe oublié ?
            </RouterLink>
          </div>
        </div>
        <div class="mt-2">
          <input
            v-model="loginPassword"
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
          class="flex w-full justify-center rounded-3xl bg-primary px-3 py-1.5 text-base font-Source leading-6 text-white shadow-sm hover:bg-chart-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
