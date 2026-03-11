<template>
  <section class="py-24 relative overflow-hidden" style="background: radial-gradient(ellipse 80% 60% at 50% 0%, #1E3A8A 0%, #0B1854 55%, #060D35 100%);">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-20"
           style="background: radial-gradient(circle, #3B82F6 0%, transparent 70%);"></div>
      <div class="absolute inset-0 opacity-[0.05]"
           style="background-image: radial-gradient(#93C5FD 1px, transparent 1px); background-size: 24px 24px;"></div>
    </div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-8">
        <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        Gratuit · Rapide · Sécurisé
      </div>
      <h2 class="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
        Prêt à trouver ton<br/>
        <span style="-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-image: linear-gradient(135deg, #60A5FA, #93C5FD); display: inline-block;">logement idéal ?</span>
      </h2>
      <p class="text-white/60 text-lg mb-10 max-w-xl mx-auto">
        Rejoins des milliers d'étudiants qui ont trouvé leur logement via UniStay.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="scrollTo('listings')" class="btn-primary text-white font-bold px-8 py-4 rounded-xl text-base">
          Chercher un logement
        </button>
        <button @click="openAuth()"
                class="bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-[#0B1854] font-bold px-8 py-4 rounded-xl text-base transition-all duration-300">
          Publier une annonce
        </button>
      </div>
      <p class="text-white/30 text-sm mt-8">
        Khenifra · Beni Mellal · Oujda · Taza · El Jadida · +5 villes
      </p>
    </div>
  </section>
</template>

<script setup>
import { useApp } from '../composables/useApp'
const { scrollTo, openAuth } = useApp()
</script>
