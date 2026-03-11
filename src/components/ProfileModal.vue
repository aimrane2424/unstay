<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue"
           class="fixed inset-0 z-[100] flex items-center justify-center p-4"
           @click.self="$emit('update:modelValue', false)">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

          <!-- Header -->
          <div class="gradient-hero p-6 relative">
            <button @click="$emit('update:modelValue', false)"
                    class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div class="relative">
                <div class="w-16 h-16 rounded-2xl bg-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {{ form.firstName ? form.firstName[0].toUpperCase() : '?' }}
                </div>
                <button class="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg class="w-3 h-3 text-[#010f6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
              <div>
                <h2 class="text-white font-bold text-lg">{{ form.firstName }} {{ form.lastName }}</h2>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                        :class="form.type === 'etudiant' ? 'bg-blue-400/30 text-blue-100' : 'bg-green-400/30 text-green-100'">
                    {{ form.type === 'etudiant' ? '🎓 Étudiant' : '🏠 Propriétaire' }}
                  </span>
                  <span v-if="form.verified" class="text-xs bg-green-400/30 text-green-100 px-2 py-0.5 rounded-full">✓ Vérifié</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-gray-100">
            <button v-for="tab in tabs" :key="tab.id"
                    @click="activeTab = tab.id"
                    class="flex-1 py-3 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    :class="activeTab === tab.id ? 'text-[#010f6b] border-b-2 border-[#3b82f6]' : 'text-gray-400 hover:text-gray-600'">
              {{ tab.icon }} {{ tab.label }}
            </button>
          </div>

          <div class="p-5">

            <!-- Tab: Infos personnelles -->
            <div v-if="activeTab === 'info'" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1.5">Prénom</label>
                  <input v-model="form.firstName" type="text"
                         class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1.5">Nom</label>
                  <input v-model="form.lastName" type="text"
                         class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                <input v-model="form.email" type="email"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+212</span>
                  <input v-model="form.phone" type="tel"
                         class="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Ville</label>
                <select v-model="form.city"
                        class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all bg-white">
                  <option value="">Sélectionner une ville</option>
                  <option v-for="city in cities" :key="city">{{ city }}</option>
                </select>
              </div>

              <div v-if="form.type === 'etudiant'">
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Université</label>
                <input v-model="form.university" type="text" placeholder="Ex: USMS Khenifra"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all"/>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Bio</label>
                <textarea v-model="form.bio" rows="3" placeholder="Parle un peu de toi..."
                          class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all resize-none"></textarea>
              </div>
            </div>

            <!-- Tab: Préférences coloc -->
            <div v-if="activeTab === 'prefs'" class="space-y-4">
              <p class="text-xs text-gray-500 bg-blue-50 rounded-xl p-3">
                Ces préférences servent à trouver ton colocataire idéal avec notre algorithme de matching.
              </p>

              <div v-for="pref in preferences" :key="pref.key" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <span class="text-lg">{{ pref.icon }}</span>
                  <div>
                    <p class="text-sm font-medium text-[#010f6b]">{{ pref.label }}</p>
                    <p class="text-xs text-gray-400">{{ pref.desc }}</p>
                  </div>
                </div>
                <select v-model="form.prefs[pref.key]"
                        class="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#3b82f6] bg-white">
                  <option v-for="opt in pref.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
            </div>

            <!-- Tab: Mes annonces favorites -->
            <div v-if="activeTab === 'favs'">
              <div v-if="savedListings.length === 0" class="text-center py-8">
                <div class="text-4xl mb-3">❤️</div>
                <p class="text-gray-500 text-sm">Aucun logement sauvegardé</p>
                <p class="text-gray-400 text-xs mt-1">Clique sur ❤️ pour sauvegarder des annonces</p>
              </div>
              <div v-else class="space-y-3">
                <div v-for="item in savedListings" :key="item.id"
                     class="flex gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#3b82f6]/30 transition-colors cursor-pointer">
                  <div class="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
                       :style="{ background: item.gradient }">
                    <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-[#010f6b] text-sm truncate">{{ item.title }}</p>
                    <p class="text-gray-400 text-xs mt-0.5">{{ item.location }}</p>
                    <p class="text-[#3b82f6] font-bold text-sm mt-1">{{ item.price }} DH/mois</p>
                  </div>
                  <button @click="toggleFav(item)" class="text-red-400 hover:text-red-500 transition-colors self-start mt-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Tab: Sécurité -->
            <div v-if="activeTab === 'security'" class="space-y-4">
              <div class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <p class="text-sm font-semibold text-green-700">Compte sécurisé</p>
                  <p class="text-xs text-green-600">Votre compte est protégé</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Mot de passe actuel</label>
                <input type="password" placeholder="••••••••"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all"/>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Nouveau mot de passe</label>
                <input type="password" placeholder="Min. 8 caractères"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all"/>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1.5">Confirmer le mot de passe</label>
                <input type="password" placeholder="••••••••"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all"/>
              </div>

              <div class="pt-2 border-t border-gray-100">
                <p class="text-xs font-medium text-gray-600 mb-3">Notifications</p>
                <div class="space-y-3">
                  <div v-for="notif in notifications" :key="notif.key"
                       class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-[#010f6b]">{{ notif.label }}</p>
                      <p class="text-xs text-gray-400">{{ notif.desc }}</p>
                    </div>
                    <button @click="notif.active = !notif.active"
                            class="relative w-10 h-5 rounded-full transition-colors duration-300"
                            :class="notif.active ? 'bg-[#3b82f6]' : 'bg-gray-200'">
                      <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                           :class="notif.active ? 'translate-x-5' : 'translate-x-0.5'"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Save button -->
            <div class="mt-5 flex gap-3">
              <button @click="save" :disabled="saving"
                      class="flex-1 btn-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all">
                <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ saving ? 'Sauvegarde...' : 'Sauvegarder' }}
              </button>
              <button @click="$emit('update:modelValue', false)"
                      class="px-4 py-3 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useApp } from '../composables/useApp'

const props = defineProps({ modelValue: Boolean, user: Object })
const emit = defineEmits(['update:modelValue', 'saved'])

const { savedListingsData, toggleFav, profileTab } = useApp()

const activeTab = ref('info')

watch(profileTab, (tab) => { activeTab.value = tab }, { immediate: true })
watch(() => props.modelValue, (v) => { if (v) activeTab.value = profileTab.value })
const saving = ref(false)

const tabs = [
  { id: 'info', label: 'Profil', icon: '👤' },
  { id: 'prefs', label: 'Coloc', icon: '🤝' },
  { id: 'favs', label: 'Favoris', icon: '❤️' },
  { id: 'security', label: 'Sécurité', icon: '🔒' },
]

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  city: '', university: '', bio: '', type: 'etudiant', verified: true,
  prefs: { proprete: '3', sommeil: 'tard', bruit: 'calme', fumeur: 'non', animaux: 'non' }
})

watch(() => props.user, (u) => {
  if (u) {
    form.value.firstName = u.firstName || u.name?.split(' ')[0] || ''
    form.value.lastName = u.lastName || u.name?.split(' ').slice(1).join(' ') || ''
    form.value.email = u.email || ''
    form.value.phone = u.phone || ''
    form.value.type = u.type || 'etudiant'
  }
}, { immediate: true })

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Khouribga', 'Safi', 'Larache', 'Nador']

const preferences = [
  { key: 'proprete', icon: '🧹', label: 'Propreté', desc: 'Niveau de propreté', options: [{ value: '1', label: 'Basique' }, { value: '3', label: 'Moyen' }, { value: '5', label: 'Très propre' }] },
  { key: 'sommeil', icon: '🌙', label: 'Sommeil', desc: 'Horaire de coucher', options: [{ value: 'tot', label: 'Tôt (22h)' }, { value: 'tard', label: 'Tard (minuit+)' }] },
  { key: 'bruit', icon: '🔊', label: 'Ambiance', desc: 'Niveau sonore', options: [{ value: 'calme', label: 'Calme' }, { value: 'normal', label: 'Normal' }, { value: 'anime', label: 'Animé' }] },
  { key: 'fumeur', icon: '🚬', label: 'Tabac', desc: 'Fumeur ou non', options: [{ value: 'non', label: 'Non-fumeur' }, { value: 'oui', label: 'Fumeur' }] },
  { key: 'animaux', icon: '🐾', label: 'Animaux', desc: 'Accepte les animaux', options: [{ value: 'non', label: 'Non' }, { value: 'oui', label: 'Oui' }] },
]

const savedListings = savedListingsData

const notifications = ref([
  { key: 'newListings', label: 'Nouvelles annonces', desc: 'Quand une annonce correspond à vos critères', active: true },
  { key: 'messages', label: 'Messages', desc: 'Quand vous recevez un message', active: true },
  { key: 'promos', label: 'Promotions', desc: 'Offres et actualités UniStay', active: false },
])

const save = async () => {
  saving.value = true
  await new Promise(r => setTimeout(r, 1000))
  saving.value = false
  emit('saved', {
    name: (form.value.firstName + ' ' + form.value.lastName).trim(),
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    city: form.value.city,
    university: form.value.university,
    type: form.value.type
  })
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
