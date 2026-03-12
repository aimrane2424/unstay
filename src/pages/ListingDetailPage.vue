<template>
  <div class="min-h-screen bg-[#F8FAFF] pt-20">
    <!-- Not found -->
    <div v-if="!listing" class="max-w-2xl mx-auto px-4 py-20 text-center">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <h2 class="text-xl font-bold text-slate-700 mb-2">Annonce introuvable</h2>
      <p class="text-gray-400 mb-6">Cette annonce n'existe plus ou a été supprimée.</p>
      <RouterLink to="/logements" class="btn-primary text-white font-semibold px-6 py-3 rounded-xl">Voir toutes les annonces</RouterLink>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Back -->
      <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-[#010f6b] mb-6 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Retour
      </button>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        <!-- Image / Hero -->
        <div class="h-64 sm:h-80 relative flex items-center justify-center" :style="{ background: listing.gradient }">
          <svg class="w-24 h-24 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <!-- Badges -->
          <div class="absolute top-4 left-4 flex gap-2">
            <span v-if="listing.verified" class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Vérifié
            </span>
            <span v-if="listing.isNew" class="bg-white text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow">Nouveau</span>
          </div>
          <span class="absolute bottom-4 right-4 bg-white/90 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">{{ listing.type }}</span>
        </div>

        <!-- Content -->
        <div class="p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 class="text-2xl font-bold text-[#010f6b] mb-2">{{ listing.title }}</h1>
              <div class="flex items-center gap-2 text-gray-500">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm">{{ listing.location }}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="text-3xl font-extrabold text-[#3b82f6]">{{ listing.price }} <span class="text-base font-normal text-gray-400">DH</span></p>
              <p class="text-sm text-gray-400">/ mois</p>
            </div>
          </div>

          <!-- Features -->
          <div class="mb-6">
            <h3 class="font-semibold text-[#010f6b] mb-3">Équipements</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="feat in listing.features" :key="feat"
                    class="bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium px-3 py-1.5 rounded-xl">
                {{ feat }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="font-semibold text-[#010f6b] mb-3">Description</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{ listing.description || 'Logement idéal pour étudiant(e), bien situé près de l\'université. Charges comprises. Disponible immédiatement. Contactez-nous pour une visite.' }}
            </p>
          </div>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="contactOwner"
                    class="flex-1 btn-primary text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Contacter le propriétaire
            </button>
            <button @click="toggleFav"
                    class="px-6 py-3.5 border-2 rounded-xl font-semibold transition-all"
                    :class="isFav ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-400'">
              <svg class="w-5 h-5" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApp } from '../composables/useApp'

const route = useRoute()
const router = useRouter()
const { listings, toast, whatsapp } = useApp()

const listing = computed(() => {
  const id = parseInt(route.params.id)
  return listings.value.find(l => l.id === id) || null
})

const isFav = ref(false)
const toggleFav = () => { isFav.value = !isFav.value }

const contactOwner = () => {
  whatsapp(`Bonjour, je suis intéressé(e) par l'annonce "${listing.value?.title}" à ${listing.value?.location} — ${listing.value?.price} DH/mois`)
}
</script>
