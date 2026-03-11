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

          <!-- Photo background -->
          <div class="h-28 relative overflow-hidden">
            <img :src="city.image" :alt="city.name"
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 loading="lazy" />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300"></div>
            <span class="absolute bottom-2 left-3 text-2xl">{{ city.emoji }}</span>
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
import { useRouter } from 'vue-router'
import MapModal from './MapModal.vue'
import { useApp } from '../composables/useApp'
const { searchFilters } = useApp()
const router = useRouter()
const scrollToListings = ({ city } = {}) => {
  if (city) searchFilters.value.city = city
  router.push('/logements')
}
const showMap = ref(false)

const cities = [
  { name: 'Khenifra',   uni: 'USMS', emoji: '🏔️', minPrice: 500, listings: 45,  priority: 1,  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypTihwpQliJX-xwPQYgu5mV9jn35YPbQ_bQ&s' },
  { name: 'Beni Mellal', uni: 'USMS', emoji: '🌿', minPrice: 600, listings: 78,  priority: 2,  image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=200&fit=crop&auto=format' },
  { name: 'Oujda',      uni: 'UMO',  emoji: '🌅', minPrice: 700, listings: 120, priority: 3,  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=200&fit=crop&auto=format' },
  { name: 'Taza',       uni: 'USMS', emoji: '🏡', minPrice: 450, listings: 32,  priority: 4,  image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=200&fit=crop&auto=format' },
  { name: 'El Jadida',  uni: 'UCD',  emoji: '🌊', minPrice: 800, listings: 56,  priority: 5,  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop&auto=format' },
  { name: 'Settat',     uni: 'UH1',  emoji: '🌾', minPrice: 550, listings: 41,  priority: 6,  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop&auto=format' },
  { name: 'Khouribga',  uni: 'UH1',  emoji: '⛏️', minPrice: 500, listings: 28,  priority: 7,  image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=200&fit=crop&auto=format' },
  { name: 'Safi',       uni: 'UCD',  emoji: '🐟', minPrice: 600, listings: 38,  priority: 8,  image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=200&fit=crop&auto=format' },
  { name: 'Larache',    uni: 'UAE',  emoji: '⚓',  minPrice: 500, listings: 22,  priority: 9,  image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=200&fit=crop&auto=format' },
  { name: 'Nador',      uni: 'UMP',  emoji: '🏖️', minPrice: 700, listings: 34,  priority: 10, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format' },
]
</script>
