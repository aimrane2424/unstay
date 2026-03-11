<template>
  <section id="owners" class="bg-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left -->
        <div>
          <div class="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-4">
            🏘️ Propriétaires
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#010f6b] mb-4">
            Publiez votre annonce<br/>
            <span class="text-[#3b82f6]">même sans internet</span>
          </h2>
          <p class="text-gray-500 mb-8">
            50% des propriétaires ont +50 ans et n'ont pas d'email. UniStay s'adapte à vous :
            par téléphone, WhatsApp, ou visite de notre agent terrain.
          </p>

          <div class="space-y-4 mb-8">
            <div v-for="opt in options" :key="opt.title"
                 class="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#3b82f6]/30 hover:bg-blue-50/30 transition-all cursor-default">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" :class="opt.bg">
                {{ opt.icon }}
              </div>
              <div>
                <h3 class="font-bold text-[#010f6b] mb-1">{{ opt.title }}</h3>
                <p class="text-gray-500 text-sm">{{ opt.desc }}</p>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="openPublish()" class="btn-primary text-white font-semibold px-6 py-3 rounded-xl">
              Publier mon annonce
            </button>
            <a href="tel:+212600000000"
               class="border-2 border-[#010f6b] text-[#010f6b] hover:bg-[#010f6b] hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Nous appeler
            </a>
          </div>
        </div>

        <!-- Right: Stats for owners -->
        <div class="grid grid-cols-2 gap-4">
          <div v-for="stat in ownerStats" :key="stat.label"
               class="bg-gradient-to-br p-6 rounded-2xl text-center"
               :class="stat.class">
            <div class="text-3xl mb-2">{{ stat.icon }}</div>
            <p class="text-2xl font-bold mb-1" :class="stat.textClass">{{ stat.value }}</p>
            <p class="text-sm" :class="stat.subClass">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useApp } from '../composables/useApp'
const { openPublish } = useApp()

const options = [
  {
    icon: '📱',
    bg: 'bg-green-100',
    title: 'Via WhatsApp',
    desc: 'Envoyez vos photos et infos sur WhatsApp. Notre équipe crée l\'annonce pour vous.'
  },
  {
    icon: '📞',
    bg: 'bg-blue-100',
    title: 'Par téléphone',
    desc: 'Appelez-nous, on s\'occupe de tout. Simple comme un coup de fil.'
  },
  {
    icon: '🤝',
    bg: 'bg-purple-100',
    title: 'Agent terrain',
    desc: 'Notre agent vient chez vous, prend les photos, et publie l\'annonce. Gratuit.'
  },
]

const ownerStats = [
  { icon: '🎓', value: '74 700', label: 'Étudiants chercheurs', class: 'from-blue-50 to-blue-100', textClass: 'text-[#010f6b]', subClass: 'text-blue-600' },
  { icon: '⚡', value: '24h', label: 'Pour trouver un locataire', class: 'from-green-50 to-green-100', textClass: 'text-green-700', subClass: 'text-green-600' },
  { icon: '💸', value: '0 DH', label: 'Coût de publication', class: 'from-yellow-50 to-yellow-100', textClass: 'text-yellow-700', subClass: 'text-yellow-600' },
  { icon: '🛡️', value: '100%', label: 'Locataires vérifiés', class: 'from-purple-50 to-purple-100', textClass: 'text-purple-700', subClass: 'text-purple-600' },
]
</script>
