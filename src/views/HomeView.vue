<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <div @click="openLetter = true" class="relative w-96 h-96 cursor-pointer group">
      <!-- ซองจดหมาย (ปิด) -->
      <div
        v-if="!openLetter"
        class="w-full h-full bg-white border-2 border-gray-300 relative overflow-hidden shadow-lg"
      >
        <!-- ฝาพับสามเหลี่ยม -->
        <div
          class="absolute top-0 left-0 w-full h-full bg-white border-b-2 border-gray-300"
          style="clip-path: polygon(0 0, 100% 0, 50% 50%)"
        ></div>
        <div class="absolute bottom-0 left-0 w-full text-center p-2 text-gray-500">Click to open</div>
      </div>

      <!-- จดหมายเปิด -->
      <div v-else class="w-full h-full bg-white border-2 border-gray-300 relative shadow-xl">
        <div
          class="absolute top-0 left-0 w-full h-full bg-white"
          style="clip-path: polygon(0 0, 100% 0, 50% 50%)"
        ></div>
        <img
          src="C:\Users\tunza\Documents\jew-web\public\499739564_122232150404179407_2509833584844019209_n.jpg"
          class="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover rounded shadow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openLetter = ref(false)
</script>
