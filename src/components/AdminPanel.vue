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

    <!-- Tab navigation -->
    <div class="bg-white border-b border-slate-200 px-6">
      <div class="max-w-7xl mx-auto flex gap-1">
        <button v-for="tab in tabs" :key="tab.key"
                @click="activeTab = tab.key"
                class="relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px"
                :class="activeTab === tab.key
                  ? 'border-[#0B1854] text-[#0B1854]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'">
          {{ tab.label }}
          <span v-if="tab.badge > 0"
                class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white"
                :class="tab.badgeColor || 'bg-red-500'">
            {{ tab.badge }}
          </span>
        </button>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-6 py-8">

      <!-- ===== TAB 1: ANNONCES ===== -->
      <div v-if="activeTab === 'annonces'">

        <!-- Stats cards -->
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">Total annonces</p>
            <p class="text-3xl font-extrabold text-slate-800">{{ listings.length }}</p>
            <p class="text-blue-500 text-xs mt-1 font-medium">actives</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">Vérifiées</p>
            <p class="text-3xl font-extrabold text-green-600">{{ listings.filter(l => l.verified).length }}</p>
            <p class="text-slate-400 text-xs mt-1">{{ listings.filter(l => !l.verified).length }} non vérifiées</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">Nouvelles</p>
            <p class="text-3xl font-extrabold text-blue-500">{{ listings.filter(l => l.isNew).length }}</p>
            <p class="text-slate-400 text-xs mt-1">cette semaine</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">Budget moyen</p>
            <p class="text-3xl font-extrabold text-purple-600">{{ avgPrice }} <span class="text-base font-normal text-slate-400">DH</span></p>
            <p class="text-slate-400 text-xs mt-1">/ mois</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">En attente</p>
            <p class="text-3xl font-extrabold text-orange-500">{{ pendingListings.length }}</p>
            <p class="text-orange-400 text-xs mt-1 font-medium">à approuver</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-medium mb-1">Commentaires</p>
            <p class="text-3xl font-extrabold text-violet-600">{{ comments.filter(c => c.status === 'pending').length }}</p>
            <p class="text-violet-400 text-xs mt-1 font-medium">à modérer</p>
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
      </div>

      <!-- ===== TAB 2: EN ATTENTE ===== -->
      <div v-if="activeTab === 'pending'">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Annonces en attente d'approbation</h2>
            <p class="text-slate-400 text-sm mt-1">{{ pendingListings.length }} annonce(s) soumises par des utilisateurs</p>
          </div>
        </div>

        <div v-if="pendingListings.length === 0" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <p class="text-slate-500 font-medium">Aucune annonce en attente</p>
          <p class="text-slate-400 text-sm mt-1">Toutes les annonces soumises ont été traitées</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="listing in pendingListings" :key="listing.id"
               class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="h-1.5 bg-amber-400"></div>
            <div class="p-6">

              <!-- Header row -->
              <div class="flex items-start justify-between gap-3 mb-4">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                       :style="{ background: listing.gradient || 'linear-gradient(135deg, #dbeafe, #93c5fd)' }">
                    <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p class="font-bold text-slate-800 text-sm truncate">{{ listing.title }}</p>
                    <p class="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                      <svg class="w-3 h-3 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      {{ listing.location }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">En attente</span>
                  <button @click="expandedPending === listing.id ? expandedPending = null : expandedPending = listing.id"
                          class="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                          :title="expandedPending === listing.id ? 'Réduire' : 'Voir les détails'">
                    <svg class="w-4 h-4 text-slate-500 transition-transform" :class="expandedPending === listing.id ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                </div>
              </div>

              <!-- Quick info pills -->
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg">{{ listing.type || listing.tab }}</span>
                <span class="bg-slate-50 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg">{{ listing.price }} DH/mois</span>
                <span v-if="listing.surface" class="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-lg">{{ listing.surface }} m²</span>
                <span v-if="listing.submittedAt" class="text-slate-400 text-xs ml-auto">Soumis le {{ formatDate(listing.submittedAt) }}</span>
              </div>

              <!-- Expanded details -->
              <div v-if="expandedPending === listing.id" class="border-t border-slate-100 pt-4 mb-4 space-y-3">

                <!-- Description -->
                <div v-if="listing.description">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Description</p>
                  <p class="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">{{ listing.description }}</p>
                </div>

                <!-- Grid of details -->
                <div class="grid grid-cols-2 gap-3">
                  <div v-if="listing.phone" class="bg-slate-50 rounded-xl p-3">
                    <p class="text-xs text-slate-400 mb-0.5">Téléphone</p>
                    <p class="text-sm font-semibold text-slate-800">+212 {{ listing.phone }}</p>
                  </div>
                  <div v-if="listing.availableFrom" class="bg-slate-50 rounded-xl p-3">
                    <p class="text-xs text-slate-400 mb-0.5">Disponible dès</p>
                    <p class="text-sm font-semibold text-slate-800">{{ formatDate(listing.availableFrom) }}</p>
                  </div>
                  <div v-if="listing.rooms" class="bg-slate-50 rounded-xl p-3">
                    <p class="text-xs text-slate-400 mb-0.5">Chambres</p>
                    <p class="text-sm font-semibold text-slate-800">{{ listing.rooms }}</p>
                  </div>
                  <div v-if="listing.floor" class="bg-slate-50 rounded-xl p-3">
                    <p class="text-xs text-slate-400 mb-0.5">Étage</p>
                    <p class="text-sm font-semibold text-slate-800">{{ listing.floor === 'rdc' ? 'Rez-de-chaussée' : listing.floor + 'e étage' }}</p>
                  </div>
                </div>

                <!-- Equipements -->
                <div v-if="listing.equipements?.length || listing.features?.length">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Équipements</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="eq in (listing.equipements || listing.features)" :key="eq"
                          class="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-lg">{{ eq }}</span>
                  </div>
                </div>

                <!-- Video -->
                <div v-if="listing.video" class="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                  <svg class="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  Vidéo jointe
                  <a :href="listing.video" target="_blank" class="text-blue-600 hover:underline ml-1">Voir la vidéo →</a>
                </div>

                <!-- Edit button -->
                <button @click="openPendingEdit(listing)"
                        class="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2.5 rounded-xl transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Modifier avant approbation
                </button>
              </div>

              <!-- Action buttons -->
              <div class="flex gap-2">
                <button @click="approvePending(listing)"
                        class="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  Approuver
                </button>
                <button @click="rejectPending(listing)"
                        class="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                  Rejeter
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- ===== TAB 3: UTILISATEURS ===== -->
      <div v-if="activeTab === 'users'">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Utilisateurs inscrits</h2>
            <p class="text-slate-400 text-sm mt-1">{{ users.length }} utilisateur(s) enregistré(s)</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div v-if="users.length === 0" class="p-16 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <p class="text-slate-500 font-medium">Aucun utilisateur inscrit</p>
            <p class="text-slate-400 text-sm mt-1">Les utilisateurs apparaîtront ici après leur inscription</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-50 text-left">
                  <th class="px-6 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Utilisateur</th>
                  <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Email</th>
                  <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Téléphone</th>
                  <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Inscription</th>
                  <th class="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="u in users" :key="u.id" class="hover:bg-slate-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                           style="background: linear-gradient(135deg, #0B1854, #3b82f6)">
                        {{ (u.name || '?').charAt(0).toUpperCase() }}
                      </div>
                      <p class="font-semibold text-slate-800">{{ u.name }}</p>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-slate-600">{{ u.email }}</td>
                  <td class="px-4 py-4">
                    <span class="text-xs font-medium px-2.5 py-1 rounded-lg"
                          :class="u.type === 'proprietaire'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'">
                      {{ u.type === 'proprietaire' ? 'Propriétaire' : 'Étudiant' }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-slate-600">{{ u.phone || '—' }}</td>
                  <td class="px-4 py-4 text-slate-400 text-xs">{{ formatDate(u.joinedAt) }}</td>
                  <td class="px-4 py-4">
                    <button @click="deleteUser(u)"
                            class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                            title="Supprimer">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===== TAB 4: COMMENTAIRES ===== -->
      <div v-if="activeTab === 'comments'">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Commentaires &amp; Avis</h2>
            <p class="text-slate-400 text-sm mt-1">{{ comments.length }} commentaire(s) au total — {{ comments.filter(c => c.status === 'pending').length }} en attente</p>
          </div>
        </div>

        <div v-if="comments.length === 0" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <p class="text-slate-500 font-medium">Aucun commentaire pour le moment</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="comment in comments" :key="comment.id"
               class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4 flex-1 min-w-0">
                <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                     style="background: linear-gradient(135deg, #0B1854, #3b82f6)">
                  {{ (comment.author || '?').charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap mb-1">
                    <p class="font-bold text-slate-800">{{ comment.author }}</p>
                    <p class="text-slate-400 text-xs">{{ comment.email }}</p>
                    <div class="flex items-center gap-0.5">
                      <span v-for="s in 5" :key="s" class="text-sm"
                            :class="s <= comment.rating ? 'text-amber-400' : 'text-slate-200'">★</span>
                    </div>
                    <span class="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                          :class="comment.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'">
                      {{ comment.status === 'approved' ? 'Approuvé' : 'En attente' }}
                    </span>
                  </div>
                  <p class="text-slate-600 text-sm leading-relaxed">{{ comment.text }}</p>
                  <p class="text-slate-400 text-xs mt-1">{{ formatDate(comment.createdAt) }}</p>

                  <!-- Admin reply display -->
                  <div v-if="comment.adminReply" class="mt-3 bg-blue-50 rounded-xl p-4">
                    <p class="text-xs font-semibold text-blue-700 mb-1">Votre réponse :</p>
                    <p class="text-blue-600 text-sm">{{ comment.adminReply }}</p>
                  </div>

                  <!-- Inline reply textarea -->
                  <div v-if="replyingTo === comment.id" class="mt-3">
                    <textarea v-model="replyText" rows="3" placeholder="Écrire une réponse..."
                              class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none"></textarea>
                    <div class="flex gap-2 mt-2">
                      <button @click="saveReply(comment)"
                              class="bg-[#0B1854] hover:bg-[#1E3A8A] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                        Enregistrer
                      </button>
                      <button @click="replyingTo = null; replyText = ''"
                              class="border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex flex-col gap-2 shrink-0">
                <button v-if="comment.status !== 'approved'"
                        @click="approveComment(comment)"
                        class="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  Approuver
                </button>
                <button @click="startReply(comment)"
                        class="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                  Répondre
                </button>
                <button @click="deleteComment(comment)"
                        class="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
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
              <label class="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Localisation <span class="text-slate-400 font-normal text-xs">(Google Maps)</span>
              </label>
              <input v-model="form.address" type="text" placeholder="Ex: Hay Ennour, rue Al Massira"
                     class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
              <p class="text-xs text-slate-400 mt-1">Plus précis → mieux visible sur la carte</p>
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
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                Vidéo <span class="text-slate-400 font-normal">(optionnel)</span>
              </label>

              <!-- Mode toggle -->
              <div class="flex gap-2 mb-3">
                <button type="button" @click="adminVideoMode = 'url'"
                        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium border transition-all"
                        :class="adminVideoMode === 'url' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  Lien YouTube
                </button>
                <button type="button" @click="adminVideoMode = 'file'"
                        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium border transition-all"
                        :class="adminVideoMode === 'file' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  Depuis mon appareil
                </button>
              </div>

              <!-- URL mode -->
              <div v-if="adminVideoMode === 'url'">
                <input v-model="form.video" type="url" placeholder="https://www.youtube.com/watch?v=..."
                       class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"/>
                <p class="text-xs text-slate-400 mt-1">Collez un lien YouTube (watch ou embed)</p>
                <div v-if="adminVideoThumb" class="mt-3 relative rounded-xl overflow-hidden bg-black group cursor-pointer" style="aspect-ratio:16/9"
                     @click="adminShowPreview = !adminShowPreview">
                  <template v-if="!adminShowPreview">
                    <img :src="adminVideoThumb" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"/>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <span class="absolute bottom-2 left-3 text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">Cliquer pour prévisualiser</span>
                  </template>
                  <iframe v-else :src="adminVideoEmbedUrl" class="w-full h-full" frameborder="0" allowfullscreen allow="autoplay"></iframe>
                </div>
              </div>

              <!-- File mode -->
              <div v-else>
                <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                     @click="adminVideoFileInput?.click()">
                  <svg class="w-10 h-10 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                  <p class="text-sm font-medium text-slate-600">Cliquer pour choisir une vidéo</p>
                  <p class="text-xs text-slate-400 mt-1">MP4, MOV, AVI · Max 100MB</p>
                  <input ref="adminVideoFileInput" type="file" accept="video/*" class="hidden" @change="handleAdminVideoFile"/>
                </div>
                <div v-if="adminVideoFileUrl" class="mt-3 rounded-xl overflow-hidden bg-black" style="aspect-ratio:16/9">
                  <video :src="adminVideoFileUrl" controls class="w-full h-full object-contain"></video>
                </div>
                <div v-if="adminVideoFileUrl" class="mt-2 flex items-center gap-2 text-xs text-green-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {{ adminVideoFileName }}
                  <button type="button" @click="removeAdminVideoFile" class="ml-auto text-red-400 hover:text-red-600">Supprimer</button>
                </div>
              </div>
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

const extractYouTubeId = (url) => {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

const adminShowPreview = ref(false)
const adminVideoMode = ref('url')
const adminVideoFileInput = ref(null)
const adminVideoFileUrl = ref('')
const adminVideoFileName = ref('')

const adminVideoThumb = computed(() => {
  const id = extractYouTubeId(form.value?.video)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
})
const adminVideoEmbedUrl = computed(() => {
  const id = extractYouTubeId(form.value?.video)
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : form.value?.video
})

const handleAdminVideoFile = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (adminVideoFileUrl.value) URL.revokeObjectURL(adminVideoFileUrl.value)
  adminVideoFileUrl.value = URL.createObjectURL(file)
  adminVideoFileName.value = file.name
}
const removeAdminVideoFile = () => {
  if (adminVideoFileUrl.value) URL.revokeObjectURL(adminVideoFileUrl.value)
  adminVideoFileUrl.value = ''
  adminVideoFileName.value = ''
}

const { listings, pendingListings, users, comments, addListing, updateListing, deleteListing, addPendingListing, updatePendingListing, removePendingListing, deleteUser: removeUser, updateComment, deleteComment } = useApp()

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

// --- Tabs ---
const activeTab = ref('annonces')

const tabs = computed(() => [
  { key: 'annonces', label: 'Annonces', badge: 0 },
  { key: 'pending', label: 'En attente', badge: pendingListings.value.length, badgeColor: 'bg-orange-500' },
  { key: 'users', label: 'Utilisateurs', badge: 0 },
  { key: 'comments', label: 'Commentaires', badge: comments.value.filter(c => c.status === 'pending').length, badgeColor: 'bg-violet-500' },
])

// --- Helpers ---
const formatDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

// --- Stats ---
const avgPrice = computed(() => {
  if (!listings.value.length) return 0
  const total = listings.value.reduce((s, l) => s + parseInt(l.price), 0)
  return Math.round(total / listings.value.length)
})

// --- Table (Tab 1) ---
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
  updateListing(listing.id, { verified: !listing.verified })
}

// --- Delete listing ---
const deleteTarget = ref(null)
const confirmDelete = (listing) => { deleteTarget.value = listing }
const doDelete = () => {
  deleteListing(deleteTarget.value.id)
  deleteTarget.value = null
}

// --- Pending expand ---
const expandedPending = ref(null)

// --- Add / Edit Form ---
const showForm = ref(false)
const editMode = ref(false)
const pendingEditMode = ref(false)
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
  university: '', features: '', video: '', verified: false, isNew: true
})

const form = ref(emptyForm())

const cities = ['Khenifra', 'Beni Mellal', 'Oujda', 'Taza', 'El Jadida', 'Settat', 'Safi', 'Larache', 'Nador', 'Khouribga']

const typeMap = { 'Chambre seule': 'Chambre', 'Colocation': 'Colocation', 'Studio': 'Studio', 'Appartement': 'Appartement' }

const openAddForm = () => {
  editMode.value = false
  pendingEditMode.value = false
  editingId.value = null
  form.value = emptyForm()
  formError.value = ''
  adminShowPreview.value = false
  adminVideoMode.value = 'url'
  adminVideoFileUrl.value = ''
  adminVideoFileName.value = ''
  showForm.value = true
}

const openEditForm = (listing) => {
  editMode.value = true
  pendingEditMode.value = false
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
    video: listing.video || '',
    verified: listing.verified,
    isNew: listing.isNew,
  }
  formError.value = ''
  adminShowPreview.value = false
  adminVideoMode.value = 'url'
  adminVideoFileUrl.value = ''
  adminVideoFileName.value = ''
  showForm.value = true
}

const openPendingEdit = (listing) => {
  pendingEditMode.value = true
  editMode.value = true
  editingId.value = listing.id
  const [city, address] = (listing.location || '').split(', ')
  form.value = {
    title: listing.title || '',
    city: city || '',
    address: address || '',
    price: listing.price || '',
    tab: listing.tab || listing.type || 'Chambre seule',
    university: listing.university || '',
    features: (listing.features || listing.equipements || []).join(', '),
    video: listing.video || '',
    verified: false,
    isNew: true,
  }
  formError.value = ''
  adminShowPreview.value = false
  adminVideoMode.value = 'url'
  adminVideoFileUrl.value = ''
  adminVideoFileName.value = ''
  showForm.value = true
}

const saveForm = () => {
  formError.value = ''
  if (!form.value.title.trim()) { formError.value = 'Le titre est requis'; return }
  if (!form.value.city) { formError.value = 'La ville est requise'; return }
  if (!form.value.price) { formError.value = 'Le prix est requis'; return }

  const feats = form.value.features.split(',').map(f => f.trim()).filter(Boolean)
  const location = form.value.address ? `${form.value.city}, ${form.value.address}` : form.value.city
  const videoFinal = adminVideoMode.value === 'file' ? adminVideoFileUrl.value : (form.value.video || '')

  if (pendingEditMode.value) {
    const existing = pendingListings.value.find(l => l.id === editingId.value)
    if (existing) {
      updatePendingListing(editingId.value, {
        title: form.value.title,
        location,
        price: String(form.value.price),
        tab: form.value.tab,
        type: typeMap[form.value.tab] || form.value.tab,
        university: form.value.university,
        features: feats,
        video: videoFinal,
      })
    }
    pendingEditMode.value = false
    showForm.value = false
    return
  }

  if (editMode.value) {
    updateListing(editingId.value, {
      title: form.value.title,
      location,
      price: String(form.value.price),
      tab: form.value.tab,
      type: typeMap[form.value.tab] || form.value.tab,
      university: form.value.university,
      features: feats,
      video: videoFinal,
      verified: form.value.verified,
      isNew: form.value.isNew,
    })
  } else {
    const newId = Date.now()
    addListing({
      id: newId,
      title: form.value.title,
      location,
      price: String(form.value.price),
      type: typeMap[form.value.tab] || form.value.tab,
      tab: form.value.tab,
      university: form.value.university || '—',
      features: feats,
      video: videoFinal,
      verified: form.value.verified,
      isNew: form.value.isNew,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
    })
  }

  showForm.value = false
}

// --- Pending listings (Tab 2) ---
const approvePending = (listing) => {
  removePendingListing(listing.id)
  const { status, submittedAt, ...rest } = listing
  addListing({ ...rest, verified: true })
}

const rejectPending = (listing) => {
  removePendingListing(listing.id)
}

// --- Users (Tab 3) ---
const deleteUser = (u) => {
  removeUser(u.id)
}

// --- Comments (Tab 4) ---
const replyingTo = ref(null)
const replyText = ref('')

const approveComment = (comment) => {
  updateComment(comment.id, { status: 'approved' })
}

const startReply = (comment) => {
  replyingTo.value = comment.id
  replyText.value = comment.adminReply || ''
}

const saveReply = (comment) => {
  updateComment(comment.id, { adminReply: replyText.value })
  replyingTo.value = null
  replyText.value = ''
}

const deleteComment = (comment) => {
  comments.value = comments.value.filter(c => c.id !== comment.id)
}
</script>
