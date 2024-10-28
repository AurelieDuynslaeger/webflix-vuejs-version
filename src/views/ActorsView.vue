<script setup>
import { ref, onMounted } from 'vue'
import { getPopularActors } from '@/services/moviesApi'
import ActorCard from '@/components/ActorCard.vue'

const actors = ref([])

// Fonction pour récupérer les acteurs populaires
const fetchActors = async () => {
  const response = await getPopularActors()
  actors.value = response
}

onMounted(fetchActors)
</script>

<template>
  <div class="">
    <h1
      class="text-6xl font-bold mb-8 py-8 text-center text-foreground font-Bebas"
    >
      Les Actrices/Acteurs les plus populaires 🔥
    </h1>

    <div class="flex flex-wrap justify-evenly gap-2">
      <ActorCard
        v-for="actor in actors"
        :key="actor.id"
        :actorId="actor.id"
        :name="actor.name"
        :original-name="actor.original_name"
        :popularity="actor.popularity"
        :profile-path="actor.profile_path"
        :known-for="actor.known_for"
      />
    </div>
  </div>
</template>

<style>
/* Ajoute ton style personnalisé ici si besoin */
</style>
