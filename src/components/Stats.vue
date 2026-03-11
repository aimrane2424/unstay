<template>
  <section class="bg-[#F8FAFF] py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div v-for="stat in stats" :key="stat.label"
             class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group text-center">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300">
            {{ stat.icon }}
          </div>
          <p class="text-2xl font-extrabold mb-1 stat-number">{{ stat.value }}</p>
          <p class="text-slate-500 text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '1 245 000', label: 'Étudiants au Maroc', icon: '🎓' },
  { value: '373 500', label: 'Étudiants hors ville', icon: '🏠' },
  { value: '10', label: 'Villes universitaires', icon: '🏙️' },
  { value: '400 DH', label: 'Budget minimum', icon: '💰' },
]
</script>
