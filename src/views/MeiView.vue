<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-sky-100 via-teal-50 to-emerald-100 overflow-hidden font-itim text-gray-900"
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
      <transition name="fade">
        <div
          v-if="!opened"
          class="mt-10 px-4"
        >
          <img
            src="/mei/541489827_1428819765276156_6743932941503854935_n.jpg"
            class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl opacity-0 animate-fade-in border-4 border-pink-300 hover:scale-105 transition-transform duration-300"
            style="animation-delay: 0.4s"
          />
        </div>
      </transition>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 select-none">
        🎂🩵 สุขสันต์วันเกิด <span class="text-sky-600 font-extrabold">Mei</span> 🩵🎂
      </h1>

      <div
        v-if="!opened"
        class="text-7xl animate-bounce cursor-pointer select-none"
        @click="openGift"
      >
        <p class="text-center">🏀</p>
        <p class="text-base text-gray-800 mt-2">คลิกเพื่อเปิดของขวัญ</p>
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
       🏀💬 "สุขสันต์วันเกิดนะ Mei 🎂 ขอให้ปีนี้เต็มไปด้วยรอยยิ้ม ความสุข และก้าวสู่ความสำเร็จในทุกสิ่งที่ตั้งใจไว้ ทั้งเรื่องเรียนและสิ่งที่รักนะครับ"
      </p>

      <transition-group
        name="fade"
        tag="div"
        v-if="opened"
        ref="imageSection"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center mt-10 px-4"
      >
        <img
          v-for="(img, index) in images2"
          :key="img"
          :src="`/${img}`"
          class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl opacity-0 animate-fade-in border-4 border-pink-300 hover:scale-105 transition-transform duration-300"
          :style="{ animationDelay: `${index * 0.4}s` }"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Fireworks } from 'fireworks-js'
import confetti from 'canvas-confetti'
// import api from "@/lib/api";

// states
const opened = ref(false)
const fireworksContainer = ref(null)
const imageSection = ref<HTMLElement | null>(null)
let fireworksInstance: Fireworks | null = null

// รูปภาพของขวัญ
const images = [
  'mei/515931146_1407277454097054_8723327671591513101_n.jpg',
  'mei/536665237_1418665206291612_3734142307689466171_n.jpg',
  'mei/544521998_1432224074935725_817592776792607025_n.jpg',
  'mei/IMG_5610.jpg',
]

const images2 = [
  'mei/538462060_1420755602749239_3188965002212322206_n.jpg',
  'mei/485668201_623509637152147_6996696997930236387_n.jpg',
  'mei/536282395_1420755822749217_5392854900546308016_n.jpg',
  'mei/527911713_1401766974648102_1115344828603054858_n.jpg',
]

// background music
const bgMusic = new Audio('/happy-birthday-357371.mp3')
bgMusic.loop = true
bgMusic.volume = 0.6

// confetti effect 🎉
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.6 },
    shapes: ['circle', 'star'],
    scalar: 1.2,
    colors: ['#ff69b4', '#ffcc00', '#66ccff', '#33cc99'],
  })
}

// เมื่อคลิกเปิดของขวัญ
const openGift = async () => {
  opened.value = true
  // const res = await api.get("/health");
  // console.log("API Response:", res);
  bgMusic.play().catch(() => {}) // บาง browser ต้องรอ interaction
  launchConfetti()
}

// ดอกไม้ไฟ & scroll
watch(opened, async (val) => {
  if (val) {
    await nextTick()
    imageSection.value?.scrollIntoView({ behavior: 'smooth' })

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
      })
      fireworksInstance.start()

      setTimeout(() => {
        fireworksInstance?.stop()
      }, 6000)
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

.font-itim {
  font-family: 'Itim', cursive;
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
