<template>
  <section class="gradient-hero min-h-screen flex items-center pt-16 relative overflow-hidden">

    <!-- Background blobs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full opacity-20"
           style="background: radial-gradient(circle, #3B82F6 0%, transparent 70%);"></div>
      <div class="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
           style="background: radial-gradient(circle, #60A5FA 0%, transparent 70%);"></div>
      <!-- Dot grid -->
      <div class="absolute inset-0 opacity-[0.07]"
           style="background-image: radial-gradient(#93C5FD 1px, transparent 1px); background-size: 28px 28px;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- LEFT -->
        <div>
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            #1 Plateforme logement étudiant au Maroc
          </div>

          <h1 class="text-5xl sm:text-6xl lg:text-[68px] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Trouve ton<br/>
            <span style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-image: linear-gradient(135deg, #60A5FA, #93C5FD); display: inline-block;">
              logement
            </span><br/>
            en <span class="text-blue-400">24h</span>
          </h1>

          <p class="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            Annonces vérifiées · Budget dès <strong class="text-white font-semibold">400 DH/mois</strong> · Matching colocataire intelligent
          </p>

          <!-- Stats row -->
          <div class="flex flex-wrap gap-8 mb-10">
            <div v-for="stat in stats" :key="stat.label" class="flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">{{ stat.value }}</span>
              <span class="text-white/50 text-sm">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Search Box -->
          <div class="bg-white rounded-2xl p-2 shadow-2xl shadow-black/30 mb-5">
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="flex-1 flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <select v-model="search.city" class="bg-transparent flex-1 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer">
                  <option value="">Toutes les villes</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
              <div class="flex-1 flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                <svg class="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <select v-model="search.budget" class="bg-transparent flex-1 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer">
                  <option value="">Budget max</option>
                  <option value="600">Jusqu'à 600 DH</option>
                  <option value="800">Jusqu'à 800 DH</option>
                  <option value="1000">Jusqu'à 1000 DH</option>
                  <option value="1500">Jusqu'à 1500 DH</option>
                </select>
              </div>
              <button @click="doSearch" class="btn-primary text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Chercher
              </button>
            </div>
          </div>

          <!-- Quick filters -->
          <div class="flex flex-wrap gap-2">
            <button v-for="tag in quickFilters" :key="tag.label"
                    @click="applyQuickFilter(tag)"
                    class="text-white/60 border border-white/15 hover:border-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm">
              {{ tag.label }}
            </button>
          </div>
        </div>

        <!-- RIGHT - Carousel -->
        <div class="hidden lg:flex flex-col gap-4 relative">

          <!-- Carousel card -->
          <div class="relative" style="height: 320px;">
            <transition name="card-slide" mode="out-in">
              <div :key="currentCard.id"
                   class="bg-white rounded-2xl shadow-2xl overflow-hidden absolute inset-0">
                <!-- Image area -->
                <div class="h-44 relative flex items-center justify-center"
                     :style="{ background: currentCard.gradient }">
                  <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <div v-if="currentCard.verified"
                       class="absolute top-3 left-3 badge-verified text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    Vérifié
                  </div>
                  <div v-if="currentCard.isNew"
                       class="absolute top-3 right-3 bg-white/90 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">Nouveau</div>
                  <div class="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                    {{ currentCard.type }}
                  </div>
                </div>
                <!-- Info -->
                <div class="p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-slate-800 text-base truncate">{{ currentCard.title }}</h3>
                      <p class="text-slate-400 text-sm flex items-center gap-1 mt-1">
                        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                        {{ currentCard.location }}
                      </p>
                    </div>
                    <div class="text-right ml-3">
                      <p class="text-2xl font-extrabold text-blue-600">{{ currentCard.price }} <span class="text-sm font-normal text-slate-400">DH</span></p>
                      <p class="text-slate-400 text-xs">/ mois</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span v-for="feat in currentCard.features.slice(0, 3)" :key="feat"
                          class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg font-medium">{{ feat }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Dots + counter -->
          <div class="flex items-center justify-between">
            <div class="flex gap-1.5">
              <button v-for="(_, i) in listings" :key="i"
                      @click="goTo(i)"
                      class="rounded-full transition-all duration-300"
                      :class="i === cardIndex ? 'w-5 h-2 bg-blue-400' : 'w-2 h-2 bg-white/25 hover:bg-white/50'">
              </button>
            </div>
            <span class="text-white/40 text-xs">{{ cardIndex + 1 }} / {{ listings.length }}</span>
          </div>

          <!-- Two mini stat cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 text-sm">100% Vérifié</p>
                <p class="text-slate-400 text-xs">Zéro arnaque</p>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <p class="font-bold text-slate-800 text-sm">Matching</p>
                <p class="text-slate-400 text-xs">15 critères</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 64L60 56C120 48 240 32 360 24C480 16 600 16 720 22C840 28 960 40 1080 44C1200 48 1320 44 1380 42L1440 40V64H0Z" fill="#F8FAFF"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useApp } from '../composables/useApp'

const { scrollToListings, listings } = useApp()
const search = ref({ city: '', budget: '' })

const doSearch = () => scrollToListings({ city: search.value.city, budget: search.value.budget })
const applyQuickFilter = (tag) => scrollToListings(tag.filters || {})

// Carousel
const cardIndex = ref(0)
const currentCard = computed(() => listings.value[cardIndex.value])

const goTo = (i) => {
  cardIndex.value = i
}

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    cardIndex.value = (cardIndex.value + 1) % listings.value.length
  }, 3000)
})
onUnmounted(() => clearInterval(timer))

const stats = [
  { value: '1200+', label: 'annonces' },
  { value: '10', label: 'villes' },
  { value: '400 DH', label: 'budget min' },
]

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Safi', 'Larache', 'Nador', 'Khouribga']

const quickFilters = [
  { label: '< 600 DH', filters: { budget: '600' } },
  { label: 'Meublé', filters: {} },
  { label: 'WiFi inclus', filters: {} },
  { label: 'Colocation', filters: { type: 'Colocation' } },
  { label: 'Filles uniquement', filters: {} },
  { label: 'Garçons uniquement', filters: {} },
]
</script>

<style scoped>
.card-slide-enter-active,
.card-slide-leave-active {
  transition: all 0.5s ease;
}
.card-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}
.card-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.97);
}
</style>
