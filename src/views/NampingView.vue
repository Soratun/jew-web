<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-green-100 via-pink-50 to-yellow-100 overflow-hidden font-itim text-gray-900"
  >
    <!-- ฟองลอย (bubbles) -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="n in 12"
        :key="n"
        class="absolute bg-white opacity-30 rounded-full animate-bubble"
        :style="{
          width: '6vw',
          height: '6vw',
          maxWidth: '30px',
          maxHeight: '30px',
          left: `${Math.random() * 100}%`,
          animationDelay: `${n * 3}s`,
          top: `${100 + Math.random() * 50}px`,
        }"
      ></div>
    </div>

    <!-- ดอกไม้ไฟ -->
    <div ref="fireworksContainer" class="absolute inset-0 z-0"></div>

    <!-- เนื้อหาหลัก -->
    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-7"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 select-none"
      >
        🎂💚 สุขสันต์วันเกิด <span class="text-green-700 font-extrabold">𝐍𝐚𝐦𝐩𝐢𝐧𝐠</span> 💚🎂
      </h1>

      <div
        v-if="!opened"
        class="text-7xl animate-bounce cursor-pointer select-none"
        @click="openGift"
      >
        <p class="text-center">🐸</p>
        <p class="text-base text-gray-800 mt-2">คลิกกบน้อยเพื่อเปิดของขวัญ</p>
      </div>

      <transition-group
        name="fade"
        tag="div"
        v-if="opened"
        ref="imageSection"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center mt-10 px-4"
      >
        <img
          v-for="(img, index) in images"
          :key="img"
          :src="`/${img}`"
          class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl opacity-0 animate-fade-in border-4 border-pink-300 hover:scale-105 transition-transform duration-300"
          :style="{ animationDelay: `${index * 0.4}s` }"
        />
      </transition-group>

      <p
        v-if="opened"
        class="mt-6 bg-white text-center text-base md:text-lg p-4 md:p-6 rounded-2xl shadow-md max-w-sm sm:max-w-md animate-pulse select-none"
      >
        🐸💬 "สุขสันต์วันเกิดนะ 𝐍𝐚𝐦𝐩𝐢𝐧𝐠 ขอให้วันนี้เป็นวันพิเศษที่อบอุ่นที่สุดเลย!"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { Fireworks } from "fireworks-js";

const opened = ref(false);
const fireworksContainer = ref(null);
const imageSection = ref<HTMLElement | null>(null);
let fireworksInstance: Fireworks | null = null;

const images = [
  "IMG20250309154601.jpg",
  "IMG20250309155223.jpg",
  "IMG20250504195406.jpg",
  "IMG20250504195408.jpg",
];

const openGift = () => {
  opened.value = true;
};

watch(opened, async (val) => {
  if (val) {
    await nextTick();

    // Scroll ไปยังภาพของขวัญ
    imageSection.value?.scrollIntoView({ behavior: "smooth" });

    // ดอกไม้ไฟ
    if (fireworksContainer.value) {
      fireworksInstance = new Fireworks(fireworksContainer.value, {
        hue: { min: 0, max: 360 },
        rocketsPoint: { min: 0, max: 100 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 100,
        trace: 3,
        explosion: 5,
        autoresize: true,
      });
      fireworksInstance.start();

      setTimeout(() => {
        fireworksInstance?.stop();
      }, 6000);
    }
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");

.font-itim {
  font-family: "Itim", cursive;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1s forwards;
}

/* ฟองลอยขึ้น (bubbles) */
@keyframes bubble {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-120%);
    opacity: 0;
  }
}
.animate-bubble {
  animation: bubble 12s linear infinite;
}
</style>
