<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue"
           class="fixed inset-0 z-[100] flex items-center justify-center p-4"
           @click.self="$emit('update:modelValue', false)">

        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

          <!-- Header -->
          <div class="gradient-hero p-6 text-center relative">
            <button @click="$emit('update:modelValue', false)"
                    class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div class="flex items-center justify-center gap-2 mb-2">
              <img src="/logo.png" alt="UniStay" class="w-9 h-9 rounded-full object-cover" style="mix-blend-mode: lighten;" />
              <span class="text-white font-bold text-xl">uni<span class="text-[#3b82f6]">stay</span></span>
            </div>
            <p class="text-white/70 text-sm">Plateforme logement étudiant #1 au Maroc</p>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-gray-100">
            <button @click="activeTab = 'login'"
                    class="flex-1 py-3 text-sm font-semibold transition-colors"
                    :class="activeTab === 'login' ? 'text-[#010f6b] border-b-2 border-[#3b82f6]' : 'text-gray-400 hover:text-gray-600'">
              Connexion
            </button>
            <button @click="activeTab = 'register'"
                    class="flex-1 py-3 text-sm font-semibold transition-colors"
                    :class="activeTab === 'register' ? 'text-[#010f6b] border-b-2 border-[#3b82f6]' : 'text-gray-400 hover:text-gray-600'">
              Créer un compte
            </button>
          </div>

          <!-- Form -->
          <div class="p-6">

            <!-- Login Form -->
            <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Email ou téléphone</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <input v-model="loginForm.email" type="text" placeholder="email@exemple.com"
                         class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <input v-model="loginForm.password" :type="showPass ? 'text' : 'password'" placeholder="••••••••"
                         class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                  <button type="button" @click="showPass = !showPass"
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
                <div class="text-right mt-1">
                  <a href="#" class="text-xs text-[#3b82f6] hover:underline">Mot de passe oublié ?</a>
                </div>
              </div>

              <button type="submit" :disabled="loading"
                      class="w-full btn-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ loading ? 'Connexion...' : 'Se connecter' }}
              </button>

              <!-- Social login -->
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-100"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="bg-white px-3 text-xs text-gray-400">ou continuer avec</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button type="button" @click="handleSocialLogin('google')" :disabled="socialLoading"
                        class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-60">
                  <svg v-if="socialLoading === 'google'" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {{ socialLoading === 'google' ? 'Connexion...' : 'Google' }}
                </button>
                <button type="button" @click="handleSocialLogin('facebook')" :disabled="socialLoading"
                        class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-60">
                  <svg v-if="socialLoading === 'facebook'" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  {{ socialLoading === 'facebook' ? 'Connexion...' : 'Facebook' }}
                </button>
              </div>
            </form>

            <!-- Register Form -->
            <form v-else @submit.prevent="handleRegister" class="space-y-4">
              <!-- User type -->
              <div class="grid grid-cols-2 gap-3">
                <button type="button" @click="registerForm.type = 'etudiant'"
                        class="p-3 rounded-xl border-2 text-center transition-all"
                        :class="registerForm.type === 'etudiant' ? 'border-[#3b82f6] bg-[#3b82f6]/5' : 'border-gray-200 hover:border-gray-300'">
                  <div class="flex justify-center mb-1">
                    <svg class="w-7 h-7 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 3.866-4.03 7-9 7s-9-3.134-9-7a12.083 12.083 0 012.84-7.578L12 14z"/>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-[#010f6b]">Étudiant</p>
                  <p class="text-xs text-gray-400">Je cherche</p>
                </button>
                <button type="button" @click="registerForm.type = 'proprietaire'"
                        class="p-3 rounded-xl border-2 text-center transition-all"
                        :class="registerForm.type === 'proprietaire' ? 'border-[#3b82f6] bg-[#3b82f6]/5' : 'border-gray-200 hover:border-gray-300'">
                  <div class="flex justify-center mb-1">
                    <svg class="w-7 h-7 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 22V12h6v10"/>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-[#010f6b]">Propriétaire</p>
                  <p class="text-xs text-gray-400">Je loue</p>
                </button>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Prénom</label>
                  <input v-model="registerForm.firstName" type="text" placeholder="Mohamed"
                         class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                  <input v-model="registerForm.lastName" type="text" placeholder="Alami"
                         class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+212</span>
                  <input v-model="registerForm.phone" type="tel" placeholder="6 12 34 56 78"
                         class="w-full pl-14 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input v-model="registerForm.email" type="email" placeholder="email@exemple.com"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Mot de passe</label>
                <input v-model="registerForm.password" type="password" placeholder="Min. 8 caractères"
                       class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"/>
              </div>

              <div class="flex items-start gap-2">
                <input v-model="registerForm.terms" type="checkbox" id="terms" class="mt-0.5 accent-[#3b82f6]"/>
                <label for="terms" class="text-xs text-gray-500">
                  J'accepte les <a href="#" class="text-[#3b82f6] hover:underline">conditions d'utilisation</a> et la <a href="#" class="text-[#3b82f6] hover:underline">politique de confidentialité</a>
                </label>
              </div>

              <button type="submit" :disabled="loading || !registerForm.terms"
                      class="w-full btn-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ loading ? 'Création...' : 'Créer mon compte' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'success'])

const activeTab = ref('login')
const showPass = ref(false)
const loading = ref(false)
const socialLoading = ref(null)

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({
  type: 'etudiant',
  firstName: '', lastName: '',
  phone: '', email: '', password: '',
  terms: false
})

const handleLogin = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
  const name = loginForm.value.email.split('@')[0]
  emit('success', { name, email: loginForm.value.email, type: 'etudiant' })
  emit('update:modelValue', false)
}

const socialProfiles = {
  google: [
    { firstName: 'Youssef', lastName: 'Alami', email: 'youssef.alami@gmail.com' },
    { firstName: 'Fatima', lastName: 'Benali', email: 'fatima.benali@gmail.com' },
    { firstName: 'Hamza', lastName: 'El Idrissi', email: 'hamza.elidrissi@gmail.com' },
  ],
  facebook: [
    { firstName: 'Karim', lastName: 'Moussaoui', email: 'karim.moussaoui@outlook.com' },
    { firstName: 'Sara', lastName: 'Tahiri', email: 'sara.tahiri@hotmail.com' },
    { firstName: 'Amine', lastName: 'Belhaj', email: 'amine.belhaj@outlook.com' },
  ]
}

const handleSocialLogin = async (provider) => {
  socialLoading.value = provider
  await new Promise(r => setTimeout(r, 1500))
  const profiles = socialProfiles[provider]
  const profile = profiles[Math.floor(Math.random() * profiles.length)]
  socialLoading.value = null
  emit('success', {
    ...profile,
    name: profile.firstName + ' ' + profile.lastName,
    type: 'etudiant',
    provider
  })
  emit('update:modelValue', false)
}

const handleRegister = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
  emit('success', {
    name: registerForm.value.firstName + ' ' + registerForm.value.lastName,
    email: registerForm.value.email,
    phone: registerForm.value.phone,
    type: registerForm.value.type,
    firstName: registerForm.value.firstName,
    lastName: registerForm.value.lastName
  })
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .relative, .modal-leave-to .relative { transform: scale(0.95) translateY(20px); }
</style>
