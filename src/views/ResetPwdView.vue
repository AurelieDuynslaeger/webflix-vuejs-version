<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userUpdatedPassword } from '../services/webflixApi'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const router = useRouter()
const isLoading = ref(false)
const emailRef = ref(null)
const resetEmail = ref('')
const editedPassword = ref('')
const confirmEditedPassword = ref('')

const submitEditPassword = async () => {
  isLoading.value = true
  console.log('Début submitEditPassword')
  console.log('Valeurs avant envoi:', {
    email: resetEmail.value,
    newPassword: editedPassword.value,
  })
  // Validation des champs
  if (!resetEmail.value || !editedPassword.value) {
    notification.error({
      message: 'Erreur',
      description: 'Veuillez remplir tous les champs.',
    })
    isLoading.value = false
    return
  }

  // Validation du format de l'email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(resetEmail.value)) {
    notification.error({
      message: 'Erreur',
      description: "L'adresse e-mail est invalide.",
    })
    isLoading.value = false
    return
  }
  // Validation du mot de passe (au moins 8 caractères, une lettre, un chiffre)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  if (!passwordPattern.test(editedPassword.value)) {
    notification.error({
      message: 'Erreur',
      description:
        'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.',
    })
    isLoading.value = false
    return
  }
  if (editedPassword.value !== confirmEditedPassword.value) {
    notification.error({
      message: 'Erreur',
      description: 'Les mots de passe ne correspondent pas.',
    })
    isLoading.value = false
    return
  }
  try {
    console.log('Nouveau mot de passe envoyé:', editedPassword.value)
    // Appeler l'API pour mettre à jour le mot de passe
    const response = await userUpdatedPassword(
      resetEmail.value,
      editedPassword.value,
    )
    const successMessage =
      response?.data?.message || 'Mot de passe mis à jour avec succès !'

    resetEmail.value = ''
    editedPassword.value = ''
    confirmEditedPassword.value = ''

    notification.success({
      message: 'Succès',
      description: successMessage,
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      'Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.'

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
        Réinitialisation du mot de passe
      </h2>
    </div>
    <form
      class="mt-8 space-y-6 w-3/4 lg:w-full"
      @submit.prevent="submitEditPassword"
    >
      <div>
        <label for="email" class="block text-base font-Source leading-6"
          >Email address</label
        >
        <div class="mt-2">
          <input
            v-model="resetEmail"
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
            >Nouveau mot de passe :</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="editedPassword"
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
        <div class="flex items-center justify-between">
          <label for="password" class="block text-base font-Source leading-6"
            >Confirmez le nouveau mot de passe :</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="confirmEditedPassword"
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
          <span v-if="!isLoading">Valider</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>
<style></style>
