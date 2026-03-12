<template>
  <section class="bg-[#F8FAFF] py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div v-for="stat in stats" :key="stat.label"
             class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group text-center">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300" v-html="stat.icon">
          </div>
          <p class="text-2xl font-extrabold mb-1 stat-number">{{ stat.value }}</p>
          <p class="text-slate-500 text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const iconGrad = `<svg class="w-6 h-6 text-[#3b82f6]" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 3.866-4.03 7-9 7s-9-3.134-9-7a12.083 12.083 0 012.84-7.578L12 14z"/></svg>`
const iconHome = `<svg class="w-6 h-6" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 22V12h6v10"/></svg>`
const iconCity = `<svg class="w-6 h-6" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>`
const iconCoin = `<svg class="w-6 h-6" fill="none" stroke="#3b82f6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8" stroke-linecap="round"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M14.5 9a2.5 2.5 0 00-5 0v.5a2 2 0 002 2h1a2 2 0 012 2v.5a2.5 2.5 0 01-5 0M12 7v1m0 8v1"/></svg>`

const stats = [
  { value: '1 245 000', label: 'Étudiants au Maroc',    icon: iconGrad },
  { value: '373 500',   label: 'Étudiants hors ville',  icon: iconHome },
  { value: '10',        label: 'Villes universitaires', icon: iconCity },
  { value: '400 DH',    label: 'Budget minimum',        icon: iconCoin },
]
</script>
