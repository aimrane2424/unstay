<template>
  <section class="bg-[#fbfdff] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-4">
          ⭐ Témoignages
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#010f6b]">
          Ce que disent les <span class="text-[#3b82f6]">étudiants</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="t in testimonials" :key="t.name"
             class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">

          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>

          <p class="text-gray-600 text-sm leading-relaxed mb-5 italic">"{{ t.text }}"</p>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                 :style="{ background: t.color }">
              {{ t.name[0] }}
            </div>
            <div>
              <p class="font-bold text-[#010f6b] text-sm">{{ t.name }}</p>
              <p class="text-gray-400 text-xs">{{ t.info }}</p>
            </div>
            <div v-if="t.verified" class="ml-auto">
              <span class="badge-verified text-white text-xs px-2 py-1 rounded-full">✓ Vérifié</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust bar -->
      <div class="mt-12 bg-white border border-gray-200 rounded-2xl p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="trust in trustStats" :key="trust.label">
            <p class="text-2xl font-bold text-[#010f6b] mb-1">{{ trust.value }}</p>
            <p class="text-gray-500 text-sm">{{ trust.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Yassine B.',
    info: 'Étudiant USMS Khenifra',
    text: 'J\'ai trouvé ma chambre en 2 jours ! Sur Avito ça faisait 3 semaines que je cherchais avec des arnaques partout. UniStay c\'est vraiment différent.',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    verified: true
  },
  {
    name: 'Fatima Z.',
    info: 'Étudiante UMO Oujda',
    text: 'Le matching colocataire c\'est génial ! Ma colocataire actuelle on s\'entend super bien. L\'algorithme avait raison à 92% comme prédit !',
    color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    verified: true
  },
  {
    name: 'Hamza M.',
    info: 'Propriétaire, Beni Mellal',
    text: 'J\'ai pas d\'expérience internet mais l\'agent UniStay est venu chez moi, a pris les photos et publié. J\'ai eu un locataire en 3 jours. Service top.',
    color: 'linear-gradient(135deg, #10b981, #059669)',
    verified: false
  },
]

const trustStats = [
  { value: '4.8/5', label: 'Note moyenne' },
  { value: '98%', label: 'Taux satisfaction' },
  { value: '0', label: 'Arnaques signalées' },
  { value: '< 48h', label: 'Délai moyen location' },
]
</script>
