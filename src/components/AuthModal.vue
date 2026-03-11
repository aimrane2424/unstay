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
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#3b82f6" opacity="0.3"/>
                <path d="M20 8L8 18v14h9v-8h6v8h9V18L20 8z" fill="white"/>
                <rect x="17" y="17" width="6" height="6" rx="1" fill="#3b82f6"/>
              </svg>
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
                <button type="button" class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
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
                  <div class="text-2xl mb-1">🎓</div>
                  <p class="text-sm font-medium text-[#010f6b]">Étudiant</p>
                  <p class="text-xs text-gray-400">Je cherche</p>
                </button>
                <button type="button" @click="registerForm.type = 'proprietaire'"
                        class="p-3 rounded-xl border-2 text-center transition-all"
                        :class="registerForm.type === 'proprietaire' ? 'border-[#3b82f6] bg-[#3b82f6]/5' : 'border-gray-200 hover:border-gray-300'">
                  <div class="text-2xl mb-1">🏠</div>
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
