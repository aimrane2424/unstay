<template>
  <!-- Splash screen -->
  <SplashScreen />

  <!-- Admin panel -->
  <AdminPanel v-if="isAdmin" />

  <!-- Main site -->
  <div v-else class="min-h-screen bg-[#f5f8ff]">
    <Navbar />
    <RouterView />
    <Footer />

    <FloatingButtons />
    <AuthModal v-model="showAuth" @success="handleLogin" />
    <ListingModal v-model="showListing" :listing="selectedListing" @contact="handleContact" />
    <ProfileModal v-model="showProfile" :user="user" @saved="handleProfileSaved" />
    <PublishModal v-model="showPublish" @published="handlePublished" />
    <Toast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { provideApp } from './composables/useApp'
import SplashScreen from './components/SplashScreen.vue'
import AdminPanel from './components/AdminPanel.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingButtons from './components/FloatingButtons.vue'
import AuthModal from './components/AuthModal.vue'
import ListingModal from './components/ListingModal.vue'
import ProfileModal from './components/ProfileModal.vue'
import PublishModal from './components/PublishModal.vue'
import Toast from './components/Toast.vue'

const router = useRouter()
const { showAuth, showListing, showProfile, showPublish, pendingPublish, selectedListing, user, toast, listings, pendingListings, users, comments } = provideApp()

// Hash-based admin routing
const isAdmin = ref(window.location.hash === '#admin')
window.addEventListener('hashchange', () => {
  isAdmin.value = window.location.hash === '#admin'
})

const toastRef = ref(null)
watch(toastRef, (t) => { toast.value = t })

const handleLogin = (data) => {
  user.value = { ...data }
  if (!users.value.find(u => u.email === data.email)) {
    users.value.push({ ...data, id: Date.now(), joinedAt: new Date().toISOString() })
  }
  toast.value?.add({ type: 'success', title: `Bienvenue ${data.name} !`, msg: 'Vous êtes connecté à UniStay' })
  if (pendingPublish.value) {
    pendingPublish.value = false
    setTimeout(() => { showPublish.value = true }, 300)
  }
}

const typeToTab = { studio: 'Studio', chambre: 'Chambre seule', appartement: 'Appartement', maison: 'Appartement' }
const gradients = [
  'linear-gradient(135deg, #dbeafe, #93c5fd)',
  'linear-gradient(135deg, #d1fae5, #6ee7b7)',
  'linear-gradient(135deg, #ede9fe, #c4b5fd)',
  'linear-gradient(135deg, #fef3c7, #fcd34d)',
  'linear-gradient(135deg, #fee2e2, #fca5a5)',
]

const handlePublished = (listing) => {
  const equipLabels = { wifi: 'WiFi', meuble: 'Meublé', parking: 'Parking', cuisine: 'Cuisine équipée', sdb: 'Salle de bain', climatisation: 'Climatisation', balcon: 'Balcon', gardien: 'Gardien' }
  const newListing = {
    id: Date.now(),
    title: listing.title || listing.type,
    location: `${listing.city}${listing.address ? ', ' + listing.address : ''}`,
    price: String(listing.price),
    type: listing.type.charAt(0).toUpperCase() + listing.type.slice(1),
    verified: false,
    isNew: true,
    features: listing.equipements.map(e => equipLabels[e] || e),
    university: '—',
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    tab: typeToTab[listing.type] || 'Appartement',
  }
  pendingListings.value.unshift({ ...newListing, status: 'pending', submittedAt: new Date().toISOString() })
  router.push('/logements')
  toast.value?.add({ type: 'success', title: 'Annonce publiée !', msg: `"${newListing.title}" est maintenant visible` })
}

const handleContact = ({ type, listing }) => {
  showListing.value = false
  if (type === 'whatsapp') {
    toast.value?.add({ type: 'success', title: 'Redirection WhatsApp', msg: `Contact: "${listing.title}"` })
  } else {
    toast.value?.add({ type: 'success', title: 'Message envoyé !', msg: 'Le propriétaire vous répondra bientôt' })
  }
}

const handleProfileSaved = (data) => {
  if (user.value) user.value = { ...user.value, ...data }
  toast.value?.add({ type: 'success', title: 'Profil mis à jour !', msg: 'Vos informations ont été sauvegardées' })
}
</script>
