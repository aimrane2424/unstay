<template>
  <section class="gradient-hero min-h-screen flex items-center pt-16 relative overflow-x-hidden">

    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2563eb]/15 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1d4ed8]/10 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#3b82f6]/5 blur-3xl"></div>
      <!-- Dot grid pattern -->
      <div class="absolute inset-0 opacity-10"
           style="background-image: radial-gradient(rgba(96,165,250,0.6) 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left Content -->
        <div>
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#60a5fa] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-[#3b82f6] rounded-full animate-pulse"></span>
            #1 Plateforme logement étudiant au Maroc
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Trouve ton
            <span class="text-[#3b82f6]"> logement </span>
            étudiant en
            <span class="text-[#3b82f6]"> 24h</span>
          </h1>

          <p class="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
            Annonces vérifiées, budget dès <strong class="text-white">400 DH/mois</strong>, matching colocataire intelligent.
            Fini les arnaques et la recherche interminable.
          </p>

          <!-- Stats row -->
          <div class="flex flex-wrap gap-6 mb-10">
            <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2">
              <span class="text-2xl font-bold stat-number">{{ stat.value }}</span>
              <span class="text-white/60 text-sm">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Search Box -->
          <div class="bg-white rounded-2xl p-2 shadow-2xl">
            <div class="flex flex-col sm:flex-row gap-2">
              <!-- City selector -->
              <div class="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <svg class="w-5 h-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <select v-model="search.city" class="bg-transparent flex-1 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer">
                  <option value="">Toutes les villes</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>

              <!-- Budget -->
              <div class="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <svg class="w-5 h-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <select v-model="search.budget" class="bg-transparent flex-1 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer">
                  <option value="">Budget max</option>
                  <option value="600">Jusqu'à 600 DH</option>
                  <option value="800">Jusqu'à 800 DH</option>
                  <option value="1000">Jusqu'à 1000 DH</option>
                  <option value="1500">Jusqu'à 1500 DH</option>
                  <option value="2000">Jusqu'à 2000 DH</option>
                </select>
              </div>

              <!-- Type -->
              <div class="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <svg class="w-5 h-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <select v-model="search.type" class="bg-transparent flex-1 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer">
                  <option value="">Type de logement</option>
                  <option value="Chambre seule">Chambre seule</option>
                  <option value="Colocation">Colocation</option>
                  <option value="Studio">Studio</option>
                  <option value="Appartement">Appartement</option>
                </select>
              </div>

              <button @click="doSearch" class="btn-primary text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Chercher
              </button>
            </div>
          </div>

          <!-- Quick filters -->
          <div class="flex flex-wrap gap-2 mt-4">
            <button v-for="tag in quickFilters" :key="tag.label"
                    @click="applyQuickFilter(tag)"
                    class="text-white/70 border border-white/20 hover:border-[#3b82f6] hover:text-[#3b82f6] text-xs px-3 py-1.5 rounded-full transition-all duration-200">
              {{ tag.label }}
            </button>
          </div>
        </div>

        <!-- Right - Property Cards Preview -->
        <div class="hidden lg:block relative pt-8 pb-8 pr-8 pl-2">
          <div class="relative">
            <!-- Main card -->
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden animate-float">
              <div class="relative">
                <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <svg class="w-20 h-20 text-[#3b82f6]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <!-- Verified badge -->
                  <div class="absolute top-3 left-3 badge-verified text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Vérifié
                  </div>
                  <div class="absolute top-3 right-3 bg-white/90 text-[#010f6b] text-xs font-bold px-3 py-1 rounded-full">
                    Nouveau
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="font-bold text-[#010f6b] text-base">Chambre meublée - Centre ville</h3>
                      <p class="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        Khenifra, Hay Ennour
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-[#3b82f6]">700 <span class="text-sm font-normal text-gray-400">DH</span></p>
                      <p class="text-gray-400 text-xs">/ mois</p>
                    </div>
                  </div>
                  <div class="flex gap-3 text-gray-500 text-xs mt-3 pt-3 border-t border-gray-100">
                    <span class="flex items-center gap-1 whitespace-nowrap">
                      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                      Meublée
                    </span>
                    <span class="flex items-center gap-1 whitespace-nowrap">
                      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
                      WiFi
                    </span>
                    <span class="flex items-center gap-1 whitespace-nowrap">
                      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      5 min USMS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating stats cards -->
            <div class="absolute -top-6 right-0 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-[#010f6b] text-sm">100% Vérifié</p>
                <p class="text-gray-400 text-xs">Zéro arnaque</p>
              </div>
            </div>

            <div class="absolute -bottom-6 left-0 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-[#010f6b] text-sm">Matching Colocataire</p>
                <p class="text-gray-400 text-xs">15 critères de compatibilité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave bottom -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#fbfdff"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useApp } from '../composables/useApp'

const { scrollToListings } = useApp()

const search = ref({ city: '', budget: '', type: '' })

const doSearch = () => {
  scrollToListings({ city: search.value.city, budget: search.value.budget, type: search.value.type })
}

const applyQuickFilter = (tag) => {
  scrollToListings(tag.filters || {})
}

const stats = [
  { value: '1200+', label: 'Annonces actives' },
  { value: '10', label: 'Villes couvertes' },
  { value: '400 DH', label: 'Budget min' },
]

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Safi', 'Larache', 'Nador', 'Khouribga']

const quickFilters = [
  { label: 'Moins de 600 DH', filters: { budget: '600' } },
  { label: 'Meublé', filters: {} },
  { label: 'WiFi inclus', filters: {} },
  { label: 'Près université', filters: {} },
  { label: 'Colocation', filters: { type: 'Colocation' } },
  { label: 'Filles uniquement', filters: {} },
  { label: 'Garçons uniquement', filters: {} },
]
</script>
