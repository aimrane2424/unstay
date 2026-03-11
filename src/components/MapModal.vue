<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue"
           class="fixed inset-0 z-[200] flex items-center justify-center p-4"
           @click.self="$emit('update:modelValue', false)">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col"
             style="height: 85vh;">

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-[#0B1854] rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <div>
                <h2 class="font-bold text-slate-800">Carte interactive — 10 villes universitaires</h2>
                <p class="text-slate-400 text-xs">Cliquez sur une ville pour voir ses annonces</p>
              </div>
            </div>
            <button @click="$emit('update:modelValue', false)"
                    class="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Map + sidebar -->
          <div class="flex flex-1 overflow-hidden">

            <!-- Map -->
            <div ref="mapEl" class="flex-1"></div>

            <!-- City list sidebar -->
            <div class="w-64 border-l border-slate-100 overflow-y-auto shrink-0 bg-slate-50">
              <div class="p-4">
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Villes</p>
                <div class="space-y-2">
                  <button v-for="city in cities" :key="city.name"
                          @click="selectCity(city)"
                          class="w-full text-left p-3 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                          :class="selectedCity === city.name ? 'bg-white shadow-sm border border-blue-200' : ''">
                    <div class="flex items-center gap-2.5">
                      <span class="text-xl">{{ city.emoji }}</span>
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-slate-800 text-sm">{{ city.name }}</p>
                        <p class="text-slate-400 text-xs">{{ city.listings }} annonces · dès {{ city.minPrice }} DH</p>
                      </div>
                      <span class="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                            style="background: #0B1854; font-size: 10px;">{{ city.priority }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer action -->
          <div v-if="selectedCity" class="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-blue-50 shrink-0">
            <p class="text-sm font-medium text-slate-700">
              <span class="text-blue-600 font-bold">{{ selectedCity }}</span> sélectionné —
              {{ cities.find(c => c.name === selectedCity)?.listings }} annonces disponibles
            </p>
            <button @click="goToListings"
                    class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
              Voir les annonces →
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useApp } from '../composables/useApp'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const { searchFilters } = useApp()
const router = useRouter()
const scrollToListings = ({ city } = {}) => {
  if (city) searchFilters.value.city = city
  router.push('/logements')
}

const mapEl = ref(null)
const selectedCity = ref('')
let mapInstance = null
let markersMap = {}

const cities = [
  { name: 'Khenifra',   emoji: '🏔️', minPrice: 500, listings: 45, priority: 1,  lat: 32.9394, lng: -5.6710 },
  { name: 'Beni Mellal',emoji: '🌿', minPrice: 600, listings: 78, priority: 2,  lat: 32.3373, lng: -6.3498 },
  { name: 'Oujda',      emoji: '🌅', minPrice: 700, listings: 120, priority: 3, lat: 34.6814, lng: -1.9086 },
  { name: 'Taza',       emoji: '🏡', minPrice: 450, listings: 32, priority: 4,  lat: 34.2100, lng: -4.0100 },
  { name: 'El Jadida',  emoji: '🌊', minPrice: 800, listings: 56, priority: 5,  lat: 33.2549, lng: -8.5078 },
  { name: 'Settat',     emoji: '🌾', minPrice: 550, listings: 41, priority: 6,  lat: 33.0011, lng: -7.6199 },
  { name: 'Khouribga',  emoji: '⛏️', minPrice: 500, listings: 28, priority: 7, lat: 32.8811, lng: -6.9063 },
  { name: 'Safi',       emoji: '🐟', minPrice: 600, listings: 38, priority: 8,  lat: 32.2994, lng: -9.2372 },
  { name: 'Larache',    emoji: '⚓', minPrice: 500, listings: 22, priority: 9,  lat: 35.1932, lng: -6.1561 },
  { name: 'Nador',      emoji: '🏖️', minPrice: 700, listings: 34, priority: 10, lat: 35.1681, lng: -2.9287 },
]

const initMap = async () => {
  await nextTick()
  if (!mapEl.value) return

  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  // Fix default marker icons
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  mapInstance = L.map(mapEl.value, { zoomControl: true }).setView([32.5, -5.5], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapInstance)

  cities.forEach(city => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        background: #0B1854;
        color: white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 3px solid white;
        font-size: 10px; font-weight: bold;
      ">
        <span style="transform: rotate(45deg)">${city.listings}</span>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -44],
    })

    const marker = L.marker([city.lat, city.lng], { icon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="font-family: system-ui; min-width: 160px; padding: 4px 0;">
          <div style="font-size: 20px; text-align: center; margin-bottom: 6px">${city.emoji}</div>
          <p style="font-weight: 700; font-size: 14px; color: #0B1854; margin: 0 0 4px">${city.name}</p>
          <p style="color: #64748b; font-size: 12px; margin: 0 0 2px">📋 ${city.listings} annonces</p>
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px">💰 Dès ${city.minPrice} DH/mois</p>
          <button onclick="window.__selectCity('${city.name}')"
            style="background: #0B1854; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; width: 100%">
            Voir les annonces →
          </button>
        </div>
      `)

    marker.on('click', () => { selectedCity.value = city.name })
    markersMap[city.name] = marker
  })

  // Global handler for popup button
  window.__selectCity = (name) => {
    selectedCity.value = name
    goToListings()
  }
}

const selectCity = (city) => {
  selectedCity.value = city.name
  if (mapInstance && markersMap[city.name]) {
    mapInstance.setView([city.lat, city.lng], 11, { animate: true })
    markersMap[city.name].openPopup()
  }
}

const goToListings = () => {
  emit('update:modelValue', false)
  setTimeout(() => scrollToListings({ city: selectedCity.value }), 200)
}

watch(() => props.modelValue, async (val) => {
  if (val) {
    await nextTick()
    if (!mapInstance) {
      await initMap()
    } else {
      setTimeout(() => mapInstance.invalidateSize(), 100)
    }
  }
})

onUnmounted(() => {
  if (mapInstance) { mapInstance.remove(); mapInstance = null }
  delete window.__selectCity
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
