<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue && listing"
           class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
           @click.self="$emit('update:modelValue', false)">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div class="relative bg-[#F8FAFF] rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

          <!-- HERO IMAGE -->
          <div class="relative h-56 sm:h-64 shrink-0 rounded-t-3xl overflow-hidden">
            <div class="w-full h-full" :style="{ background: listing.gradient }">
              <div v-if="!listing.photos?.length" class="w-full h-full flex items-center justify-center">
                <svg class="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <img v-else :src="listing.photos[activePhoto]" class="w-full h-full object-cover" />
            </div>

            <!-- Badges -->
            <div class="absolute top-4 left-4 flex gap-2">
              <span v-if="listing.verified" class="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                Vérifié UniStay
              </span>
              <span v-if="listing.isNew" class="bg-white text-[#010f6b] text-xs font-bold px-3 py-1.5 rounded-full shadow">Nouveau</span>
            </div>

            <!-- Close -->
            <button @click="$emit('update:modelValue', false)"
                    class="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Price -->
            <div class="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-2 shadow-lg">
              <span class="text-2xl font-extrabold text-[#3b82f6]">{{ listing.price }}</span>
              <span class="text-gray-400 text-sm"> DH/mois</span>
            </div>

            <!-- Photo dots -->
            <div v-if="listing.photos?.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              <button v-for="(_, i) in listing.photos" :key="i" @click="activePhoto = i"
                      class="h-2 rounded-full transition-all"
                      :class="i === activePhoto ? 'w-5 bg-white' : 'w-2 bg-white/50'"/>
            </div>
          </div>

          <!-- Photo thumbnails -->
          <div v-if="listing.photos?.length > 1" class="flex gap-2 px-4 pt-3 overflow-x-auto pb-1">
            <button v-for="(photo, i) in listing.photos" :key="i" @click="activePhoto = i"
                    class="shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all"
                    :class="i === activePhoto ? 'border-[#3b82f6]' : 'border-transparent opacity-60'">
              <img :src="photo" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-5">

            <!-- Title + Fav -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-xl font-bold text-[#010f6b]">{{ listing.title }}</h2>
                <p class="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <svg class="w-4 h-4 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {{ listing.location }}
                </p>
              </div>
              <button @click="isFav = !isFav"
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0"
                      :class="isFav ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'">
                <svg class="w-5 h-5" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Info grid -->
            <div class="grid grid-cols-3 gap-2 mb-5">
              <div class="bg-blue-50 rounded-2xl p-3 text-center">
                <p class="text-xs text-gray-400 mb-1">Type</p>
                <p class="font-bold text-[#010f6b] text-sm capitalize">{{ listing.type }}</p>
              </div>
              <div class="bg-green-50 rounded-2xl p-3 text-center">
                <p class="text-xs text-gray-400 mb-1">Université</p>
                <p class="font-bold text-[#010f6b] text-sm">{{ listing.university || '—' }}</p>
              </div>
              <div class="bg-purple-50 rounded-2xl p-3 text-center">
                <p class="text-xs text-gray-400 mb-1">Disponible</p>
                <p class="font-bold text-green-600 text-sm">Maintenant</p>
              </div>
            </div>

            <!-- Features -->
            <div class="mb-5">
              <h3 class="font-bold text-[#010f6b] text-sm mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Équipements inclus
              </h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="feat in allFeatures" :key="feat"
                      class="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                  <svg class="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  {{ feat }}
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
            <div class="mb-5 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 class="font-bold text-[#010f6b] text-sm mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                Règles de la maison
              </h3>
              <div class="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></span>Non-fumeur dans la chambre</span>
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></span>Pas d'animaux</span>
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></span>Heures calmes 22h–7h</span>
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></span>Caution 1 mois remboursable</span>
              </div>
            </div>

            <!-- Video — only shown if exists -->
            <div v-if="embedVideoUrl" class="mb-5">
              <h3 class="font-bold text-[#010f6b] text-sm mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Vidéo du logement
              </h3>
              <div class="rounded-2xl overflow-hidden" style="height:220px;">
                <iframe :src="embedVideoUrl" class="w-full h-full border-0" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
              </div>
            </div>

            <!-- Map -->
            <div class="mb-5">
              <h3 class="font-bold text-[#010f6b] text-sm mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                Localisation
              </h3>
              <div class="rounded-2xl overflow-hidden" style="height:220px;">
                <iframe
                  :src="`https://maps.google.com/maps?q=${encodeURIComponent(listing.location + ', Maroc')}&output=embed&z=14`"
                  class="w-full h-full border-0" allowfullscreen loading="lazy">
                </iframe>
              </div>
            </div>

            <!-- Owner -->
            <div class="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 mb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow shrink-0"
                   :class="isAdminListing ? 'bg-[#0B1854]' : 'bg-gradient-to-br from-[#010f6b] to-[#3b82f6]'">
                {{ ownerInitial }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-[#010f6b]">{{ ownerName }}</p>
                <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5 flex-wrap">
                  <span v-if="!isAdminListing" class="text-yellow-400">★★★★★</span>
                  <span v-if="listing.verified" class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Vérifié</span>
                  <span v-if="isAdminListing" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">UniStay Official</span>
                  <span v-if="listing.phone" class="text-gray-500">+212 {{ listing.phone }}</span>
                </div>
              </div>
              <div v-if="!isAdminListing" class="text-right text-xs text-gray-400 shrink-0">
                <p>Répond en</p>
                <p class="font-bold text-[#010f6b]">&lt; 1h</p>
              </div>
            </div>

            <!-- CTA — WhatsApp full width -->
            <button v-if="listing.phone" @click="handleContact('whatsapp')"
                    class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-2xl transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contacter sur WhatsApp
            </button>
            <div v-else class="w-full text-center text-sm text-gray-400 py-3 bg-gray-50 rounded-2xl">
              Annonce UniStay · Contactez-nous via le site
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ modelValue: Boolean, listing: Object })
const emit = defineEmits(['update:modelValue', 'contact'])

const isFav = ref(false)
const activePhoto = ref(0)
const extraFeatures = ['Eau incluse', 'Électricité incluse', 'Sécurisé', 'Quartier calme']
const allFeatures = computed(() => [...(props.listing?.features || []), ...extraFeatures])

const isAdminListing = computed(() => !props.listing?.phone && !props.listing?.ownerName)
const ownerName = computed(() => props.listing?.ownerName || (props.listing?.phone ? 'Propriétaire' : 'UniStay Admin'))
const ownerInitial = computed(() => ownerName.value.charAt(0).toUpperCase())

const embedVideoUrl = computed(() => {
  const url = props.listing?.video
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  return url || null
})

const handleContact = (type) => emit('contact', { type, listing: props.listing })
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .relative, .modal-leave-to .relative { transform: translateY(40px); }
</style>
