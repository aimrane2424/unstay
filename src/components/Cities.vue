<template>
  <section id="cities" class="bg-white py-20 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-4">
          10 Villes universitaires
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Là où les étudiants en <span class="text-blue-600">ont besoin</span>
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          On couvre les villes moyennes ignorées par les autres plateformes. Là où les vrais besoins sont.
        </p>
      </div>

      <!-- Cities grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div v-for="city in cities" :key="city.name"
             @click="scrollToListings({ city: city.name })"
             class="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm card-hover">

          <!-- Color background -->
          <div class="h-28 flex items-center justify-center relative overflow-hidden"
               :style="{ background: city.gradient }">
            <span class="text-4xl z-10 relative">{{ city.emoji }}</span>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1854]/25"></div>
          </div>

          <!-- Info -->
          <div class="p-3 text-center">
            <h3 class="font-bold text-slate-800 text-sm">{{ city.name }}</h3>
            <p class="text-slate-400 text-xs mt-0.5">{{ city.uni }}</p>
            <div class="flex items-center justify-center gap-3 mt-2">
              <span class="text-xs text-blue-600 font-semibold">Dès {{ city.minPrice }} DH</span>
              <span class="text-gray-300">•</span>
              <span class="text-xs text-gray-400">{{ city.listings }} annonces</span>
            </div>
          </div>

          <!-- Priority badge -->
          <div v-if="city.priority <= 3"
               class="absolute top-2 right-2 w-5 h-5 bg-[#010f6b] text-white text-xs rounded-full flex items-center justify-center font-bold">
            {{ city.priority }}
          </div>
        </div>
      </div>

      <!-- Map hint -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center text-xl">🗺️</div>
          <div>
            <h3 class="font-bold text-[#010f6b]">Carte interactive par ville</h3>
            <p class="text-gray-500 text-sm">Temps de trajet, bus, commerces, sécurité — tout ce dont tu as besoin</p>
          </div>
        </div>
        <button @click="showMap = true" class="btn-primary text-white font-semibold px-6 py-3 rounded-xl whitespace-nowrap">
          Explorer la carte
        </button>
      </div>
    </div>
  </section>

  <MapModal v-model="showMap" />
</template>

<script setup>
import { ref } from 'vue'
import MapModal from './MapModal.vue'
import { useApp } from '../composables/useApp'
const { scrollTo, scrollToListings } = useApp()
const showMap = ref(false)

const cities = [
  { name: 'Khenifra', uni: 'USMS', emoji: '🏔️', minPrice: 500, listings: 45, priority: 1, gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
  { name: 'Beni Mellal', uni: 'USMS', emoji: '🌿', minPrice: 600, listings: 78, priority: 2, gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  { name: 'Oujda', uni: 'UMO', emoji: '🌅', minPrice: 700, listings: 120, priority: 3, gradient: 'linear-gradient(135deg, #fef3c7, #fcd34d)' },
  { name: 'Taza', uni: 'USMS', emoji: '🏡', minPrice: 450, listings: 32, priority: 4, gradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' },
  { name: 'El Jadida', uni: 'UCD', emoji: '🌊', minPrice: 800, listings: 56, priority: 5, gradient: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' },
  { name: 'Settat', uni: 'UH1', emoji: '🌾', minPrice: 550, listings: 41, priority: 6, gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' },
  { name: 'Khouribga', uni: 'UH1', emoji: '⛏️', minPrice: 500, listings: 28, priority: 7, gradient: 'linear-gradient(135deg, #fff7ed, #fed7aa)' },
  { name: 'Safi', uni: 'UCD', emoji: '🐟', minPrice: 600, listings: 38, priority: 8, gradient: 'linear-gradient(135deg, #ecfdf5, #bbf7d0)' },
  { name: 'Larache', uni: 'UAE', emoji: '⚓', minPrice: 500, listings: 22, priority: 9, gradient: 'linear-gradient(135deg, #f0fdf4, #86efac)' },
  { name: 'Nador', uni: 'UMP', emoji: '🏖️', minPrice: 700, listings: 34, priority: 10, gradient: 'linear-gradient(135deg, #fdf2f8, #f5d0fe)' },
]
</script>
