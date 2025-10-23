<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-green-100 via-pink-50 to-yellow-100 overflow-hidden font-itim text-gray-900"
  >
    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-7"
    >
      <!-- รูป -->
      <img
        src="/538503821_122154749276792651_8192335771467248666_n.jpg"
        class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-in"
        style="animation-delay: 0.5s"
      />

      <!-- ข้อความ -->
      <h1
        class="font-itim text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 select-none opacity-0 animate-slide-in"
        style="animation-delay: 1.0s"
      >
        สุขสันต์วันเกิด 𝐒𝐚𝐭𝐚𝐧𝐠𝐩𝐨𝐮𝐧𝐝 🎉🎂💚
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 1s ease-out forwards;
}
</style>
