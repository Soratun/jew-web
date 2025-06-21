<template>
  <div class="bg-blue-400 h-screen flex items-center justify-center text-5xl flex-col relative">
    <button class="bg-white px-4 py-2 mb-6 rounded" @click="eventIsOpen">
      {{ isOpen ? 'ปิด' : 'เปิดจดหมาย' }}
    </button>

    <div class="relative w-48 h-48">
      <!-- กระดาษ -->
      <div
        v-if="isOpen"
        class="absolute bottom-14 w-fit h-fit text-center bg-white text-black text-base p-4 rounded shadow-md animate-slide-up z-10 top-0 left-1 transform translate-x-1/2 flex flex-col items-center"
      >
        สวัสดี Jew BNK48 🎉<br />
        สุขสันต์วันเกิดนะ!
        <div class="w-28 h-28 rounded-full overflow-hidden">
          <img src="/499739564_122232150404179407_2509833584844019209_n.jpg" alt="jew" />
        </div>
      </div>

      <!-- ซองจดหมาย -->
      <svg
        class="absolute w-full h-full text-white z-20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.7"
          d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const eventIsOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
@keyframes slide-up {
  0% {
    transform: translate(-50%, 50%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -120%);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}
</style>
