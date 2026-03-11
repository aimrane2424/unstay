<template>
  <!-- Admin panel -->
  <AdminPanel v-if="isAdmin" />

  <!-- Main site -->
  <div v-else class="min-h-screen bg-[#f5f8ff]">
    <Navbar />
    <Hero />
    <Stats />
    <HowItWorks />
    <Listings />
    <Features />
    <Matching />
    <Cities />
    <Owners />
    <Testimonials />
    <CTA />
    <CommentsSection />
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
import { provideApp } from './composables/useApp'
import AdminPanel from './components/AdminPanel.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Stats from './components/Stats.vue'
import HowItWorks from './components/HowItWorks.vue'
import Listings from './components/Listings.vue'
import Features from './components/Features.vue'
import Matching from './components/Matching.vue'
import Cities from './components/Cities.vue'
import Owners from './components/Owners.vue'
import Testimonials from './components/Testimonials.vue'
import CTA from './components/CTA.vue'
import CommentsSection from './components/CommentsSection.vue'
import Footer from './components/Footer.vue'
import FloatingButtons from './components/FloatingButtons.vue'
import AuthModal from './components/AuthModal.vue'
import ListingModal from './components/ListingModal.vue'
import ProfileModal from './components/ProfileModal.vue'
import PublishModal from './components/PublishModal.vue'
import Toast from './components/Toast.vue'

const { showAuth, showListing, showProfile, showPublish, pendingPublish, selectedListing, user, toast, listings, pendingListings, users, comments, scrollToListings } = provideApp()

// Hash-based admin routing
const isAdmin = ref(window.location.hash === '#admin')
window.addEventListener('hashchange', () => {
  isAdmin.value = window.location.hash === '#admin'
})

const toastRef = ref(null)

// Wire toast ref to composable
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
  scrollToListings()
  toast.value?.add({ type: 'success', title: 'Annonce publiée !', msg: `"${newListing.title}" est maintenant visible` })
}

const handleLogout = () => {
  const name = user.value?.name
  user.value = null
  toast.value?.add({ type: 'info', title: 'Déconnexion', msg: `À bientôt ${name} !` })
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
