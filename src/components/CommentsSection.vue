<template>
  <section class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Section title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-[#0B1854] mb-3">Avis &amp; Commentaires</h2>
        <p class="text-slate-500 text-lg max-w-xl mx-auto">Ce que pensent nos étudiants de la plateforme UniStay</p>
      </div>

      <!-- Form area -->
      <div class="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100">
        <template v-if="user">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Laisser un avis</h3>

          <div v-if="submitted" class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-5 mb-4">
            <svg class="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-green-700 font-medium">Votre avis sera visible après validation par notre équipe.</p>
          </div>

          <div v-else class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Nom</label>
              <input v-model="formName" type="text" placeholder="Votre nom"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Commentaire</label>
              <textarea v-model="formText" rows="4" placeholder="Partagez votre expérience avec UniStay..."
                        class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Note</label>
              <div class="flex items-center gap-2">
                <button v-for="star in 5" :key="star"
                        @click="formRating = star"
                        type="button"
                        class="text-2xl transition-transform hover:scale-110 focus:outline-none">
                  <span :class="star <= formRating ? 'text-amber-400' : 'text-slate-300'">★</span>
                </button>
                <span class="text-sm text-slate-500 ml-2">{{ formRating }}/5</span>
              </div>
            </div>

            <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

            <button @click="submitComment"
                    class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
              Soumettre mon avis
            </button>
          </div>
        </template>

        <template v-else>
          <div class="text-center py-6">
            <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <p class="text-slate-600 font-medium mb-4">Connectez-vous pour laisser un avis</p>
            <button @click="openAuth"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
              Se connecter
            </button>
          </div>
        </template>
      </div>

      <!-- Approved comments grid -->
      <div v-if="approvedComments.length > 0">
        <h3 class="text-xl font-bold text-slate-800 mb-6">Avis des étudiants ({{ approvedComments.length }})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="comment in approvedComments" :key="comment.id"
               class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                     style="background: linear-gradient(135deg, #0B1854, #3b82f6)">
                  {{ comment.author.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm">{{ comment.author }}</p>
                  <p class="text-slate-400 text-xs">{{ formatDate(comment.createdAt) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-0.5">
                <span v-for="s in 5" :key="s" class="text-base"
                      :class="s <= comment.rating ? 'text-amber-400' : 'text-slate-200'">★</span>
              </div>
            </div>
            <p class="text-slate-600 text-sm leading-relaxed">{{ comment.text }}</p>
            <div v-if="comment.adminReply" class="bg-blue-50 rounded-xl p-4 mt-1">
              <p class="text-xs font-semibold text-blue-700 mb-1">Réponse UniStay :</p>
              <p class="text-blue-600 text-sm">{{ comment.adminReply }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p class="font-medium">Aucun avis pour le moment</p>
        <p class="text-sm mt-1">Soyez le premier à laisser un avis !</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApp } from '../composables/useApp'

const { user, comments, openAuth } = useApp()

const formName = ref(user.value?.name || '')
const formText = ref('')
const formRating = ref(5)
const formError = ref('')
const submitted = ref(false)

// Keep formName in sync when user logs in
import { watch } from 'vue'
watch(() => user.value?.name, (name) => {
  if (name) formName.value = name
})

const approvedComments = computed(() => comments.value.filter(c => c.status === 'approved'))

const submitComment = () => {
  formError.value = ''
  if (!formName.value.trim()) { formError.value = 'Le nom est requis'; return }
  if (!formText.value.trim()) { formError.value = 'Le commentaire est requis'; return }

  comments.value.push({
    id: Date.now(),
    author: formName.value.trim(),
    email: user.value?.email || '',
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
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}
</script>
