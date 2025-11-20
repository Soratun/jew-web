<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- Configuration ---
const bgmSrc = '/morning-light-ambient-acoustic-guitar-background-music-for-videos-5712.mp3'

// --- State & Refs ---
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const observer = ref<IntersectionObserver | null>(null)

// ข้อมูลรูปภาพ
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

// --- Methods ---

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function startGift() {
  // พยายามเล่นเพลงเมื่อ User Interaction (Click)
  await toggleMusic(true)
  scrollToSection('letter-section')
}

async function toggleMusic(forcePlay = false) {
  if (!audioRef.value) return

  if (forcePlay) {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch (e) {
      console.warn('Auto-play blocked:', e)
    }
    return
  }

  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch (e) {
      console.warn('Play failed:', e)
    }
  }
}

// --- Lifecycle Hooks (Animation Logic) ---

onMounted(() => {
  // สร้าง Observer เพื่อจับตาดู Element เมื่อเลื่อนมาถึง
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // ถ้าอยากให้เล่นครั้งเดียวแล้วจบเลย (ไม่ Fade ออกตอนเลื่อนกลับ) ให้ uncomment บรรทัดล่าง
          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15, // ต้องเห็น Element 15% ถึงจะเริ่ม Animation
      rootMargin: '0px 0px -50px 0px', // Offset ให้เริ่มก่อนถึงนิดนึง
    },
  )

  // สั่งให้ Observer จับตาดูทุก class ที่ชื่อ .scroll-animate
  const elements = document.querySelectorAll('.scroll-animate')
  elements.forEach((el) => observer.value?.observe(el))
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="bg-cream-light min-h-screen text-deep-brown font-sans overflow-x-hidden">
    <audio ref="audioRef" :src="bgmSrc" loop class="hidden" />

    <section id="hero-section" class="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        class="scroll-animate max-w-xl w-full bg-pure-white/95 rounded-[2rem] shadow-soft border border-latte-beige/60 px-6 py-10 sm:px-10 text-center space-y-5"
      >
        <p class="text-sm tracking-[0.25em] uppercase text-soft-brown font-medium">
          For Jew – Birthday Letter
        </p>
        <h1 class="text-3xl sm:text-4xl font-bold text-deep-brown leading-tight">
          เว็บเล็ก ๆ ที่ตั้งใจทำให้<br class="hidden sm:block" />จิวในวันพิเศษนี้ครับ
        </h1>
        <p class="text-base sm:text-lg text-[#6b4a2b] leading-relaxed">
          อยากให้หน้านี้เป็นเหมือนกล่องของขวัญที่ค่อย ๆ เปิดไปทีละชั้น พร้อมเพลงบรรยากาศอบอุ่นเบา ๆ
        </p>

        <div class="pt-6">
          <button
            class="btn-primary text-lg px-10 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            @click="startGift"
          >
            เริ่มเปิดของขวัญ 🎁
          </button>
        </div>
      </div>
    </section>

    <section id="letter-section" class="min-h-screen flex items-center justify-center px-4 py-16">
      <div
        class="scroll-animate max-w-3xl w-full bg-pure-white/95 rounded-[2rem] shadow-soft border border-latte-beige/60 px-6 py-10 sm:px-12"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="h-[1px] flex-1 bg-latte-beige"></div>
          <p class="text-sm font-semibold text-soft-brown tracking-widest uppercase">To Jew</p>
          <div class="h-[1px] flex-1 bg-latte-beige"></div>
        </div>

        <div
          class="space-y-5 text-base sm:text-lg leading-loose text-[#4B3621] text-justify sm:text-left"
        >
          <p>
            <span class="text-2xl font-serif block mb-2">ถึงจิว,</span>
            ในวันพิเศษของจิวปีนี้ อยากใช้พื้นที่เล็ก ๆ
            ตรงนี้เป็นเหมือนการ์ดอวยพรที่เก็บความตั้งใจและความปรารถนาดีไว้ให้ ขอบคุณจิวที่ส่งพลังดี
            ๆ ให้กับแฟนคลับมาโดยตลอดนะครับ ไม่ว่าจะเป็นรอยยิ้มหรือความตั้งใจบนเวที
            ทุกอย่างมีความหมายมากจริง ๆ
          </p>
          <p>
            หวังว่าของขวัญชิ้นเล็กชิ้นนี้จะทำให้จิวยิ้มได้
            และทำให้วันนี้เป็นวันที่ดีอีกวันหนึ่งของปี
          </p>
          <p class="font-medium text-soft-brown">สุขสันต์วันเกิดนะครับ ขอให้มีความสุขมาก ๆ 🤎✨</p>
          <p class="pt-4 text-sm text-gray-500 text-right">
            - จากคนตัวเล็ก ๆ คนหนึ่งที่ดีใจมากที่ได้รู้จักจิวบนโลกใบนี้ครับ
          </p>
        </div>

        <div class="pt-10 flex justify-center">
          <button
            class="btn-secondary px-8 py-2 rounded-full"
            @click="scrollToSection('gallery-section')"
          >
            ดูโมเมนต์ของจิว 📸
          </button>
        </div>
      </div>
    </section>

    <section id="gallery-section" class="min-h-screen px-4 py-16">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10 scroll-animate">
          <h2 class="text-3xl font-bold text-deep-brown mb-3">โมเมนต์น่ารักของจิว</h2>
          <p class="text-lg text-[#6b4a2b]">รวมภาพถ่ายและความทรงจำดี ๆ ที่อยากเก็บไว้ในนี้ครับ</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <div
            v-for="(item, index) in images"
            :key="index"
            class="scroll-animate card bg-pure-white rounded-3xl shadow-sm border border-latte-beige/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <figure class="aspect-[3/4] overflow-hidden relative">
              <img
                :src="item.src"
                alt=""
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-deep-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </figure>
            <div class="p-4 text-sm sm:text-base text-deep-brown bg-white relative z-10">
              {{ item.caption }}
            </div>
          </div>
        </div>

        <div class="pt-12 flex justify-center scroll-animate">
          <button
            class="btn-primary px-8 py-3 rounded-full shadow-md"
            @click="scrollToSection('music-section')"
          >
            ฟังเพลงไปพร้อมกัน 🎧
          </button>
        </div>
      </div>
    </section>

    <section
      id="music-section"
      class="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      <div class="absolute top-10 left-10 text-9xl opacity-5 rotate-12 select-none">🎵</div>
      <div class="absolute bottom-10 right-10 text-9xl opacity-5 -rotate-12 select-none">🎶</div>

      <div
        class="scroll-animate max-w-xl w-full bg-pure-white/95 rounded-[2rem] shadow-soft border border-latte-beige/60 px-6 py-10 sm:px-12 text-center relative z-10"
      >
        <h2 class="text-3xl font-bold text-deep-brown">เพลงประกอบของขวัญ</h2>
        <p class="text-sm mt-2 text-soft-brown font-medium">Now Playing: “Morning Light”</p>

        <div class="mt-8 space-y-4 text-lg leading-relaxed text-deep-brown">
          <p>
            ลองฟังเพลงนี้ไปพร้อมกับอ่านจดหมายและดูภาพของวันนี้นะครับ ตั้งใจเลือกบรรยากาศที่นุ่ม ๆ
            เบา ๆ เหมือนแสงตอนเช้า ที่ค่อย ๆ เข้ามาทำให้วันทั้งวันดูดีขึ้นอีกนิดนึง
          </p>
        </div>

        <div class="mt-10 flex flex-col items-center justify-center gap-6">
          <div class="flex gap-1 h-8 items-end" v-if="isPlaying">
            <div class="w-1 bg-soft-brown animate-music-bar" style="animation-delay: 0s"></div>
            <div class="w-1 bg-soft-brown animate-music-bar" style="animation-delay: 0.2s"></div>
            <div class="w-1 bg-soft-brown animate-music-bar" style="animation-delay: 0.4s"></div>
            <div class="w-1 bg-soft-brown animate-music-bar" style="animation-delay: 0.1s"></div>
            <div class="w-1 bg-soft-brown animate-music-bar" style="animation-delay: 0.3s"></div>
          </div>

          <button
            class="btn-primary rounded-full px-8 py-3 flex items-center gap-3 shadow-lg active:scale-95 transition-transform"
            @click="toggleMusic(false)"
          >
            <span v-if="isPlaying" class="flex items-center gap-2">
              <span>⏸</span> พักเพลงก่อน
            </span>
            <span v-else class="flex items-center gap-2"> <span>▶️</span> เล่นเพลงต่อ </span>
          </button>
        </div>

        <div class="pt-10 border-t border-latte-beige/30 mt-8">
          <button
            class="text-soft-brown hover:text-deep-brown transition-colors underline underline-offset-4"
            @click="scrollToSection('greeting-section')"
          >
            ไปดูคำอวยพร 💌
          </button>
        </div>
      </div>
    </section>

    <section id="greeting-section" class="min-h-screen flex items-center justify-center px-4 py-16">
      <div
        class="scroll-animate relative max-w-xl w-full bg-white/95 rounded-[2rem] shadow-soft border border-[#DCC7B0]/60 px-6 py-12 sm:px-12 text-center"
      >
        <div class="pointer-events-none">
          <div class="absolute top-6 left-6 text-xl text-[#DCC7B0] animate-pulse">✦</div>
          <div
            class="absolute top-8 right-8 text-xl text-[#DCC7B0] animate-pulse"
            style="animation-delay: 1s"
          >
            🤎
          </div>
          <div
            class="absolute bottom-6 right-6 text-xl text-[#DCC7B0] animate-pulse"
            style="animation-delay: 0.5s"
          >
            ✧
          </div>
        </div>

        <h2 class="text-2xl sm:text-3xl font-bold text-[#4B3621] mb-8">คำอวยพรในวันนี้</h2>

        <div class="space-y-6 text-lg leading-relaxed text-[#4B3621]">
          <p>
            สุขสันต์วันเกิดนะครับจิว 🎂 <br />
            ขอให้ปีนี้เป็นปีที่หัวใจของจิวอบอุ่นขึ้นกว่าปีก่อน เต็มไปด้วยความสบายใจและความสุขเล็ก ๆ
            ในทุกวัน
          </p>
          <p>
            ไม่ว่าจิวจะเลือกเดินไปทางไหน ขอให้ได้ทำในสิ่งที่ตัวเองรักด้วยหัวใจที่มีความสุข
            และมีคนที่มองเห็นความพยายามของจิวอยู่ข้าง ๆ เสมอ
          </p>
          <p class="font-medium">
            ในวันที่เหนื่อยหรือรู้สึกไม่มั่นใจ ก็ขอให้จำไว้ว่ายังมีคนที่คอยเอาใจช่วยอยู่ห่าง ๆ
            ดีใจทุกครั้งที่ได้เห็นรอยยิ้มและแววตาตั้งใจของจิวครับ 🤎
          </p>
        </div>

        <div class="pt-10 flex justify-center">
          <button
            class="btn-primary px-8 py-3 rounded-full shadow-md"
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
      <div class="scroll-animate max-w-3xl w-full text-center space-y-8">
        <div class="bg-white/95 rounded-[2.5rem] shadow-soft border border-[#DCC7B0]/60 px-6 py-12">
          <h2 class="text-3xl font-bold text-[#4B3621] mb-8">ภาพ Chibi พิเศษสำหรับจิว</h2>

          <div class="flex justify-center mb-8">
            <div
              class="bg-[#F9F1E7] rounded-[2rem] border-4 border-white shadow-inner p-6 inline-block rotate-1 hover:rotate-0 transition-transform duration-500"
            >
              <img
                src="/499739564_122232150404179407_2509833584844019209_n.jpg"
                alt="Chibi Jew Birthday"
                class="max-w-xs sm:max-w-sm w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

          <div class="space-y-4 text-lg leading-relaxed text-[#4B3621]">
            <p class="font-bold text-xl">สุขสันต์วันเกิดอีกครั้งนะครับจิว 🎉</p>
            <p>
              หวังว่าเว็บเล็ก ๆ หน้านี้ จะเป็นอีกหนึ่งความทรงจำที่ทำให้วันนี้อบอุ่นขึ้นอีกนิดหนึ่ง
              ขอให้ทุกปีต่อจากนี้เต็มไปด้วยแสงที่อ่อนโยนและคนดี ๆ รอบตัวเสมอนะครับ
            </p>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <button
            class="btn-secondary px-6 py-2 rounded-full flex items-center gap-2"
            @click="scrollToSection('hero-section')"
          >
            ⬆️ กลับไปด้านบน
          </button>
          <button class="px-6 py-2 text-[#4B3621]/60 cursor-default" disabled>
            Made with 🤎 for Jew
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- Utility Classes (นำไปใช้ร่วมกับ Tailwind) --- */
.bg-cream-light {
  background-color: var(--color-cream-light);
}
.text-deep-brown {
  color: var(--color-deep-brown);
}
.text-soft-brown {
  color: var(--color-soft-brown);
}
.border-latte-beige {
  border-color: var(--color-latte-beige);
}
.bg-pure-white {
  background-color: var(--color-pure-white);
}

/* ปุ่มหลัก */
.btn-primary {
  background-color: var(--color-soft-brown);
  color: white;
  border: none;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background-color: #8c6239;
  transform: translateY(-2px);
}

/* ปุ่มรอง */
.btn-secondary {
  background-color: var(--color-latte-beige);
  color: var(--color-deep-brown);
  border: none;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background-color: #c9af91;
}

/* เงาแบบนุ่ม */
.shadow-soft {
  box-shadow:
    0 20px 40px -10px rgba(75, 54, 33, 0.1),
    0 10px 20px -5px rgba(75, 54, 33, 0.05);
}

/* --- Animation Classes --- */
.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 1s ease-out,
    transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
}

.scroll-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Music Bar Animation */
@keyframes bounce {
  0%,
  100% {
    height: 0.5rem;
  }
  50% {
    height: 1.5rem;
  }
}
.animate-music-bar {
  animation: bounce 1s infinite ease-in-out;
}
</style>
