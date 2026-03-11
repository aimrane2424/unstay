<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-glass"
       :class="scrolled ? 'shadow-2xl shadow-black/30' : ''">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="UniStay" class="w-10 h-10 object-contain" />
          <span class="text-white font-bold text-xl">
            uni<span class="text-[#3b82f6]">stay</span>
          </span>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <a v-for="item in navItems" :key="item.label"
             :href="item.href"
             @click="navClick($event, item.href)"
             class="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer">
            {{ item.label }}
          </a>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <!-- User info if logged in -->
          <div v-if="user" class="relative flex items-center gap-2">
            <button @click.stop="dropdownOpen = !dropdownOpen"
                    class="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-xl transition-colors">
              <div class="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                {{ user.name[0].toUpperCase() }}
              </div>
              <span class="text-white text-sm font-medium">{{ user.name }}</span>
              <svg class="w-4 h-4 text-white/60 transition-transform" :class="dropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- Dropdown -->
            <div v-if="dropdownOpen"
                 class="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                 @click.stop>
              <button @click="openProfile(); dropdownOpen = false"
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#010f6b] transition-colors">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Mon profil
              </button>
              <button @click="openProfile('favs'); dropdownOpen = false"
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#010f6b] transition-colors">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                Mes favoris
              </button>
              <button @click="openMessages(); dropdownOpen = false"
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#010f6b] transition-colors">
                <svg class="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Messages
              </button>
              <div class="border-t border-gray-100">
                <button @click="logout(); dropdownOpen = false"
                        class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
          <button v-else @click="openAuth()"
                  class="text-white/80 hover:text-white text-sm font-medium transition-colors px-3 py-2">
            Connexion
          </button>
          <button @click="openPublish()"
                  class="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            Publier une annonce
          </button>
        </div>

        <!-- Mobile menu button -->
        <button @click="mobileOpen = !mobileOpen"
                class="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileOpen" class="md:hidden bg-[#010f6b] border-t border-white/10 px-4 py-4">
      <div class="flex flex-col gap-3">
        <a v-for="item in navItems" :key="item.label"
           :href="item.href"
           class="text-white/80 hover:text-white text-sm font-medium py-2 border-b border-white/5 transition-colors">
          {{ item.label }}
        </a>
        <div class="pt-3 flex flex-col gap-2">
          <button @click="openAuth()" class="text-white border border-white/20 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
            Connexion
          </button>
          <button @click="openPublish()" class="btn-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
            Publier une annonce
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useApp } from '../composables/useApp'

const { user, openAuth, openProfile, openPublish, scrollTo, whatsapp, toast } = useApp()

const openMessages = () => {
  toast.value?.add({ type: 'info', title: 'Messages', msg: 'Contactez directement via WhatsApp' })
  whatsapp('Bonjour, je souhaite discuter d\'un logement UniStay')
}

const scrolled = ref(false)
const mobileOpen = ref(false)
const dropdownOpen = ref(false)

const logout = () => {
  const { user: u, toast } = useApp()
  const name = u.value?.name
  u.value = null
  toast.value?.add({ type: 'info', title: 'Déconnexion', msg: `À bientôt ${name} !` })
}

const navClick = (e, href) => {
  e.preventDefault()
  const id = href.replace('#', '')
  scrollTo(id)
  mobileOpen.value = false
}

const handleClickOutside = () => { if (dropdownOpen.value) dropdownOpen.value = false }
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const navItems = [
  { label: 'Trouver un logement', href: '#listings' },
  { label: 'Colocation', href: '#colocation' },
  { label: 'Villes', href: '#cities' },
  { label: 'Comment ça marche', href: '#how' },
  { label: 'Propriétaires', href: '#owners' },
]

const handleScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
