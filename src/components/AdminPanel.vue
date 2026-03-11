<template>
  <!-- LOGIN SCREEN -->
  <div v-if="!authenticated" class="min-h-screen flex items-center justify-center" style="background: radial-gradient(ellipse 80% 60% at 50% 0%, #1E3A8A 0%, #0B1854 55%, #060D35 100%);">
    <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md mx-4">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-[#0B1854] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-slate-800">Admin UniStay</h1>
        <p class="text-slate-400 text-sm mt-1">Accès réservé aux administrateurs</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input v-model="loginForm.email" type="email" placeholder="admin@unstay.ma"
                 @keyup.enter="doLogin"
                 class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
          <input v-model="loginForm.password" type="password" placeholder="••••••••"
                 @keyup.enter="doLogin"
                 class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
        </div>
        <p v-if="loginError" class="text-red-500 text-sm text-center">{{ loginError }}</p>
        <button @click="doLogin"
                class="w-full bg-[#0B1854] hover:bg-[#1E3A8A] text-white font-bold py-3 rounded-xl transition-colors">
          Se connecter
        </button>
      </div>

      <p class="text-center mt-6">
        <a href="/" class="text-sm text-blue-600 hover:underline">← Retour au site</a>
      </p>
    </div>
  </div>

  <!-- ADMIN DASHBOARD -->
  <div v-else class="min-h-screen bg-slate-50">

    <!-- Top bar -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-[#0B1854] rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-slate-800 text-base leading-none">UniStay Admin</h1>
          <p class="text-slate-400 text-xs mt-0.5">Tableau de bord</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <a href="/" class="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          Voir le site
        </a>
        <button @click="logout"
                class="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Déconnexion
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">

      <!-- Stats cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p class="text-slate-400 text-xs font-medium mb-1">Total annonces</p>
          <p class="text-3xl font-extrabold text-slate-800">{{ listings.length }}</p>
          <p class="text-blue-500 text-xs mt-1 font-medium">↑ actives</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p class="text-slate-400 text-xs font-medium mb-1">Vérifiées</p>
          <p class="text-3xl font-extrabold text-green-600">{{ listings.filter(l => l.verified).length }}</p>
          <p class="text-slate-400 text-xs mt-1">{{ listings.filter(l => !l.verified).length }} en attente</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p class="text-slate-400 text-xs font-medium mb-1">Nouvelles</p>
          <p class="text-3xl font-extrabold text-orange-500">{{ listings.filter(l => l.isNew).length }}</p>
          <p class="text-slate-400 text-xs mt-1">cette semaine</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p class="text-slate-400 text-xs font-medium mb-1">Budget moyen</p>
          <p class="text-3xl font-extrabold text-purple-600">{{ avgPrice }} <span class="text-base font-normal text-slate-400">DH</span></p>
          <p class="text-slate-400 text-xs mt-1">/ mois</p>
        </div>
      </div>

      <!-- Listings table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <!-- Table header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 class="font-bold text-slate-800">Toutes les annonces</h2>
          <button @click="openAddForm"
                  class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Ajouter une annonce
          </button>
        </div>

        <!-- Filter bar -->
        <div class="px-6 py-3 border-b border-slate-100 flex gap-3 flex-wrap">
          <input v-model="tableSearch" placeholder="Rechercher..."
                 class="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 w-48"/>
          <select v-model="tableFilter" class="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400">
            <option value="">Tous les types</option>
            <option value="Chambre seule">Chambre seule</option>
            <option value="Colocation">Colocation</option>
            <option value="Studio">Studio</option>
            <option value="Appartement">Appartement</option>
          </select>
          <select v-model="verifiedFilter" class="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400">
            <option value="">Tous</option>
            <option value="verified">Vérifiés</option>
            <option value="pending">En attente</option>
          </select>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-left">
                <th class="px-6 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Annonce</th>
                <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Ville</th>
                <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Type</th>
                <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Prix</th>
                <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Statut</th>
                <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="listing in filteredTableListings" :key="listing.id"
                  class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                         :style="{ background: listing.gradient }">
                      <svg class="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800">{{ listing.title }}</p>
                      <p class="text-slate-400 text-xs">{{ listing.university }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-slate-600">{{ listing.location.split(',')[0] }}</td>
                <td class="px-4 py-4">
                  <span class="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg">{{ listing.tab }}</span>
                </td>
                <td class="px-4 py-4 font-bold text-slate-800">{{ listing.price }} DH</td>
                <td class="px-4 py-4">
                  <button @click="toggleVerified(listing)"
                          class="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors"
                          :class="listing.verified
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'">
                    <span class="w-1.5 h-1.5 rounded-full" :class="listing.verified ? 'bg-green-500' : 'bg-amber-500'"></span>
                    {{ listing.verified ? 'Vérifié' : 'En attente' }}
                  </button>
                </td>
                <td class="px-4 py-4">
                  <div class="flex items-center gap-2">
                    <button @click="openEditForm(listing)"
                            class="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                            title="Modifier">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button @click="confirmDelete(listing)"
                            class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                            title="Supprimer">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredTableListings.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-slate-400">Aucune annonce trouvée</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-3 border-t border-slate-100 text-slate-400 text-xs">
          {{ filteredTableListings.length }} annonce(s) affichée(s) sur {{ listings.length }}
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.5);">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 class="text-xl font-bold text-slate-800">{{ editMode ? 'Modifier l\'annonce' : 'Nouvelle annonce' }}</h2>
          <button @click="showForm = false" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="px-8 py-6 space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Titre</label>
              <input v-model="form.title" type="text" placeholder="Ex: Chambre meublée centre ville"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Ville</label>
              <select v-model="form.city" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                <option value="">Choisir une ville</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Quartier / Adresse</label>
              <input v-model="form.address" type="text" placeholder="Ex: Hay Ennour"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Prix (DH/mois)</label>
              <input v-model="form.price" type="number" placeholder="700"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
              <select v-model="form.tab" class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                <option value="Chambre seule">Chambre seule</option>
                <option value="Colocation">Colocation</option>
                <option value="Studio">Studio</option>
                <option value="Appartement">Appartement</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Université proche</label>
              <input v-model="form.university" type="text" placeholder="Ex: 5 min de l'USMS"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Équipements (séparés par virgule)</label>
              <input v-model="form.features" type="text" placeholder="WiFi, Meublée, Cuisine"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div class="flex items-center gap-6 pt-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.verified" type="checkbox" class="w-4 h-4 accent-blue-600"/>
                <span class="text-sm font-medium text-slate-700">Vérifié</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.isNew" type="checkbox" class="w-4 h-4 accent-orange-500"/>
                <span class="text-sm font-medium text-slate-700">Nouveau</span>
              </label>
            </div>
          </div>
          <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
        </div>
        <div class="px-8 py-5 border-t border-slate-100 flex gap-3 justify-end">
          <button @click="showForm = false"
                  class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            Annuler
          </button>
          <button @click="saveForm"
                  class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
            {{ editMode ? 'Enregistrer' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete confirm modal -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.5);">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2">Supprimer l'annonce ?</h3>
        <p class="text-slate-400 text-sm mb-6">"{{ deleteTarget.title }}" sera définitivement supprimée.</p>
        <div class="flex gap-3">
          <button @click="deleteTarget = null"
                  class="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-2.5 rounded-xl transition-colors text-sm">
            Annuler
          </button>
          <button @click="doDelete"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
            Supprimer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApp } from '../composables/useApp'

const { listings } = useApp()

// --- Auth ---
const authenticated = ref(false)
const loginForm = ref({ email: '', password: '' })
const loginError = ref('')

const ADMIN_EMAIL = 'admin@unstay.ma'
const ADMIN_PASSWORD = 'unstay2024'

const doLogin = () => {
  loginError.value = ''
  if (loginForm.value.email === ADMIN_EMAIL && loginForm.value.password === ADMIN_PASSWORD) {
    authenticated.value = true
  } else {
    loginError.value = 'Email ou mot de passe incorrect'
  }
}

const logout = () => {
  authenticated.value = false
  loginForm.value = { email: '', password: '' }
}

// --- Stats ---
const avgPrice = computed(() => {
  if (!listings.value.length) return 0
  const total = listings.value.reduce((s, l) => s + parseInt(l.price), 0)
  return Math.round(total / listings.value.length)
})

// --- Table ---
const tableSearch = ref('')
const tableFilter = ref('')
const verifiedFilter = ref('')

const filteredTableListings = computed(() => {
  let r = listings.value
  if (tableSearch.value) {
    const q = tableSearch.value.toLowerCase()
    r = r.filter(l => l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q))
  }
  if (tableFilter.value) r = r.filter(l => l.tab === tableFilter.value)
  if (verifiedFilter.value === 'verified') r = r.filter(l => l.verified)
  if (verifiedFilter.value === 'pending') r = r.filter(l => !l.verified)
  return r
})

const toggleVerified = (listing) => {
  listing.verified = !listing.verified
}

// --- Delete ---
const deleteTarget = ref(null)
const confirmDelete = (listing) => { deleteTarget.value = listing }
const doDelete = () => {
  listings.value = listings.value.filter(l => l.id !== deleteTarget.value.id)
  deleteTarget.value = null
}

// --- Add / Edit Form ---
const showForm = ref(false)
const editMode = ref(false)
const editingId = ref(null)
const formError = ref('')

const gradients = [
  'linear-gradient(135deg, #dbeafe, #93c5fd)',
  'linear-gradient(135deg, #d1fae5, #6ee7b7)',
  'linear-gradient(135deg, #ede9fe, #c4b5fd)',
  'linear-gradient(135deg, #fef3c7, #fcd34d)',
  'linear-gradient(135deg, #fee2e2, #fca5a5)',
  'linear-gradient(135deg, #e0e7ff, #a5b4fc)',
]

const emptyForm = () => ({
  title: '', city: '', address: '', price: '', tab: 'Chambre seule',
  university: '', features: '', verified: false, isNew: true
})

const form = ref(emptyForm())

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Safi', 'Larache', 'Nador', 'Khouribga']

const typeMap = { 'Chambre seule': 'Chambre', 'Colocation': 'Colocation', 'Studio': 'Studio', 'Appartement': 'Appartement' }

const openAddForm = () => {
  editMode.value = false
  editingId.value = null
  form.value = emptyForm()
  formError.value = ''
  showForm.value = true
}

const openEditForm = (listing) => {
  editMode.value = true
  editingId.value = listing.id
  const [city, address] = listing.location.split(', ')
  form.value = {
    title: listing.title,
    city: city || '',
    address: address || '',
    price: listing.price,
    tab: listing.tab,
    university: listing.university,
    features: listing.features.join(', '),
    verified: listing.verified,
    isNew: listing.isNew,
  }
  formError.value = ''
  showForm.value = true
}

const saveForm = () => {
  formError.value = ''
  if (!form.value.title.trim()) { formError.value = 'Le titre est requis'; return }
  if (!form.value.city) { formError.value = 'La ville est requise'; return }
  if (!form.value.price) { formError.value = 'Le prix est requis'; return }

  const feats = form.value.features.split(',').map(f => f.trim()).filter(Boolean)
  const location = form.value.address ? `${form.value.city}, ${form.value.address}` : form.value.city

  if (editMode.value) {
    const idx = listings.value.findIndex(l => l.id === editingId.value)
    if (idx !== -1) {
      listings.value[idx] = {
        ...listings.value[idx],
        title: form.value.title,
        location,
        price: String(form.value.price),
        tab: form.value.tab,
        type: typeMap[form.value.tab] || form.value.tab,
        university: form.value.university,
        features: feats,
        verified: form.value.verified,
        isNew: form.value.isNew,
      }
    }
  } else {
    listings.value.unshift({
      id: Date.now(),
      title: form.value.title,
      location,
      price: String(form.value.price),
      type: typeMap[form.value.tab] || form.value.tab,
      tab: form.value.tab,
      university: form.value.university || '—',
      features: feats,
      verified: form.value.verified,
      isNew: form.value.isNew,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
    })
  }

  showForm.value = false
}
</script>
