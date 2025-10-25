<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-blue-100 via-emerald-0 to-cyan-300 overflow-hidden font-itim text-gray-900"
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
        สุขสันต์วันเกิด 𝐒𝐚𝐭𝐚𝐧𝐠𝐩𝐨𝐮𝐧𝐝 🎉🎂🩵
      </h1>

      <div
        v-if="!opened"
        class="text-7xl animate-bounce cursor-pointer select-none opacity-0 animate-slide-in text-center"
        @click="openGift"
        style="animation-delay: 1s"
      >
        <p class="text-center">🪱 🌊</p>
        <p class="text-base text-gray-800 mt-2">คลิกเพื่อเปิดของขวัญ</p>
      </div>

      <div v-if="opened" class="w-full mt-10 px-4">
        <Swiper
          :modules="[Autoplay, FreeMode]"
          :slides-per-view="'auto'"
          :space-between="10"
          :free-mode="true"
          :loop="true"
          :speed="4000"
          :autoplay="{
            delay: 0,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            stopOnLastSlide: true,
            waitForTransition: true,
            reverseDirection: true,
          }"
          class="w-full select-none"
        >
          <SwiperSlide v-for="(img, i) in images" :key="i" class="!w-auto flex justify-center">
            <img
              :src="img"
              class="w-64 md:w-72 h-auto rounded-xl shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform duration-300"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <p
        v-if="opened"
        class="font-itim mt-6 bg-white text-center text-base md:text-lg p-4 md:p-6 rounded-2xl shadow-md max-w-sm sm:max-w-md animate-pulse select-none"
      >
        “สุขสันต์วันเกิดนะ 𝐒𝐚𝐭𝐚𝐧𝐠𝐩𝐨𝐮𝐧𝐝 🎂
        ขอให้ปีนี้เป็นปีที่ใจของตัวเองอบอุ่นขึ้นกว่าที่เคย เต็มไปด้วยความสบายใจ ความสุขเล็ก ๆ
        ในทุกวัน และกำลังใจที่ค่อย ๆ ผลิบานจากคนรอบตัวนะครับ
        ขอให้ได้ทำในสิ่งที่รักด้วยหัวใจที่มีความสุข และเติบโตอย่างนุ่มนวลในแบบที่ตัวเองภูมิใจเสมอ
        ไม่ว่าจะเหนื่อยเมื่อไหร่ ก็ขอให้รู้ไว้ว่ายังมีคนอยู่ข้าง ๆ และเอาใจช่วยเสมอนะครับ”
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'
import { Fireworks } from 'fireworks-js'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay, FreeMode } from 'swiper/modules'

const opened = ref(false)
const fireworksContainer = ref(null)
const imageSection = ref<HTMLElement | null>(null)
let fireworksInstance: Fireworks | null = null

const images = [
  '/Satangpound/486481478_122117256356792651_7631034328366838165_n.jpg',
  '/Satangpound/487765505_122120112836792651_3973002769892791963_n.jpg',
  '/Satangpound/494217657_122128590866792651_6826349114730895977_n.jpg',
  '/Satangpound/498625556_122133667874792651_331976708158200817_n.jpg',
  '/Satangpound/503113002_122137582124792651_5535962828527717583_n.jpg',
  '/Satangpound/514362494_122143503086792651_4285063963684514855_n.jpg',
  '/Satangpound/527676048_122149510022792651_8520633849327363298_n.jpg',
  '/Satangpound/559805975_122162723432792651_2852266654491892252_n.jpg',
  '/Satangpound/IMG20250308155041.jpg',
  '/Satangpound/IMG20250308172334.jpg',
  '/Satangpound/IMG_0412.jpg',
  '/Satangpound/IMG_3379.jpg',
  '/Satangpound/IMG_3566.jpg',
  '/Satangpound/IMG_4138.jpg',
  '/Satangpound/IMG_4152.jpg',
  '/Satangpound/IMG_5204.jpg',
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
