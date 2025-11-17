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

    <section id="music-section" class="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div
        class="max-w-xl w-full bg-pure-white/95 rounded-3xl shadow-lg border border-latte-beige/60 px-6 py-8 sm:px-10 sm:py-10 animate-section"
      >
        <h2 class="text-2xl sm:text-3xl font-semibold text-deep-brown text-center">
          เพลงประกอบของขวัญ
        </h2>
        <p class="text-center text-sm mt-1 text-soft-brown">ตัวอย่าง: “Morning Light – Olexy”</p>

        <div class="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-deep-brown">
          <p>
            ลองฟังเพลงนี้ไปพร้อมกับอ่านจดหมายและดูภาพของวันนี้นะครับ ตั้งใจเลือกบรรยากาศที่นุ่ม ๆ
            เบา ๆ เหมือนแสงตอนเช้า ที่ค่อย ๆ เข้ามาทำให้วันทั้งวันดูดีขึ้นอีกนิดนึง
          </p>
          <p>
            หวังว่าเวลาจิวเปิดหน้านี้ขึ้นมา เสียงเพลงจะช่วยให้หัวใจรู้สึกเบาขึ้นและสบายขึ้นนะครับ :)
          </p>
        </div>

        <div class="mt-6 flex flex-col items-center gap-3">
          <button
            class="btn rounded-full px-6 bg-soft-brown hover:bg-[#8C6239] border-none text-white text-base shadow-sm hover:shadow-md"
            @click="toggleMusic"
          >
            <span v-if="isPlaying">หยุดเพลง</span>
            <span v-else>เล่นเพลง</span>
          </button>

          <audio ref="audioRef" :src="bgmSrc" loop controls class="w-full max-w-md mt-2" />
        </div>

        <div class="pt-8 flex justify-center">
          <button
            class="btn rounded-full px-8 bg-latte-beige hover:bg-[#C9AF91] border-none text-[#4B3621] text-base shadow-sm hover:shadow-md"
            @click="scrollToSection('greeting-section')"
          >
            ไปดูคำอวยพร 💌
          </button>
        </div>
      </div>
    </section>

    <section id="greeting-section" class="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div
        class="relative max-w-xl w-full bg-white/95 rounded-3xl shadow-lg border border-[#DCC7B0]/60 px-6 py-8 sm:px-10 sm:py-10 animate-section"
      >
        <div class="pointer-events-none">
          <div class="absolute -top-3 -left-1 text-xs text-[#DCC7B0]">✦</div>
          <div class="absolute -top-4 right-6 text-xs text-[#DCC7B0]">🤎</div>
          <div class="absolute bottom-3 -right-2 text-xs text-[#DCC7B0]">✧</div>
        </div>

        <h2 class="text-xl sm:text-2xl font-semibold text-[#4B3621] mb-4 text-center">
          คำอวยพรในวันนี้
        </h2>

        <div class="space-y-3 text-base sm:text-lg leading-relaxed text-[#4B3621]">
          <p>
            สุขสันต์วันเกิดนะครับจิว 🎂 ขอให้ปีนี้เป็นปีที่หัวใจของจิวอบอุ่นขึ้นกว่าปีก่อน
            เต็มไปด้วยความสบายใจและความสุขเล็ก ๆ ในทุกวัน
          </p>
          <p>
            ไม่ว่าจิวจะเลือกเดินไปทางไหน ขอให้ได้ทำในสิ่งที่ตัวเองรักด้วยหัวใจที่มีความสุข
            และมีคนที่มองเห็นความพยายามของจิวอยู่ข้าง ๆ เสมอ
          </p>
          <p>
            ในวันที่เหนื่อยหรือรู้สึกไม่มั่นใจ ก็ขอให้จำไว้ว่ายังมีคนที่คอยเอาใจช่วยอยู่ห่าง ๆ
            ดีใจทุกครั้งที่ได้เห็นรอยยิ้มและแววตาตั้งใจของจิวครับ 🤎
          </p>
        </div>

        <div class="pt-8 flex justify-center">
          <button
            class="btn rounded-full px-8 bg-[#A67C52] hover:bg-[#8C6239] border-none text-white text-base shadow-sm hover:shadow-md"
            @click="scrollToSection('chibi-section')"
          >
            ไปดู Chibi ของจิวกัน ✨
          </button>
        </div>
      </div>
    </section>

    <section
      id="chibi-section"
      class="min-h-screen flex flex-col items-center justify-center px-4 py-16"
    >
      <div class="max-w-3xl w-full text-center space-y-8 animate-section">
        <div
          class="bg-white/95 rounded-3xl shadow-lg border border-[#DCC7B0]/60 px-6 py-8 sm:px-10 sm:py-10"
        >
          <h2 class="text-2xl sm:text-3xl font-semibold text-[#4B3621] mb-6">
            ภาพ Chibi พิเศษสำหรับจิว
          </h2>

          <div class="flex justify-center mb-6">
            <div
              class="bg-[#F9F1E7] rounded-[28px] border border-[#F1E2D0]/80 shadow-inner p-3 sm:p-4 inline-block"
            >
              <img
                src="/499739564_122232150404179407_2509833584844019209_n.jpg"
                alt="Chibi Jew Birthday"
                class="max-w-xs sm:max-w-sm w-full h-auto object-contain"
              />
            </div>
          </div>

          <div class="space-y-3 text-base sm:text-lg leading-relaxed text-[#4B3621]">
            <p>
              สุขสันต์วันเกิดอีกครั้งนะครับจิว 🎉
            </p>
            <p>
              หวังว่าเว็บเล็ก ๆ หน้านี้
              จะเป็นอีกหนึ่งความทรงจำที่ทำให้วันนี้อบอุ่นขึ้นอีกนิดหนึ่ง
              ไม่มากก็น้อย ขอให้ทุกปีต่อจากนี้เต็มไปด้วยแสงที่อ่อนโยนและคนดี ๆ
              รอบตัวเสมอนะครับ
            </p>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <button
            class="btn rounded-full px-6 bg-[#DCC7B0] hover:bg-[#C9AF91] border-none text-[#4B3621] text-base shadow-sm hover:shadow-md"
            @click="scrollToSection('hero-section')"
          >
            กลับไปด้านบน ⬆️
          </button>
          <button
            class="btn btn-ghost rounded-full px-6 text-[#4B3621] text-base"
            disabled
          >
            ขอบคุณที่เปิดดูจนจบครับ 🤎
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.animate-fade-in {
  animation: fadeInUp 0.8s ease-out;
}

.animate-section {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.1s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
