<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F5E6CA] via-[#FFF8EE] to-[#CBB18A]"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.style.setProperty('--navbar-bg', 'linear-gradient(to right, #F5E6CA, #F5E6CA)')
})
</script>

<style scoped></style>
