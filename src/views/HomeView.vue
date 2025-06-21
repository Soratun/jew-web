<template>
  <div class="bg-blue-400 h-screen flex items-center justify-center text-5xl flex-col">
    <button class="bg-white px-4 py-2 mb-4 rounded" @click="eventIsOpen">
      กด
    </button>

    <div v-if="isOpen" id="envelope-open">
      <svg
        class="w-4xl h-4xl text-white"
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

    <div v-else id="envelope-closed">
      <svg
        class="w-4xl h-4xl text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.7"
          d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

console.log(isOpen.value)

const eventIsOpen = async () => {
  isOpen.value = !isOpen.value
}
</script>
