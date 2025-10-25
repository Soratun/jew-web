<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-green-100 via-pink-50 to-yellow-100 overflow-hidden font-itim text-gray-900"
  >
    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-7"
    >
      <!-- รูป -->
      <transition name="fade">
        <div v-if="!opened" class="mt-10 px-4">
          <img
            src="/538503821_122154749276792651_8192335771467248666_n.jpg"
            class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform duration-300 opacity-0 animate-slide-in"
            style="animation-delay: 0.5s"
          />
        </div>
      </transition>

      <!-- ข้อความ -->
      <h1
        class="font-itim text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 select-none opacity-0 animate-slide-in"
        style="animation-delay: 1s"
      >
        สุขสันต์วันเกิด 𝐒𝐚𝐭𝐚𝐧𝐠𝐩𝐨𝐮𝐧𝐝 🎉🎂💚
      </h1>

      <div
        v-if="!opened"
        class="text-7xl animate-bounce cursor-pointer select-none opacity-0 animate-slide-in"
        @click="openGift"
        style="animation-delay: 1s"
      >
        <p class="text-center">🪱 🌊</p>
        <p class="text-base text-gray-800 mt-2">คลิกเพื่อเปิดของขวัญ</p>
      </div>


      <p
        v-if="opened"
        class="font-itim mt-6 bg-white text-center text-base md:text-lg p-4 md:p-6 rounded-2xl shadow-md max-w-sm sm:max-w-md animate-pulse select-none"
      >
        🪱 🌊 💬 "สุขสันต์วันเกิดนะ 𝐒𝐚𝐭𝐚𝐧𝐠𝐩𝐨𝐮𝐧𝐝 🎂 ขอให้ปีนี้เต็มไปด้วยรอยยิ้ม ความสุข
        และก้าวสู่ความสำเร็จในทุกสิ่งที่ตั้งใจไว้ ทั้งเรื่องเรียนและสิ่งที่รักนะครับ"
      </p>


    </div>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'
import { Fireworks } from 'fireworks-js'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const opened = ref(false)
const fireworksContainer = ref(null)
const imageSection = ref<HTMLElement | null>(null)
let fireworksInstance: Fireworks | null = null

const images = [
  'mei/515931146_1407277454097054_8723327671591513101_n.jpg',
  'mei/536665237_1418665206291612_3734142307689466171_n.jpg',
  'mei/544521998_1432224074935725_817592776792607025_n.jpg',
  'mei/IMG_5610.jpg',
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

const openGift = async () => {
  if (opened.value) return // กัน double-click
  opened.value = true
  bgMusic.src = '/happy-birthday-357371.mp3' // เผื่อคุณเคลียร์ src ไว้ด้านบน
  bgMusic.loop = true
  bgMusic.volume = 0.6
  bgMusic.play().catch(() => {})
  launchConfetti()
}

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
