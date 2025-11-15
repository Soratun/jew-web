<script setup lang="ts">
import { ref } from 'vue'

// เพลง (เปลี่ยน path ตามไฟล์จริงของคุณ)
const bgmSrc = '/morning-light-ambient-acoustic-guitar-background-music-for-videos-5712.mp3'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const images = [
  {
    src: 'jew/jew2.jpg',
    caption: 'วันที่นั่งม้านั่งชุดขาวที่ดูสบายตาและอบอุ่นมาก ๆ',
  },
  {
    src: 'jew/jew3.jpg',
    caption: 'โมเมนต์ฟองสบู่ที่สดใสจนเผลอยิ้มตาม',
  },
  {
    src: 'jew/IMG_0063.jpg',
    caption: 'รอยยิ้มใส่แว่นกับหลอดชมพูที่น่ารักมาก',
  },
  {
    src: 'jew/jew4.jpg',
    caption: 'รูปถือก้อนเมฆที่เหมือนอยู่ในความฝันนิด ๆ',
  },
  {
    src: 'jew/IMG_0270.jpg',
    caption: 'แว่น indoor อุ่น ๆ ที่ดูโคมไฟแล้วก็ใจอุ่นตาม',
  },
  {
    src: 'jew/IMG_3004.jpg',
    caption: 'ฮัลโลวีนชุดไทยที่เท่มากและน่าจดจำสุด ๆ',
  },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function startGift() {
  // เริ่มเล่นเพลง (จะเล่นได้เพราะเกิดจากการกดปุ่มของผู้ใช้)
  if (audioRef.value && !isPlaying.value) {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch (e) {
      console.warn('ไม่สามารถเล่นเพลงอัตโนมัติได้:', e)
    }
  }
  // เลื่อนไป Section จดหมาย
  scrollToSection('letter-section')
}

async function toggleMusic() {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch (e) {
      console.warn('เล่นเพลงไม่สำเร็จ:', e)
    }
  }
}
</script>

<template>
  <div class="bg-cream-light min-h-screen text-deep-brown">
    <audio ref="audioRef" :src="bgmSrc" loop class="hidden" />

    <section id="hero-section" class="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        class="max-w-xl w-full bg-pure-white/95 rounded-3xl shadow-lg border border-latte-beige/60 px-6 py-8 sm:px-10 sm:py-10 text-center space-y-4 animate-fade-in"
      >
        <p class="text-sm tracking-[0.25em] uppercase text-soft-brown">For Jew – Birthday Letter</p>
        <h1 class="text-2xl sm:text-3xl font-semibold text-deep-brown">
          เว็บเล็ก ๆ ที่ตั้งใจทำให้จิวในวันพิเศษนี้ครับ
        </h1>
        <p class="text-base sm:text-lg text-[#6b4a2b]">
          อยากให้หน้านี้เป็นเหมือนกล่องของขวัญที่ค่อย ๆ เปิดไปทีละชั้น พร้อมเพลงบรรยากาศอบอุ่นเบา ๆ
        </p>

        <div class="pt-4">
          <button
            class="btn btn-lg rounded-full px-10 bg-soft-brown hover:bg-[#8C6239] border-none text-white text-lg shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.03]"
            @click="startGift"
          >
            เริ่มเปิดของขวัญ 🎁
          </button>
        </div>
      </div>
    </section>

    <section id="letter-section" class="min-h-screen flex items-center justify-center px-4 py-16">
      <div
        class="max-w-3xl w-full bg-pure-white/95 rounded-3xl shadow-lg border border-latte-beige/60 px-6 py-8 sm:px-10 sm:py-10 animate-section"
      >
        <p class="text-sm mb-2 text-soft-brown">ถึงจิว,</p>
        <div class="space-y-3 text-base sm:text-lg leading-relaxed text-[#4B3621]">
          <p>
            ในวันพิเศษของจิวปีนี้ อยากใช้พื้นที่เล็ก ๆ
            ตรงนี้เป็นเหมือนการ์ดอวยพรที่เก็บความตั้งใจและความปรารถนาดีไว้ให้ ขอบคุณจิวที่ส่งพลังดี
            ๆ ให้กับแฟนคลับมาโดยตลอดนะครับ ไม่ว่าจะเป็นรอยยิ้มหรือความตั้งใจบนเวที
            ทุกอย่างมีความหมายมากจริง ๆ
          </p>
          <p>
            หวังว่าของขวัญชิ้นเล็กชิ้นนี้จะทำให้จิวยิ้มได้
            และทำให้วันนี้เป็นวันที่ดีอีกวันหนึ่งของปี
          </p>
          <p>สุขสันต์วันเกิดนะครับ ขอให้มีความสุขมาก ๆ 🤎✨</p>
          <p class="pt-4">จากคนตัวเล็ก ๆ คนหนึ่งที่ดีใจมากที่ได้รู้จักจิวบนโลกใบนี้ครับ</p>
        </div>

        <div class="pt-8 flex justify-center">
          <button
            class="btn rounded-full px-8 bg-[#DCC7B0] hover:bg-[#C9AF91] border-none text-[#4B3621] text-base shadow-sm hover:shadow-md"
            @click="scrollToSection('gallery-section')"
          >
            ดูโมเมนต์ของจิว 📸
          </button>
        </div>
      </div>
    </section>

    <section id="gallery-section" class="min-h-screen px-4 py-16">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-semibold text-deep-brown mb-2">โมเมนต์น่ารักของจิว</h2>
        <p class="text-base sm:text-lg text-[#6b4a2b]">
          รวมภาพถ่ายและความทรงจำดี ๆ ที่อยากเก็บไว้ในนี้ครับ
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-section">
          <div
            v-for="(item, index) in images"
            :key="index"
            class="card bg-pure-white/95 rounded-3xl shadow-md border border-latte-beige/80 overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <figure class="aspect-[4/5] overflow-hidden">
              <img
                :src="item.src"
                alt=""
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
            <div class="p-3 sm:p-4 text-sm sm:text-base text-deep-brown">
              {{ item.caption }}
            </div>
          </div>
        </div>

        <div class="pt-10 flex justify-center">
          <button
            class="btn rounded-full px-8 bg-[#A67C52] hover:bg-[#8C6239] border-none text-white text-base shadow-sm hover:shadow-md"
            @click="scrollToSection('music-section')"
          >
            ฟังเพลงไปพร้อมกัน 🎧
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
