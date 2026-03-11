<template>
  <section class="bg-white py-20 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left: Visual -->
        <div class="relative">
          <div class="bg-gradient-to-br from-[#0B1854] to-[#1E3A8A] rounded-3xl p-8 text-white shine-effect">
            <h3 class="text-2xl font-bold mb-6">UniStay vs Concurrents</h3>

            <div class="space-y-3">
              <div v-for="feat in comparison" :key="feat.name"
                   class="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ feat.name }}</p>
                </div>
                <div class="flex items-center gap-6 text-xs">
                  <div class="text-center w-16">
                    <p class="text-gray-400 mb-1">Avito</p>
                    <span :class="feat.avito === '✗' ? 'text-red-400' : 'text-yellow-400'">{{ feat.avito }}</span>
                  </div>
                  <div class="text-center w-16">
                    <p class="text-gray-400 mb-1">Calloc</p>
                    <span :class="feat.calloc === '✗' ? 'text-red-400' : 'text-yellow-400'">{{ feat.calloc }}</span>
                  </div>
                  <div class="text-center w-20">
                    <p class="text-[#3b82f6] font-bold mb-1">UniStay</p>
                    <span class="text-green-400 font-bold">{{ feat.unistay }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price diff -->
            <div class="mt-6 bg-[#3b82f6]/20 border border-[#3b82f6]/30 rounded-xl p-4 text-center">
              <p class="text-sm text-white/70 mb-1">Prix minimum affiché</p>
              <p class="text-3xl font-bold text-[#3b82f6]">400 DH</p>
              <p class="text-xs text-white/50 mt-1">vs 1500 DH sur Avito/Calloc</p>
              <div class="mt-2 inline-block bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                +1100 DH d'économie
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Features list -->
        <div>
          <div class="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-2 rounded-full text-sm font-medium mb-4">
            Pourquoi UniStay ?
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            La seule plateforme<br/>
            <span class="text-blue-600">100% pour étudiants</span>
          </h2>
          <p class="text-slate-500 mb-8">
            Pensée pour le contexte marocain : budgets serrés, villes moyennes, propriétaires non connectés.
          </p>

          <div class="space-y-5">
            <div v-for="feat in features" :key="feat.title"
                 class="feature-item flex gap-4 cursor-default">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                   :class="feat.bg">
                {{ feat.icon }}
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold text-slate-800">{{ feat.title }}</h3>
                  <span v-if="feat.badge" class="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-0.5 rounded-full font-medium">
                    {{ feat.badge }}
                  </span>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const comparison = [
  { name: 'Budget minimum', avito: '1500 DH', calloc: '1800 DH', unistay: '400 DH' },
  { name: 'Vérification annonces', avito: '✗', calloc: '⚡ auto', unistay: '✓ manuel' },
  { name: 'Matching colocataire', avito: '✗', calloc: '✗', unistay: '✓ unique' },
  { name: 'Infos transports', avito: '✗', calloc: '✗', unistay: '✓ unique' },
  { name: 'Agents terrain', avito: '✗', calloc: '✗', unistay: '✓ unique' },
  { name: 'Focus villes moyennes', avito: '✗', calloc: '✗', unistay: '✓' },
]

const features = [
  {
    icon: '🔍',
    bg: 'bg-blue-100',
    title: 'Moteur de recherche intelligent',
    desc: 'Filtres croisés, comparaison côte à côte, alertes personnalisées. Fini 3 semaines de recherche.',
    badge: 'Exclusif'
  },
  {
    icon: '🛡️',
    bg: 'bg-green-100',
    title: 'Vérification anti-arnaques',
    desc: 'Appel systématique, photos géolocalisées, badge "Vérifié". 70% des étudiants ont vécu une arnaque.',
    badge: null
  },
  {
    icon: '👥',
    bg: 'bg-purple-100',
    title: 'Matching colocataire (15 critères)',
    desc: 'Hygiène, sommeil, études, valeurs. On trouve ton colocataire idéal, pas juste le premier venu.',
    badge: 'Unique au Maroc'
  },
  {
    icon: '💰',
    bg: 'bg-yellow-100',
    title: 'Petits budgets inclus',
    desc: 'Filtre "Petits budgets", agents terrain pour proprios non connectés. Mission sociale.',
    badge: null
  },
  {
    icon: '🗺️',
    bg: 'bg-red-100',
    title: 'Guide quartier étudiant',
    desc: 'Temps trajet fac, bus/métro, commerces, sécurité. Tout ce qu\'on cherche en arrivant dans une ville.',
    badge: null
  },
]
</script>
