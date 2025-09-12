<template>
  <div class="relative min-h-screen bg-gradient-to-b from-green-100 via-pink-50 to-yellow-100 overflow-hidden font-itim text-gray-900">
    <!-- bubbles -->
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
      />
    </div>

    <!-- fireworks layer -->
    <div ref="fireworksContainer" class="absolute inset-0 z-0"></div>

    <!-- main -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-7">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 select-none">
        🎂💚 สุขสันต์วันเกิด
        <span class="text-green-700 font-extrabold">{{ displayName }}</span>
        💚🎂
      </h1>

      <div v-if="!opened" class="text-7xl animate-bounce cursor-pointer select-none" @click="openGift">
        <p class="text-center">🎂</p>
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
          v-for="(src, index) in objectUrls"
          :key="src"
          :src="src"
          class="w-full max-w-xs md:max-w-sm h-auto rounded-xl shadow-xl opacity-0 animate-fade-in border-4 border-pink-300 hover:scale-105 transition-transform duration-300"
          :style="{ animationDelay: `${index * 0.4}s` }"
          alt="gift image"
        />
      </transition-group>

      <p v-if="opened" class="mt-6 bg-white text-center text-base md:text-lg p-4 md:p-6 rounded-2xl shadow-md max-w-sm sm:max-w-md animate-pulse select-none">
        🐸💬 "สุขสันต์วันเกิดนะ {{ displayName }} ขอให้วันนี้เป็นวันพิเศษที่อบอุ่นที่สุดเลย!"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { Fireworks } from 'fireworks-js'
import confetti from 'canvas-confetti'
import { get, keys } from 'idb-keyval'

// ===== state from storage =====
const name = useLocalStorage<string>('birthday:name', '')
const displayName = computed(() => name.value?.trim() || '𝐍𝐚𝐦𝐩𝐢𝐧𝐠') // fallback ถ้าไม่มีใน localStorage

const files = ref<File[]>([])
const objectUrls = ref<string[]>([])

// ถ้าไม่มีรูปใน IndexedDB จะใช้รูปสำรองจาก public/ (ไม่ต้อง revoke)
const fallbackImages = [
  '/IMG20250309154601.jpg',
  '/IMG20250504195406.jpg',
  '/IMG20250504195408.jpg',
  '/IMG20250531191753.jpg',
]

// โหลดรูปจาก IndexedDB -> สร้าง object URLs
onMounted(async () => {
  const all = (await keys()) as string[]
  const myKeys = all.filter(k => k.startsWith('birthday:image:'))
  if (myKeys.length === 0) {
    objectUrls.value = fallbackImages
    return
  }

  const blobs = (await Promise.all(myKeys.map(k => get(k)))) as Blob[]
  files.value = blobs.map((b, i) => new File([b], `image-${i + 1}`, { type: b.type || 'image/*' }))

  // สร้าง object URL เฉพาะไฟล์ที่มาจาก IndexedDB
  objectUrls.value = files.value.map(f => URL.createObjectURL(f))
})

onBeforeUnmount(() => {
  // revoke เฉพาะ URL ที่มาจาก createObjectURL (อย่า revoke พาธปกติ)
  objectUrls.value.forEach(u => {
    if (u.startsWith('blob:')) URL.revokeObjectURL(u)
  })
})

// ===== effects / UI =====
const opened = ref(false)
const fireworksContainer = ref<HTMLElement | null>(null)
const imageSection = ref<HTMLElement | null>(null)
let fireworksInstance: Fireworks | null = null

const bgMusic = new Audio('/happy-birthday-357371.mp3')
bgMusic.loop = true
bgMusic.volume = 0.6

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

const openGift = async () => {
  opened.value = true
  bgMusic.play().catch(() => {})
  launchConfetti()
}

// เมื่อเปิดแล้ว -> สกรอลล์ + ดอกไม้ไฟ
watch(opened, async val => {
  if (!val) return
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
    setTimeout(() => fireworksInstance?.stop(), 6000)
  }
})

// กันเสียง/เอฟเฟกต์ค้างเมื่อออกจากหน้า
onBeforeUnmount(() => {
  fireworksInstance?.stop()
  bgMusic.pause()
  bgMusic.currentTime = 0
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");
.font-itim { font-family: "Itim", cursive; }

@keyframes fade-in { to { opacity: 1; } }
.animate-fade-in { animation: fade-in 1s forwards; }

@keyframes bubble {
  0% { transform: translateY(100%); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: translateY(-120%); opacity: 0; }
}
.animate-bubble { animation: bubble 12s linear infinite; }
</style>
