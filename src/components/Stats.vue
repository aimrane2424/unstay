<template>
  <section class="bg-[#fbfdff] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label"
             class="text-center p-6 rounded-2xl bg-white border border-blue-50 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <span class="text-2xl">{{ stat.icon }}</span>
          </div>
          <p class="text-3xl font-extrabold text-[#071040] mb-1 stat-number">{{ stat.value }}</p>
          <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
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
