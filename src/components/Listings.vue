<template>
  <section id="listings" class="bg-[#fbfdff] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <h2 class="text-3xl font-bold text-[#010f6b]">Annonces récentes</h2>
          <p class="text-gray-500 mt-1">{{ filteredListings.length }} logements disponibles</p>
        </div>

        <!-- Filter tabs -->
        <div class="flex gap-2 flex-wrap">
          <button v-for="tab in tabs" :key="tab"
                  @click="activeTab = tab"
                  class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  :class="activeTab === tab
                    ? 'bg-[#010f6b] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3b82f6] hover:text-[#3b82f6]'">
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="listing in filteredListings" :key="listing.id"
             @click="openListing(listing)"
             class="bg-white rounded-2xl overflow-hidden card-hover cursor-pointer group">

          <!-- Image -->
          <div class="relative h-48 overflow-hidden"
               :style="{ background: listing.gradient }">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>

            <!-- Badges -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span v-if="listing.verified"
                    class="badge-verified text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Vérifié
              </span>
              <span v-if="listing.isNew"
                    class="badge-new text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Nouveau
              </span>
            </div>

            <!-- Favorite -->
            <button @click.stop="toggleFav(listing)"
                    class="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm hover:scale-110">
              <svg class="w-4 h-4 transition-colors"
                   :class="favs.has(listing.id) ? 'text-red-500 fill-current' : 'text-gray-400'"
                   :fill="favs.has(listing.id) ? 'currentColor' : 'none'"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <!-- Type badge -->
            <div class="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              {{ listing.type }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-[#010f6b] text-base truncate group-hover:text-[#3b82f6] transition-colors">
                  {{ listing.title }}
                </h3>
                <p class="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span class="truncate">{{ listing.location }}</span>
                </p>
              </div>
              <div class="text-right ml-3">
                <p class="text-xl font-bold text-[#3b82f6]">{{ listing.price }}</p>
                <p class="text-gray-400 text-xs">DH/mois</p>
              </div>
            </div>

            <!-- Features -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="feat in listing.features" :key="feat"
                    class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                {{ feat }}
              </span>
            </div>

            <!-- University distance -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="flex items-center gap-1.5 text-xs text-gray-500">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                {{ listing.university }}
              </div>
              <button @click.stop="openListing(listing)" class="text-xs text-[#3b82f6] font-semibold hover:text-[#010f6b] transition-colors">
                Voir détails →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div class="text-center mt-10">
        <button @click="showAll = !showAll"
                class="border-2 border-[#010f6b] text-[#010f6b] hover:bg-[#010f6b] hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300">
          {{ showAll ? 'Réduire' : 'Voir toutes les annonces' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useApp } from '../composables/useApp'

const { searchFilters, openListing, favs, toggleFav, listings } = useApp()

const activeTab = ref('Tous')
const showAll = ref(false)
const tabs = ['Tous', 'Chambre seule', 'Colocation', 'Studio', 'Appartement']

// Sync tab when filters change from Hero search
watch(searchFilters, (f) => {
  if (f.type) activeTab.value = f.type
}, { deep: true })

const filteredListings = computed(() => {
  let result = listings.value
  if (activeTab.value !== 'Tous') result = result.filter(l => l.tab === activeTab.value)
  if (searchFilters.value.city) result = result.filter(l => l.location.includes(searchFilters.value.city))
  if (searchFilters.value.budget) result = result.filter(l => parseInt(l.price) <= parseInt(searchFilters.value.budget))
  if (!showAll.value) return result.slice(0, 6)
  return result
})
</script>
