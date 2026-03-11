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
  { name: 'Beni Mellal', uni: 'USMS', emoji: '🌿', minPrice: 600, listings: 78,  priority: 2,  image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Beni_mellal_hh.jpg' },
  { name: 'Oujda',      uni: 'UMO',  emoji: '🌅', minPrice: 700, listings: 120, priority: 3,  image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/a8/e2/86/20171231-163829-largejpg.jpg?w=1100&h=1100&s=1' },
  { name: 'Taza',       uni: 'USMS', emoji: '🏡', minPrice: 450, listings: 32,  priority: 4,  image: 'https://www.infostourismemaroc.com/uploads/images/gallery/5ec529c86750e_taza-que-visiter-infos-tourisme-maroc.jpg' },
  { name: 'El Jadida',  uni: 'UCD',  emoji: '🌊', minPrice: 800, listings: 56,  priority: 5,  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4p0WlX0lwExZsMy9i0ArMZpgQxTG9lTKeQ&s' },
  { name: 'Settat',     uni: 'UH1',  emoji: '🌾', minPrice: 550, listings: 41,  priority: 6,  image: 'https://www.lavieeco.com/wp-content/uploads/2017/09/Settat.jpg' },
  { name: 'Khouribga',  uni: 'UH1',  emoji: '⛏️', minPrice: 500, listings: 28,  priority: 7,  image: 'https://www.lavieeco.com/wp-content/uploads/2024/06/Khouribga-1000x600.jpg' },
  { name: 'Safi',       uni: 'UCD',  emoji: '🐟', minPrice: 600, listings: 38,  priority: 8,  image: 'https://aujourdhui.ma/wp-content/uploads/2020/05/Port-de-Safi.jpg' },
  { name: 'Larache',    uni: 'UAE',  emoji: '⚓',  minPrice: 500, listings: 22,  priority: 9,  image: 'https://www.ntla9awfbladna.ma/images/destination-favorite-larache-1747213955.png' },
  { name: 'Nador',      uni: 'UMP',  emoji: '🏖️', minPrice: 700, listings: 34,  priority: 10, image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b0/e8/75/prachtige-boulevard-die.jpg?w=900&h=-1&s=1' },
]
</script>
