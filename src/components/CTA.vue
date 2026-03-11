<template>
  <section class="bg-[#010f6b] py-20 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="text-6xl mb-6">🎓</div>
      <h2 class="text-3xl sm:text-5xl font-bold text-white mb-4">
        Prêt à trouver ton<br/>
        <span class="text-[#3b82f6]">logement idéal ?</span>
      </h2>
      <p class="text-white/70 text-lg mb-10 max-w-xl mx-auto">
        Rejoins des milliers d'étudiants qui ont trouvé leur logement via UniStay.
        Gratuit, rapide, sécurisé.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="scrollTo('listings')"
                class="btn-primary text-white font-bold px-8 py-4 rounded-xl text-lg">
          Chercher un logement
        </button>
        <button @click="openAuth()"
                class="border-2 border-white/30 text-white hover:bg-white hover:text-[#010f6b] font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300">
          Publier une annonce
        </button>
      </div>
      <p class="text-white/40 text-sm mt-6">
        Disponible à Khenifra, Beni Mellal, Oujda, Taza et 6 autres villes
      </p>
    </div>
  </section>
</template>

<script setup>
import { useApp } from '../composables/useApp'
const { scrollTo, openAuth } = useApp()
</script>
