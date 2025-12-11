<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface Memory {
  id: number
  image: string
}

const memories = ref<Memory[]>([
  { id: 1, image: 'satchan/sc2.png' },
  { id: 2, image: 'satchan/DSC_8117-Enhanced-NR.jpg' },
  { id: 3, image: 'satchan/IMG_5565.jpg' },
  { id: 4, image: 'satchan/3S9A5052.jpg' },
  { id: 5, image: 'satchan/IMG_4536-2.jpg' },
  { id: 6, image: 'satchan/sc1.jpg' },
])

const sectionTexts = [
  {
    title: 'Colors of You',
    desc: 'ไม่ว่าจะเป็นลุคไหน หรือสีผมอะไร ความเป็นธรรมชาติและรอยยิ้มของเธอก็ยังคงเป็นเสน่ห์ที่ดึงดูดสายตาเสมอ เป็นความสดใสที่ไม่เหมือนใครจริงๆ',
  },
  {
    title: 'Proud of Your Journey',
    desc: 'ยินดีด้วยนะกับทุกผลงานและการเติบโต ได้เห็นเธอบนหน้าจอและในบทบาทใหม่ๆ เป็นสิ่งที่แฟนคลับภูมิใจมาก ขอให้สนุกกับเส้นทางที่เลือกเดินต่อนะ',
  },
  {
    title: 'Wish You All the Best',
    desc: 'ขอให้ปีนี้ใจดีกับซัทจัง เหมือนกับความน่ารักของเธอที่มอบให้ทุกคน ขอให้มีความสุขในทุกวัน ยิ้มกว้างๆ แบบนี้ตลอดไปนะ สุขสันต์วันเกิด!',
  },
]

const pairedMemories = computed(() => {
  const pairs = []
  for (let i = 0; i < memories.value.length; i += 2) {
    pairs.push(memories.value.slice(i, i + 2))
  }
  return pairs
})

onMounted(() => {
  AOS.init({ duration: 1000, once: false, offset: 50 })
})
</script>

<template>
  <div class="min-h-screen bg-base-100 relative font-sans text-neutral" data-theme="sakura">
    <div class="sakura-container">
      <div class="sakura" v-for="n in 30" :key="n"></div>
    </div>

    <section class="h-screen w-full flex flex-col items-center justify-center relative z-10 px-4">
      <div class="text-center" data-aos="zoom-in" data-aos-duration="1500">
        <h1 class="text-6xl md:text-8xl font-bold text-secondary mb-4 drop-shadow-md font-serif">
          お誕生日<br />おめでとう
        </h1>
        <p class="text-xl md:text-2xl text-gray-500 mt-4 tracking-[0.5em] uppercase">
          Happy Birthday
        </p>
        <div class="divider divider-secondary w-32 mx-auto mt-8 opacity-70">🌸</div>
      </div>

      <div
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70"
      >
        <span class="text-xs tracking-widest text-secondary">SCROLL</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-6 pb-32 relative z-10 max-w-6xl">
      <section
        v-for="(pair, index) in pairedMemories"
        :key="index"
        class="min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-16"
        :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
      >
        <div class="md:w-5/12 text-center md:text-left space-y-6" data-aos="fade-up">
          <div
            class="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm mb-2"
          >
            Chapter 0{{ index + 1 }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-secondary leading-tight">
            {{ sectionTexts[index]?.title }}
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed font-light">
            {{ sectionTexts[index]?.desc }}
          </p>
        </div>

        <div class="md:w-6/12 grid grid-cols-2 gap-6 relative">
          <div
            class="bg-white p-2 shadow-xl rounded-lg transform rotate-[-3deg] hover:rotate-0 transition-all duration-500 hover:z-20 hover:scale-105"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          >
            <div class="aspect-[3/4] overflow-hidden rounded-md">
              <img :src="pair[0].image" class="w-full h-full object-cover" alt="Memory" />
            </div>
          </div>

          <div
            class="bg-white p-2 shadow-xl rounded-lg transform rotate-[3deg] hover:rotate-0 transition-all duration-500 mt-12 hover:z-20 hover:scale-105"
            :data-aos="index % 2 === 0 ? 'fade-up' : 'fade-down'"
            data-aos-delay="200"
          >
            <div class="aspect-[3/4] overflow-hidden rounded-md">
              <img :src="pair[1]?.image" class="w-full h-full object-cover" alt="Memory" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="text-center py-8 text-gray-400 text-sm relative z-10">
      Made with 💖 for Satchan
    </footer>
  </div>
</template>

<style scoped>
/* เปลี่ยนเป็น Fixed เพื่อให้ซากุระร่วงตามเรามาตลอด */
.sakura-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.sakura {
  position: absolute;
  top: -10%;
  background: #ffb7c5;
  border-radius: 100% 0 100% 0;
  opacity: 0.6;
  animation: fall linear infinite;
}

/* เพิ่ม Variation ให้ดอกไม้มีหลายขนาด */
.sakura:nth-child(2n) {
  width: 10px;
  height: 10px;
  left: 20%;
  animation-duration: 9s;
  animation-delay: 1.5s;
}
.sakura:nth-child(3n) {
  width: 14px;
  height: 14px;
  left: 50%;
  animation-duration: 13s;
  animation-delay: 3s;
}
.sakura:nth-child(4n) {
  width: 8px;
  height: 8px;
  left: 80%;
  animation-duration: 11s;
  animation-delay: 0.5s;
}
.sakura:nth-child(5n) {
  width: 16px;
  height: 16px;
  left: 10%;
  animation-duration: 15s;
  animation-delay: 5s;
}

@keyframes fall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(110vh) translateX(25px) rotate(360deg);
    opacity: 0;
  }
}
</style>
