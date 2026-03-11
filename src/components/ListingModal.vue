<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue && listing"
           class="fixed inset-0 z-[100] flex items-center justify-center p-4"
           @click.self="$emit('update:modelValue', false)">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          <!-- Image header -->
          <div class="relative h-56 flex-shrink-0"
               :style="{ background: listing.gradient }">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>

            <!-- Badges -->
            <div class="absolute top-4 left-4 flex gap-2">
              <span v-if="listing.verified" class="badge-verified text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                Vérifié UniStay
              </span>
            </div>

            <!-- Close -->
            <button @click="$emit('update:modelValue', false)"
                    class="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Price -->
            <div class="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-2 shadow-lg">
              <span class="text-2xl font-bold text-[#3b82f6]">{{ listing.price }}</span>
              <span class="text-gray-400 text-sm"> DH/mois</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-xl font-bold text-[#010f6b]">{{ listing.title }}</h2>
                <p class="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {{ listing.location }}
                </p>
              </div>
              <button @click="toggleFav"
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      :class="isFav ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'">
                <svg class="w-5 h-5" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Key info grid -->
            <div class="grid grid-cols-3 gap-3 mb-5">
              <div class="bg-blue-50 rounded-xl p-3 text-center">
                <p class="text-xs text-gray-500 mb-1">Type</p>
                <p class="font-bold text-[#010f6b] text-sm">{{ listing.type }}</p>
              </div>
              <div class="bg-green-50 rounded-xl p-3 text-center">
                <p class="text-xs text-gray-500 mb-1">Université</p>
                <p class="font-bold text-[#010f6b] text-sm">{{ listing.university }}</p>
              </div>
              <div class="bg-purple-50 rounded-xl p-3 text-center">
                <p class="text-xs text-gray-500 mb-1">Disponible</p>
                <p class="font-bold text-green-600 text-sm">Maintenant</p>
              </div>
            </div>

            <!-- Features -->
            <div class="mb-5">
              <h3 class="font-bold text-[#010f6b] text-sm mb-3">Équipements inclus</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="feat in listing.features" :key="feat"
                      class="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                  ✓ {{ feat }}
                </span>
                <span v-for="feat in extraFeatures" :key="feat"
                      class="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                  ✓ {{ feat }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-5">
              <h3 class="font-bold text-[#010f6b] text-sm mb-2">Description</h3>
              <p class="text-gray-500 text-sm leading-relaxed">
                Beau logement étudiant situé dans un quartier calme, idéalement positionné à proximité de l'université.
                L'espace est propre, bien entretenu et meublé. Propriétaire sérieux et à l'écoute.
                Eau et électricité incluses dans le prix. Idéal pour un étudiant ou une étudiante.
              </p>
            </div>

            <!-- Rules -->
            <div class="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 class="font-bold text-[#010f6b] text-sm mb-2 flex items-center gap-2">
                <span>⚠️</span> Règles de la maison
              </h3>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• Non-fumeur dans la chambre</li>
                <li>• Pas d'animaux</li>
                <li>• Respect des heures calmes (22h–7h)</li>
                <li>• Caution 1 mois remboursable</li>
              </ul>
            </div>

            <!-- Owner info -->
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-5">
              <div class="w-12 h-12 bg-[#010f6b] rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div class="flex-1">
                <p class="font-bold text-[#010f6b]">Mohamed A.</p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <span class="flex items-center gap-1 text-yellow-500">★★★★★</span>
                  <span>Propriétaire vérifié</span>
                  <span class="text-green-500">• En ligne</span>
                </div>
              </div>
              <div class="text-right text-xs text-gray-400">
                <p>Répond en</p>
                <p class="font-medium text-[#010f6b]">< 1h</p>
              </div>
            </div>

            <!-- CTA buttons -->
            <div class="grid grid-cols-2 gap-3">
              <button @click="handleContact('whatsapp')"
                      class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
              <button @click="handleContact('message')"
                      class="btn-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Envoyer message
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

const props = defineProps({
  modelValue: Boolean,
  listing: Object
})
const emit = defineEmits(['update:modelValue', 'contact'])

const isFav = ref(false)
const extraFeatures = ['Eau incluse', 'Électricité incluse', 'Sécurisé', 'Quartier calme']

const toggleFav = () => { isFav.value = !isFav.value }

const handleContact = (type) => {
  emit('contact', { type, listing: props.listing })
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
