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
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { Fireworks } from "fireworks-js";
import confetti from "canvas-confetti";
import { onBeforeRouteLeave } from "vue-router";
// import api from "@/lib/api";

// states
const opened = ref(false);
const fireworksContainer = ref(null);
const imageSection = ref<HTMLElement | null>(null);
let fireworksInstance: Fireworks | null = null;

// รูปภาพของขวัญ
const images = [
  "IMG20250309154601.jpg",
  "IMG20250504195406.jpg",
  "IMG20250504195408.jpg",
  "IMG20250531191753.jpg"
];

// background music
const bgMusic = new Audio("/happy-birthday-357371.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.6;

// confetti effect 🎉
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.6 },
    shapes: ["circle", "star"],
    scalar: 1.2,
    colors: ["#ff69b4", "#ffcc00", "#66ccff", "#33cc99"],
  });
};
const stopBgMusic = () => {
  try {
    bgMusic.pause()
    bgMusic.currentTime = 0
    // เคลียร์ src เพื่อให้เบราว์เซอร์ยุติการเล่น/โหลดจริง ๆ
    bgMusic.src = ''
    // (ตัวเลือก) ถ้าต้องการกลับมาใช้เพลงเดิมตอนเข้าหน้าซ้ำ ให้คงพาธไว้แล้วไม่ต้องเคลียร์ src
    // bgMusic.load() // ไม่จำเป็นถ้าเคลียร์ src
  } catch {}
}

onBeforeUnmount(() => {
  stopBgMusic()
  fireworksInstance?.stop()
})

onBeforeRouteLeave((_to, _from, next) => {
  stopBgMusic()
  fireworksInstance?.stop()
  next()
})

// เมื่อคลิกเปิดของขวัญ
const openGift = async () => {
  if (opened.value) return  // กัน double-click
  opened.value = true
  bgMusic.src = '/happy-birthday-357371.mp3' // เผื่อคุณเคลียร์ src ไว้ด้านบน
  bgMusic.loop = true
  bgMusic.volume = 0.6
  bgMusic.play().catch(() => {})
  launchConfetti()
}

// ดอกไม้ไฟ & scroll
watch(opened, async (val) => {
  if (val) {
    await nextTick();
    imageSection.value?.scrollIntoView({ behavior: "smooth" });

    if (fireworksContainer.value) {
      fireworksInstance = new Fireworks(fireworksContainer.value, {
        hue: { min: 0, max: 360 },
        rocketsPoint: { min: 0, max: 100 },
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 100,
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
