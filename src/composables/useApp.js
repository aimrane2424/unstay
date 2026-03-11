import { ref, inject, provide } from 'vue'

const APP_KEY = Symbol('app')

export function provideApp() {
  const showAuth = ref(false)
  const showListing = ref(false)
  const showProfile = ref(false)
  const showPublish = ref(false)
  const pendingPublish = ref(false)
  const selectedListing = ref(null)
  const user = ref(null)
  const toast = ref(null)
  const searchFilters = ref({ city: '', budget: '', type: '' })
  const favs = ref(new Set())
  const savedListingsData = ref([])

  const listings = ref([
    {
      id: 1, title: 'Chambre meublée centre ville', location: 'Khenifra, Hay Ennour', price: '700',
      type: 'Chambre', verified: true, isNew: true,
      features: ['Meublée', 'WiFi', 'Cuisine partagée'],
      university: '5 min de l\'USMS',
      gradient: 'linear-gradient(135deg, #dbeafe, #93c5fd)',
      tab: 'Chambre seule'
    },
    {
      id: 2, title: 'Studio moderne près université', location: 'Beni Mellal, Centre', price: '900',
      type: 'Studio', verified: true, isNew: false,
      features: ['Studio complet', 'Eau/élec inclus', 'Sécurisé'],
      university: '10 min de l\'USMS',
      gradient: 'linear-gradient(135deg, #d1fae5, #6ee7b7)',
      tab: 'Studio'
    },
    {
      id: 3, title: 'Colocation 3 chambres - Filles', location: 'Oujda, Hay Al Qods', price: '550',
      type: 'Colocation', verified: true, isNew: true,
      features: ['3 chambres', 'Salle commune', 'Quartier calme'],
      university: '15 min de l\'UMO',
      gradient: 'linear-gradient(135deg, #ede9fe, #c4b5fd)',
      tab: 'Colocation'
    },
    {
      id: 4, title: 'Chambre chez l\'habitant', location: 'Taza, Ville nouvelle', price: '450',
      type: 'Chambre', verified: true, isNew: false,
      features: ['Repas inclus', 'Internet', 'Famille accueillante'],
      university: '8 min de l\'USMS',
      gradient: 'linear-gradient(135deg, #fef3c7, #fcd34d)',
      tab: 'Chambre seule'
    },
    {
      id: 5, title: 'Appartement 2 chambres - Étudiant', location: 'El Jadida, Hay Essalam', price: '1200',
      type: 'Appartement', verified: true, isNew: true,
      features: ['2 chambres', 'Balcon', 'Parking'],
      university: '20 min de l\'UCD',
      gradient: 'linear-gradient(135deg, #fee2e2, #fca5a5)',
      tab: 'Appartement'
    },
    {
      id: 6, title: 'Studio économique - Proche fac', location: 'Settat, Quartier Massira', price: '600',
      type: 'Studio', verified: false, isNew: false,
      features: ['Studio', 'Charges comprises', 'Bus direct fac'],
      university: '5 min de l\'UH1',
      gradient: 'linear-gradient(135deg, #e0e7ff, #a5b4fc)',
      tab: 'Studio'
    },
    {
      id: 7, title: 'Colocation mixte - 4 étudiants', location: 'Khenifra, Hay Salam', price: '500',
      type: 'Colocation', verified: true, isNew: true,
      features: ['4 chambres', 'Wifi fibre', 'Salle de sport'],
      university: '3 min de l\'USMS',
      gradient: 'linear-gradient(135deg, #fce7f3, #f9a8d4)',
      tab: 'Colocation'
    },
    {
      id: 8, title: 'Colocation 2 chambres - Garçons', location: 'Beni Mellal, Hay Mohammadi', price: '480',
      type: 'Colocation', verified: true, isNew: false,
      features: ['2 chambres', 'Cuisine équipée', 'Proche marché'],
      university: '7 min de l\'USMS',
      gradient: 'linear-gradient(135deg, #d1fae5, #34d399)',
      tab: 'Colocation'
    },
    {
      id: 9, title: 'Colocation premium - Centre', location: 'Oujda, Boulevard Mohamed V', price: '650',
      type: 'Colocation', verified: true, isNew: true,
      features: ['3 chambres', 'Balcon', 'Gardien 24h'],
      university: '10 min de l\'UMO',
      gradient: 'linear-gradient(135deg, #fef9c3, #fde047)',
      tab: 'Colocation'
    },
    {
      id: 10, title: 'Colocation filles - Résidence Étudiante', location: 'Nador, Hay Ennasr', price: '420',
      type: 'Colocation', verified: false, isNew: false,
      features: ['2 chambres', 'Eau/élec inclus', 'Calme'],
      university: '12 min de l\'UM',
      gradient: 'linear-gradient(135deg, #e0f2fe, #38bdf8)',
      tab: 'Colocation'
    },
    {
      id: 11, title: 'Appartement meublé - Vue ville', location: 'Khouribga, Centre', price: '1100',
      type: 'Appartement', verified: true, isNew: true,
      features: ['3 chambres', 'Cuisine équipée', 'Ascenseur'],
      university: '15 min de l\'UH1',
      gradient: 'linear-gradient(135deg, #ffe4e6, #fb7185)',
      tab: 'Appartement'
    },
    {
      id: 12, title: 'Chambre individuelle calme', location: 'Safi, Hay El Mansour', price: '380',
      type: 'Chambre', verified: false, isNew: false,
      features: ['Chambre seule', 'Salle de bain privée', 'Quartier calme'],
      university: '20 min de l\'UCD',
      gradient: 'linear-gradient(135deg, #ecfdf5, #6ee7b7)',
      tab: 'Chambre seule'
    },
  ])

  const profileTab = ref('info')

  const openAuth = () => { showAuth.value = true }
  const openProfile = (tab = 'info') => { profileTab.value = tab; showProfile.value = true }
  const openPublish = () => {
    if (!user.value) {
      pendingPublish.value = true
      showAuth.value = true
    } else {
      showPublish.value = true
    }
  }

  const openListing = (listing) => {
    selectedListing.value = listing
    showListing.value = true
  }

  const toggleFav = (listing) => {
    const s = new Set(favs.value)
    if (s.has(listing.id)) {
      s.delete(listing.id)
      savedListingsData.value = savedListingsData.value.filter(l => l.id !== listing.id)
    } else {
      s.add(listing.id)
      savedListingsData.value = [...savedListingsData.value, listing]
    }
    favs.value = s
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToListings = (filters = {}) => {
    if (filters.city) searchFilters.value.city = filters.city
    if (filters.budget) searchFilters.value.budget = filters.budget
    if (filters.type) searchFilters.value.type = filters.type
    setTimeout(() => scrollTo('listings'), 100)
  }

  const call = (number = '0600000000') => {
    window.location.href = `tel:+212${number}`
  }

  const whatsapp = (msg = 'Bonjour UniStay, je cherche un logement étudiant') => {
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const ctx = {
    showAuth, showListing, showProfile, showPublish, pendingPublish, selectedListing,
    user, toast, searchFilters,
    favs, savedListingsData, toggleFav,
    listings,
    profileTab,
    openAuth, openProfile, openListing, openPublish,
    scrollTo, scrollToListings, call, whatsapp
  }

  provide(APP_KEY, ctx)
  return ctx
}

export function useApp() {
  return inject(APP_KEY)
}
