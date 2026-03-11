<template>
  <Transition name="splash">
    <div v-if="visible"
         class="fixed inset-0 z-[9999] flex items-center justify-center"
         style="background: #010f6b;">
      <div class="flex flex-col items-center gap-6 splash-content">
        <img src="/logo.png" alt="UniStay" class="w-32 h-32 object-contain" style="mix-blend-mode: lighten;" />
        <div class="flex items-center gap-1.5">
          <span class="text-white font-bold text-3xl tracking-tight">uni</span>
          <span class="text-[#3b82f6] font-bold text-3xl tracking-tight">stay</span>
        </div>
        <div class="flex gap-1.5 mt-2">
          <span class="w-2 h-2 rounded-full bg-[#3b82f6] dot-1"></span>
          <span class="w-2 h-2 rounded-full bg-[#3b82f6]/60 dot-2"></span>
          <span class="w-2 h-2 rounded-full bg-[#3b82f6]/30 dot-3"></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(() => {
  setTimeout(() => { visible.value = false }, 2200)
})
</script>

<style scoped>
.splash-enter-active { transition: opacity 0.4s ease; }
.splash-leave-active { transition: opacity 0.6s ease; }
.splash-enter-from  { opacity: 0; }
.splash-leave-to    { opacity: 0; }

.splash-content {
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

.dot-1, .dot-2, .dot-3 {
  animation: pulse 1.2s ease-in-out infinite;
}
.dot-2 { animation-delay: 0.2s; }
.dot-3 { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50%       { transform: scale(1.4); opacity: 1; }
}
</style>
