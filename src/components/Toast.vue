<template>
  <Teleport to="body">
    <div class="fixed top-20 right-4 z-[200] space-y-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id"
             class="pointer-events-auto flex items-center gap-3 bg-white rounded-xl shadow-xl border px-4 py-3 min-w-[280px] max-w-sm"
             :class="{
               'border-green-200': toast.type === 'success',
               'border-red-200': toast.type === 'error',
               'border-blue-200': toast.type === 'info',
             }">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
               :class="{
                 'bg-green-100': toast.type === 'success',
                 'bg-red-100': toast.type === 'error',
                 'bg-blue-100': toast.type === 'info',
               }">
            <span v-if="toast.type === 'success'" class="text-green-600">✓</span>
            <span v-else-if="toast.type === 'error'" class="text-red-500">✗</span>
            <span v-else class="text-blue-500">ℹ</span>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-[#010f6b] text-sm">{{ toast.title }}</p>
            <p v-if="toast.msg" class="text-gray-500 text-xs mt-0.5">{{ toast.msg }}</p>
          </div>
          <button @click="remove(toast.id)" class="text-gray-300 hover:text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let counter = 0

const add = ({ type = 'info', title, msg, duration = 3500 }) => {
  const id = ++counter
  toasts.value.push({ id, type, title, msg })
  setTimeout(() => remove(id), duration)
}

const remove = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

defineExpose({ add })
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to { opacity: 0; transform: translateX(100%); }
</style>
