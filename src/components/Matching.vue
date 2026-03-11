<template>
  <section id="colocation" class="bg-[#010f6b] py-20 relative overflow-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left: Criteria -->
        <div>
          <div class="inline-flex items-center gap-2 bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#60a5fa] px-4 py-2 rounded-full text-sm font-medium mb-6">
            🤝 Matching Colocataire
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trouve ton colocataire<br/>
            <span class="text-[#3b82f6]">parfait</span> en 12 critères
          </h2>
          <p class="text-white/70 mb-6 leading-relaxed">
            Clique sur chaque critère pour définir tes préférences. Notre algorithme trouve ton colocataire idéal.
          </p>

          <!-- Criteria grid - interactive -->
          <div class="grid grid-cols-2 gap-3 mb-8">
            <button v-for="crit in criteria" :key="crit.key"
                    @click="user ? toggleCrit(crit) : openAuth()"
                    class="flex items-center gap-3 border rounded-xl p-3 transition-all text-left"
                    :class="myPrefs[crit.key]
                      ? 'bg-[#3b82f6]/30 border-[#3b82f6] shadow-lg shadow-[#3b82f6]/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'">
              <span class="text-xl shrink-0">{{ crit.icon }}</span>
              <div class="min-w-0">
                <p class="text-white text-sm font-medium">{{ crit.label }}</p>
                <p class="text-xs mt-0.5"
                   :class="myPrefs[crit.key] ? 'text-[#60a5fa] font-medium' : 'text-white/40'">
                  {{ myPrefs[crit.key] ? myPrefs[crit.key] : crit.desc }}
                </p>
              </div>
              <div v-if="myPrefs[crit.key]"
                   class="ml-auto w-4 h-4 bg-[#3b82f6] rounded-full flex items-center justify-center shrink-0">
                <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </button>
          </div>

          <!-- Progress -->
          <div v-if="user" class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/60 text-sm">Profil complété</span>
              <span class="text-white font-semibold text-sm">{{ completedCount }}/{{ criteria.length }}</span>
            </div>
            <div class="h-2 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] transition-all duration-500"
                   :style="{ width: (completedCount / criteria.length * 100) + '%' }"></div>
            </div>
          </div>

          <button @click="user ? findMatch() : openAuth()"
                  class="btn-primary text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {{ user ? 'Trouver mon colocataire idéal' : 'Connectez-vous pour matcher' }}
          </button>
        </div>

        <!-- Right: Match card -->
        <div class="flex justify-center">
          <div class="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#010f6b] flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <div>
                <h3 class="font-bold text-[#010f6b] text-base">Fatima Z.</h3>
                <p class="text-gray-400 text-xs">🎓 USMS Khenifra · 2ème année</p>
              </div>
              <div class="ml-auto text-right">
                <p class="text-2xl font-bold text-[#3b82f6]">92%</p>
                <p class="text-gray-400 text-xs">Compatibilité</p>
              </div>
            </div>

            <div class="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div class="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#010f6b]" style="width: 92%"></div>
            </div>

            <div class="space-y-2.5 mb-5">
              <div v-for="match in matches" :key="match.label"
                   class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-gray-600">
                  <span>{{ match.icon }}</span>
                  {{ match.label }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500 text-xs">{{ match.you }}</span>
                  <div :class="match.compatible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'"
                       class="text-xs px-2 py-0.5 rounded-full font-medium">
                    {{ match.compatible ? '✓ Match' : '✗ Diff' }}
                  </div>
                </div>
              </div>
            </div>

            <button @click="user ? showMatchProfile = true : openAuth()"
                    class="w-full btn-primary text-white font-semibold py-3 rounded-xl text-sm">
              Voir le profil complet
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile viewer modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showMatchProfile"
             class="fixed inset-0 z-[100] flex items-center justify-center p-4"
             @click.self="showMatchProfile = false">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">

            <!-- Header -->
            <div class="gradient-hero p-6 relative">
              <button @click="showMatchProfile = false"
                      class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold shadow-lg">F</div>
                <div>
                  <h2 class="text-white font-bold text-xl">Fatima Zahra</h2>
                  <p class="text-white/70 text-sm mt-0.5">🎓 USMS Khenifra</p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-xs bg-green-400/30 text-green-100 px-2 py-0.5 rounded-full">✓ Vérifiée</span>
                    <span class="text-xs bg-blue-400/30 text-blue-100 px-2 py-0.5 rounded-full">2ème année</span>
                  </div>
                </div>
              </div>
              <div class="mt-4 bg-white/10 rounded-2xl p-3 flex items-center justify-between">
                <span class="text-white/80 text-sm">Compatibilité avec toi</span>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-24 bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full rounded-full bg-[#3b82f6]" style="width: 92%"></div>
                  </div>
                  <span class="text-white font-bold text-lg">92%</span>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 space-y-4 max-h-[50vh] overflow-y-auto">

              <!-- Bio -->
              <div>
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">À propos</p>
                <p class="text-sm text-gray-600 leading-relaxed">Étudiante en informatique, calme et organisée. Je cherche une coloc dans le centre de Khenifra. Je rentre chez moi le week-end.</p>
              </div>

              <!-- Critères -->
              <div>
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Critères de vie</p>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="crit in profileCriteria" :key="crit.label"
                       class="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                    <span>{{ crit.icon }}</span>
                    <div>
                      <p class="text-xs text-gray-400">{{ crit.label }}</p>
                      <p class="text-xs font-semibold text-[#010f6b]">{{ crit.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Budget -->
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span class="text-sm text-gray-600">Budget mensuel</span>
                <span class="text-[#3b82f6] font-bold">500 – 800 DH</span>
              </div>
            </div>

            <!-- Footer buttons -->
            <div class="p-5 pt-0 flex gap-3">
              <button @click="contactMatch()"
                      class="flex-1 bg-[#25d366] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-[#22c55e] transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button @click="showMatchProfile = false"
                      class="flex-1 border-2 border-[#010f6b] text-[#010f6b] font-semibold py-3 rounded-xl text-sm hover:bg-[#010f6b] hover:text-white transition-colors">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApp } from '../composables/useApp'

const { user, openAuth, scrollTo, whatsapp, toast } = useApp()

const showMatchProfile = ref(false)

const myPrefs = ref({})

const criteria = [
  { key: 'proprete', icon: '🧹', label: 'Propreté', desc: 'Niveau 1-5', options: ['Basique', 'Moyen', 'Très propre'] },
  { key: 'sommeil', icon: '🌙', label: 'Sommeil', desc: 'Tôt / Tard', options: ['Tôt (22h)', 'Tard (minuit+)'] },
  { key: 'etude', icon: '📚', label: 'Mode d\'étude', desc: 'Calme / Bruit', options: ['Calme', 'Avec bruit'] },
  { key: 'coloc', icon: '👥', label: 'Colocation', desc: 'Solo / Groupe', options: ['Solo (1-2)', 'Groupe (3+)'] },
  { key: 'musique', icon: '🎵', label: 'Musique', desc: 'Avec / Sans', options: ['Sans', 'Casque', 'Haut-parleur'] },
  { key: 'cuisine', icon: '🍽️', label: 'Cuisine', desc: 'Cuisine / Pas', options: ['Je cuisine', 'Rarement', 'Jamais'] },
  { key: 'animaux', icon: '🐾', label: 'Animaux', desc: 'Oui / Non', options: ['Non', 'Oui'] },
  { key: 'fumeur', icon: '🌿', label: 'Tabac', desc: 'Oui / Non', options: ['Non-fumeur', 'Fumeur'] },
  { key: 'invites', icon: '🏠', label: 'Invités', desc: 'Souvent / Jamais', options: ['Souvent', 'Parfois', 'Jamais'] },
  { key: 'bruit', icon: '🔊', label: 'Niveau bruit', desc: '1-5', options: ['Calme', 'Normal', 'Animé'] },
  { key: 'communication', icon: '💬', label: 'Communication', desc: 'Direct / Indirect', options: ['Direct', 'Indirect'] },
  { key: 'espace', icon: '📱', label: 'Respect espace', desc: 'Oui / Non', options: ['Strict', 'Flexible'] },
]

const toggleCrit = (crit) => {
  const opts = crit.options
  const current = myPrefs.value[crit.key]
  const idx = current ? opts.indexOf(current) : -1
  if (idx === -1 || idx === opts.length - 1) {
    myPrefs.value = { ...myPrefs.value, [crit.key]: opts[0] }
  } else {
    myPrefs.value = { ...myPrefs.value, [crit.key]: opts[idx + 1] }
  }
}

const completedCount = computed(() => Object.keys(myPrefs.value).length)

const findMatch = () => {
  if (completedCount.value < 4) {
    toast.value?.add({ type: 'info', title: 'Complète ton profil', msg: 'Sélectionne au moins 4 critères pour matcher' })
    return
  }
  toast.value?.add({ type: 'success', title: 'Matching en cours !', msg: `${completedCount.value} critères analysés — 3 profils compatibles trouvés` })
  setTimeout(() => { showMatchProfile.value = true }, 1500)
}

const contactMatch = () => {
  showMatchProfile.value = false
  whatsapp('Bonjour Fatima, j\'ai vu ton profil sur UniStay, on est compatibles à 92% ! 😊')
}

const matches = [
  { icon: '🧹', label: 'Propreté', you: 'Très propre', compatible: true },
  { icon: '🌙', label: 'Sommeil', you: 'Tôt', compatible: true },
  { icon: '📚', label: 'Mode étude', you: 'Calme', compatible: true },
  { icon: '🐾', label: 'Animaux', you: 'Non', compatible: true },
  { icon: '🎵', label: 'Musique', you: 'Casque', compatible: false },
]

const profileCriteria = [
  { icon: '🧹', label: 'Propreté', value: 'Très propre' },
  { icon: '🌙', label: 'Sommeil', value: 'Tôt (22h)' },
  { icon: '📚', label: 'Étude', value: 'Calme' },
  { icon: '🐾', label: 'Animaux', value: 'Non' },
  { icon: '🌿', label: 'Tabac', value: 'Non-fumeur' },
  { icon: '🏠', label: 'Invités', value: 'Rarement' },
]
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
