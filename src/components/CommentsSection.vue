<template>
  <section class="bg-[#f5f8ff] py-20 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          ⭐ Témoignages
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Ce que disent les <span class="text-blue-600">étudiants</span>
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto">Avis réels de nos utilisateurs — validés par notre équipe</p>
      </div>

      <!-- Approved comments grid -->
      <div v-if="approvedComments.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="comment in approvedComments" :key="comment.id"
             class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow">

          <!-- Stars -->
          <div class="flex gap-1">
            <span v-for="s in 5" :key="s" class="text-lg"
                  :class="s <= comment.rating ? 'text-amber-400' : 'text-slate-200'">★</span>
          </div>

          <!-- Text -->
          <p class="text-slate-600 text-sm leading-relaxed flex-1 italic">"{{ comment.text }}"</p>

          <!-- Admin reply -->
          <div v-if="comment.adminReply" class="bg-blue-50 rounded-xl px-4 py-3">
            <p class="text-xs font-semibold text-blue-700 mb-1">Réponse UniStay :</p>
            <p class="text-blue-600 text-xs leading-relaxed">{{ comment.adminReply }}</p>
          </div>

          <!-- Author -->
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                   :style="{ background: avatarColor(comment.author) }">
                {{ comment.author.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold text-slate-800 text-sm">{{ comment.author }}</p>
                <p class="text-slate-400 text-xs">{{ formatDate(comment.createdAt) }}</p>
              </div>
            </div>
            <span class="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Vérifié
            </span>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-10 text-slate-400 mb-12">
        <p class="text-2xl mb-2">💬</p>
        <p class="font-medium">Aucun avis pour le moment</p>
        <p class="text-sm mt-1">Soyez le premier à partager votre expérience !</p>
      </div>

      <!-- Write review form -->
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
          <div class="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 class="font-bold text-slate-800">Laisser un avis</h3>
        </div>

        <div class="px-8 py-6">
          <!-- Not logged in -->
          <div v-if="!user" class="text-center py-4">
            <p class="text-slate-500 mb-4 text-sm">Connectez-vous pour partager votre expérience</p>
            <button @click="openAuth"
                    class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
              Se connecter
            </button>
          </div>

          <!-- Success -->
          <div v-else-if="submitted" class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-5">
            <svg class="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-green-700 font-medium text-sm">Merci ! Votre avis sera visible après validation.</p>
          </div>

          <!-- Form -->
          <div v-else class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Note</label>
              <div class="flex items-center gap-1.5">
                <button v-for="star in 5" :key="star" @click="formRating = star" type="button"
                        class="text-2xl transition-transform hover:scale-110 focus:outline-none">
                  <span :class="star <= formRating ? 'text-amber-400' : 'text-slate-300'">★</span>
                </button>
                <span class="text-sm text-slate-400 ml-1">{{ formRating }}/5</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Votre avis</label>
              <textarea v-model="formText" rows="3"
                        placeholder="Partagez votre expérience avec UniStay..."
                        class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"></textarea>
            </div>

            <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

            <button @click="submitComment"
                    class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm w-full">
              Publier mon avis
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useApp } from '../composables/useApp'

const { user, comments, openAuth } = useApp()

const formText = ref('')
const formRating = ref(5)
const formError = ref('')
const submitted = ref(false)

const approvedComments = computed(() => comments.value.filter(c => c.status === 'approved'))

const avatarColors = ['#0B1854', '#6366f1', '#8b5cf6', '#ec4899', '#059669', '#d97706', '#0ea5e9']
const avatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length]

const submitComment = () => {
  formError.value = ''
  if (!formText.value.trim()) { formError.value = 'Le commentaire est requis'; return }

  comments.value.push({
    id: Date.now(),
    author: user.value.name,
    email: user.value.email || '',
    text: formText.value.trim(),
    rating: formRating.value,
    status: 'pending',
    createdAt: new Date().toISOString()
  })

  formText.value = ''
  formRating.value = 5
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 6000)
}

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}
</script>
