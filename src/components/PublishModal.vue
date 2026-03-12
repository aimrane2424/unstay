<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue"
           class="fixed inset-0 z-[100] flex items-center justify-center p-4"
           @click.self="$emit('update:modelValue', false)">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

          <!-- Header -->
          <div class="gradient-hero p-6 relative">
            <button @click="$emit('update:modelValue', false)"
                    class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 22V12h6v10"/></svg>
              </div>
              <div>
                <h2 class="text-white font-bold text-xl">Publier une annonce</h2>
                <p class="text-white/70 text-sm">Gratuit · Publication immédiate</p>
              </div>
            </div>
          </div>

          <!-- Steps indicator -->
          <div class="flex border-b border-gray-100">
            <div v-for="(step, i) in steps" :key="i"
                 class="flex-1 py-3 text-center text-xs font-semibold transition-colors"
                 :class="currentStep === i ? 'text-[#010f6b] border-b-2 border-[#3b82f6]' : currentStep > i ? 'text-green-500' : 'text-gray-300'">
              <span v-if="currentStep > i">✓</span>
              <span v-else>{{ i + 1 }}</span>
              <span class="ml-1 hidden sm:inline">{{ step }}</span>
            </div>
          </div>

          <div class="p-6">

            <!-- Step 0: Type de bien -->
            <div v-if="currentStep === 0" class="space-y-5">
              <h3 class="font-bold text-[#010f6b] text-lg">Quel type de bien ?</h3>

              <div class="grid grid-cols-2 gap-3">
                <button v-for="t in types" :key="t.value" type="button"
                        @click="form.type = t.value"
                        class="p-4 rounded-2xl border-2 text-center transition-all"
                        :class="form.type === t.value ? 'border-[#3b82f6] bg-[#3b82f6]/5' : 'border-gray-200 hover:border-gray-300'">
                  <div class="flex justify-center mb-2" v-html="t.icon"></div>
                  <p class="text-sm font-semibold text-[#010f6b]">{{ t.label }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ t.desc }}</p>
                </button>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <select v-model="form.city"
                        class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all bg-white">
                  <option value="">Sélectionner une ville</option>
                  <option v-for="city in cities" :key="city">{{ city }}</option>
                </select>
              </div>
            </div>

            <!-- Step 1: Infos du bien -->
            <div v-if="currentStep === 1" class="space-y-4">
              <h3 class="font-bold text-[#010f6b] text-lg">Détails du logement</h3>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Titre de l'annonce</label>
                <input v-model="form.title" type="text" placeholder="Ex: Studio meublé proche université"
                       class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Prix (DH/mois)</label>
                  <input v-model="form.price" type="number" placeholder="1200"
                         class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Surface (m²)</label>
                  <input v-model="form.surface" type="number" placeholder="25"
                         class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Chambres</label>
                  <select v-model="form.rooms"
                          class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all bg-white">
                    <option value="1">1 chambre</option>
                    <option value="2">2 chambres</option>
                    <option value="3">3 chambres</option>
                    <option value="4">4+ chambres</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Étage</label>
                  <select v-model="form.floor"
                          class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all bg-white">
                    <option value="rdc">Rez-de-chaussée</option>
                    <option value="1">1er étage</option>
                    <option value="2">2ème étage</option>
                    <option value="3">3ème étage+</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Adresse / Quartier</label>
                <input v-model="form.address" type="text" placeholder="Ex: Quartier universitaire, près de la fac"
                       class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Équipements</label>
                <div class="grid grid-cols-2 gap-2">
                  <label v-for="eq in equipements" :key="eq.value"
                         class="flex items-center gap-2 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:border-[#3b82f6]/50 transition-colors"
                         :class="form.equipements.includes(eq.value) ? 'border-[#3b82f6] bg-[#3b82f6]/5' : ''">
                    <input type="checkbox" :value="eq.value" v-model="form.equipements" class="accent-[#3b82f6]"/>
                    <span class="text-sm">{{ eq.label }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 2: Description & Photos -->
            <div v-if="currentStep === 2" class="space-y-4">
              <h3 class="font-bold text-[#010f6b] text-lg">Description & Photos</h3>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea v-model="form.description" rows="4"
                          placeholder="Décrivez votre logement : lumineux, calme, proche des transports, idéal pour étudiants..."
                          class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all resize-none"></textarea>
                <p class="text-xs text-gray-400 mt-1">{{ form.description.length }}/500 caractères</p>
              </div>

              <!-- Photo upload zone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Photos</label>
                <div class="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#3b82f6]/50 transition-colors cursor-pointer"
                     @click="triggerFileInput">
                  <div class="text-4xl mb-3">📸</div>
                  <p class="text-sm font-medium text-gray-600">Cliquer pour ajouter des photos</p>
                  <p class="text-xs text-gray-400 mt-1">JPG, PNG · Max 5 photos · 5MB chacune</p>
                  <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handlePhotos"/>
                </div>
                <div v-if="form.photos.length > 0" class="flex gap-2 mt-3 flex-wrap">
                  <div v-for="(photo, i) in form.photos" :key="i"
                       class="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                    <img :src="photo.url" class="w-full h-full object-cover"/>
                    <button @click="removePhoto(i)"
                            class="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">×</button>
                  </div>
                </div>
              </div>

              <!-- Video URL -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                  Lien vidéo (YouTube, Google Drive...)
                </label>
                <input v-model="form.video" type="url" placeholder="https://www.youtube.com/embed/..."
                       class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                <p class="text-xs text-gray-400 mt-1">Optionnel · Copiez le lien "Intégrer" de YouTube</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Disponible à partir de</label>
                <input v-model="form.availableFrom" type="date"
                       class="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] transition-all"/>
              </div>
            </div>

            <!-- Step 3: Contact -->
            <div v-if="currentStep === 3" class="space-y-4">
              <h3 class="font-bold text-[#010f6b] text-lg">Vos coordonnées</h3>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+212</span>
                  <input v-model="form.phone" type="tel" placeholder="6 12 34 56 78"
                         class="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p class="text-sm font-medium text-[#010f6b]">Visible sur WhatsApp</p>
                  <p class="text-xs text-gray-400">Les étudiants peuvent vous contacter directement</p>
                </div>
                <button @click="form.whatsapp = !form.whatsapp"
                        class="relative w-10 h-5 rounded-full transition-colors duration-300"
                        :class="form.whatsapp ? 'bg-[#3b82f6]' : 'bg-gray-200'">
                  <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                       :class="form.whatsapp ? 'translate-x-5' : 'translate-x-0.5'"></div>
                </button>
              </div>

              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p class="text-sm font-medium text-[#010f6b]">Accepter les messages internes</p>
                  <p class="text-xs text-gray-400">Via la plateforme UniStay</p>
                </div>
                <button @click="form.messages = !form.messages"
                        class="relative w-10 h-5 rounded-full transition-colors duration-300"
                        :class="form.messages ? 'bg-[#3b82f6]' : 'bg-gray-200'">
                  <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                       :class="form.messages ? 'translate-x-5' : 'translate-x-0.5'"></div>
                </button>
              </div>

              <!-- Recap -->
              <div class="bg-blue-50 rounded-2xl p-4 space-y-2">
                <p class="text-xs font-bold text-[#010f6b] mb-3">Récapitulatif</p>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>{{ typeLabel }}</span>
                  <span class="text-gray-300">·</span>
                  <span>{{ form.city || '—' }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="font-bold text-[#3b82f6]">{{ form.price ? form.price + ' DH/mois' : '— DH/mois' }}</span>
                  <span class="text-gray-300">·</span>
                  <span>{{ form.surface ? form.surface + ' m²' : '— m²' }}</span>
                </div>
                <p class="text-xs text-green-600 font-medium">✓ Publication gratuite · Visible immédiatement</p>
              </div>
            </div>

            <!-- Navigation buttons -->
            <div class="mt-6 flex gap-3">
              <button v-if="currentStep > 0"
                      @click="currentStep--"
                      class="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                ← Retour
              </button>

              <button v-if="currentStep < steps.length - 1"
                      @click="nextStep"
                      :disabled="!canNext"
                      class="flex-1 btn-primary text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition-all">
                Continuer →
              </button>

              <button v-else
                      @click="publish"
                      :disabled="publishing || !form.phone"
                      class="flex-1 btn-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all">
                <svg v-if="publishing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ publishing ? 'Publication...' : '🚀 Publier mon annonce' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'published'])

const currentStep = ref(0)
const publishing = ref(false)
const fileInput = ref(null)

const steps = ['Type', 'Détails', 'Photos', 'Contact']

const form = ref({
  type: 'studio',
  city: '',
  title: '',
  price: '',
  surface: '',
  rooms: '1',
  floor: 'rdc',
  address: '',
  equipements: [],
  description: '',
  photos: [],
  video: '',
  availableFrom: '',
  phone: '',
  whatsapp: true,
  messages: true,
})

const types = [
  { value: 'studio', icon: `<svg class="w-7 h-7 text-[#3b82f6] mx-auto" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 22V12h6v10"/></svg>`, label: 'Studio', desc: 'T1 / Studio' },
  { value: 'chambre', icon: `<svg class="w-7 h-7 mx-auto" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7h18M3 12h18M3 17h18"/><rect x="2" y="5" width="20" height="14" rx="2" stroke="#3b82f6" stroke-width="1.8"/></svg>`, label: 'Chambre', desc: 'En colocation' },
  { value: 'appartement', icon: `<svg class="w-7 h-7 mx-auto" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0H3m2 0h14M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`, label: 'Appartement', desc: 'T2, T3, T4...' },
  { value: 'maison', icon: `<svg class="w-7 h-7 mx-auto" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 22V12h6v10"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2 10l10-7 10 7"/></svg>`, label: 'Maison', desc: 'Villa / Dar' },
]

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Khouribga', 'Safi', 'Larache', 'Nador', 'Agadir', 'Fès', 'Meknès', 'Marrakech']

const equipements = [
  { value: 'wifi', icon: '📶', label: 'WiFi' },
  { value: 'meuble', icon: '🛋️', label: 'Meublé' },
  { value: 'parking', icon: '🚗', label: 'Parking' },
  { value: 'cuisine', icon: '🍳', label: 'Cuisine équipée' },
  { value: 'sdb', icon: '🚿', label: 'Salle de bain' },
  { value: 'climatisation', icon: '❄️', label: 'Climatisation' },
  { value: 'balcon', icon: '🌿', label: 'Balcon' },
  { value: 'gardien', icon: '👮', label: 'Gardien' },
]

const typeLabel = computed(() => types.find(t => t.value === form.value.type)?.label || '')

const canNext = computed(() => {
  if (currentStep.value === 0) return form.value.type && form.value.city
  if (currentStep.value === 1) return form.value.title && form.value.price
  return true
})

const nextStep = () => {
  if (canNext.value) currentStep.value++
}

const triggerFileInput = () => fileInput.value?.click()

const handlePhotos = (e) => {
  const files = Array.from(e.target.files).slice(0, 5 - form.value.photos.length)
  files.forEach(file => {
    const url = URL.createObjectURL(file)
    form.value.photos.push({ url, file })
  })
}

const removePhoto = (i) => {
  URL.revokeObjectURL(form.value.photos[i].url)
  form.value.photos.splice(i, 1)
}

const publish = async () => {
  publishing.value = true
  await new Promise(r => setTimeout(r, 1500))
  publishing.value = false
  emit('published', { ...form.value })
  emit('update:modelValue', false)
  currentStep.value = 0
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
