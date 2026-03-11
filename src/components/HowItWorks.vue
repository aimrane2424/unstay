<template>
  <section id="how" class="bg-[#f5f8ff] py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-4">
          Simple et rapide
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Trouve ton logement en <span class="text-blue-600">3 étapes</span>
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          Une plateforme pensée pour les étudiants marocains. Simple, rapide, sécurisée.
        </p>
      </div>

      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-8 relative">
        <!-- Connector line -->
        <div class="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#3b82f6]/30 via-[#3b82f6] to-[#3b82f6]/30"></div>

        <div v-for="(step, i) in steps" :key="i"
             class="relative text-center group">
          <!-- Step number -->
          <div class="relative inline-flex mb-6">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                 :style="{ background: `linear-gradient(135deg, ${step.color1}, ${step.color2})` }">
              {{ step.icon }}
            </div>
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#0B1854] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {{ i + 1 }}
            </div>
          </div>

          <h3 class="text-xl font-bold text-slate-800 mb-3">{{ step.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ step.desc }}</p>

          <!-- Features list -->
          <ul class="mt-4 space-y-2 text-left">
            <li v-for="feat in step.features" :key="feat"
                class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4 text-[#3b82f6] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feat }}
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <button @click="scrollTo('listings')" class="btn-primary text-white font-semibold px-8 py-4 rounded-xl text-lg">
          Commencer maintenant — c'est gratuit
        </button>
        <p class="text-gray-400 text-sm mt-3">Plus de 1000 étudiants nous font confiance</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useApp } from '../composables/useApp'
const { scrollTo } = useApp()

const steps = [
  {
    icon: '🔍',
    color1: '#dbeafe',
    color2: '#bfdbfe',
    title: 'Cherche & Filtre',
    desc: 'Utilise nos filtres intelligents pour trouver le logement qui correspond à ton budget et tes critères.',
    features: [
      'Filtres croisés avancés',
      'Carte interactive des quartiers',
      'Comparaison côte à côte',
      'Alertes personnalisées',
    ]
  },
  {
    icon: '✅',
    color1: '#d1fae5',
    color2: '#a7f3d0',
    title: 'Annonces Vérifiées',
    desc: 'Chaque annonce est vérifiée manuellement par notre équipe terrain. Badge "Vérifié" = zéro arnaque.',
    features: [
      'Appel systématique propriétaire',
      'Photos géolocalisées',
      'Badge "Vérifié UniStay"',
      'Historique traçable',
    ]
  },
  {
    icon: '🤝',
    color1: '#ede9fe',
    color2: '#ddd6fe',
    title: 'Contacte & Emménage',
    desc: 'Contacte directement le propriétaire via la plateforme. Contrat numérique et paiement sécurisé.',
    features: [
      'Messagerie sécurisée',
      'Contrat numérique',
      'Paiement wallet (phase 2)',
      'Support 7j/7',
    ]
  },
]
</script>
