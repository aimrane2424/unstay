<template>
  <section class="bg-[#fbfdff] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label"
             class="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl">{{ stat.icon }}</span>
          </div>
          <p class="text-3xl font-bold text-[#010f6b] mb-1">{{ stat.value }}</p>
          <p class="text-gray-500 text-sm">{{ stat.label }}</p>
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
