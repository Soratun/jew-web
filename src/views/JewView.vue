<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue'

// --- Configuration ---
const bgmSrc = '/morning-light-ambient-acoustic-guitar-background-music-for-videos-5712.mp3'

// --- State & Refs ---
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const observer = ref<IntersectionObserver | null>(null)

// ข้อมูลรูปภาพ
const images = [
  {
    src: 'jew/jew2.webp',
    caption: 'วันที่นั่งม้านั่งชุดขาวที่ดูสบายตาและอบอุ่นใจ',
    sticker: 'jew/jew2-chibi.webp',
  },
  {
    src: 'jew/jew3.webp',
    caption: 'โมเมนต์กับฟองสบู่ที่สดใส มองกี่ทีก็เผลอยิ้มตามได้เสมอ',
    sticker: 'jew/jew3-chibi.webp',
  },
  {
    src: 'jew/IMG_0063.webp',
    caption: 'รอยยิ้มใส่แว่นกับหลอดชมพูที่น่ารักมาก',
    sticker: 'jew/IMG_0063-chibi.webp',
  },
  {
    src: 'jew/jew4.webp',
    caption: 'รูปถือก้อนเมฆที่ละมุนราวกับอยู่ในความฝัน',
    sticker: 'jew/jew4-chibi.webp',
  },
  {
    src: 'jew/IMG_0270.webp',
    caption: 'ลุคใส่แว่นสบาย ๆ กับแสงไฟอุ่น ๆ ที่เห็นแล้วใจฟูตามเลย',
    sticker: 'jew/IMG_0270-chibi.webp',
  },
  {
    src: 'jew/IMG_3004.webp',
    caption: 'ฮัลโลวีนชุดไทยที่เท่มากและน่าจดจำสุด ๆ',
    sticker: 'jew/IMG_3004-chibi.webp',
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

onBeforeMount(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
})

onMounted(() => {
  window.scrollTo(0, 0)

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    },
  )

  const elements = document.querySelectorAll('.scroll-animate')
  elements.forEach((el) => observer.value?.observe(el))
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="bg-cream-light-jew min-h-screen text-deep-brown-jew font-sans overflow-x-hidden">
    <audio ref="audioRef" :src="bgmSrc" loop class="hidden" />

    <section id="hero-section" class="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        class="scroll-animate max-w-2xl w-full bg-pure-white-jew/95 rounded-[2rem] shadow-soft border border-latte-beige-jew/60 px-6 py-10 sm:px-10 text-center space-y-5"
      >
        <p class="text-sm tracking-[0.25em] uppercase text-soft-brown-jew font-medium">
          For Jew – Birthday Letter
        </p>
        <h1 class="text-3xl sm:text-4xl font-bold text-deep-brown-jew leading-tight">
          พื้นที่เล็ก ๆ ที่ตั้งใจเก็บความทรงจำ<br class="hidden sm:block" />ให้จิวในวันพิเศษนี้ครับ
        </h1>
        <p class="text-base sm:text-lg text-[#6b4a2b] leading-relaxed">
          อยากให้หน้านี้เป็นเหมือนกล่องของขวัญที่ค่อย ๆ แกะดูไปทีละชั้น พร้อมเพลงบรรยากาศสบาย ๆ
        </p>

        <div class="pt-6">
          <button
            class="btn-primary-jew text-lg px-10 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            @click="startGift"
          >
            เริ่มเปิดของขวัญ 🎁
          </button>
        </div>
      </div>
    </section>

    <section id="letter-section" class="min-h-screen flex items-center justify-center px-4 py-16">
      <div
        class="scroll-animate max-w-3xl w-full bg-pure-white-jew/95 rounded-[2rem] shadow-soft border border-latte-beige-jew/60 px-6 py-10 sm:px-12"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="h-[1px] flex-1 bg-latte-beige"></div>
          <p class="text-sm font-semibold text-soft-brown-jew tracking-widest uppercase">To Jew</p>
          <div class="h-[1px] flex-1 bg-latte-beige"></div>
        </div>

        <div
          class="space-y-5 text-base sm:text-lg leading-loose text-[#4B3621] text-justify sm:text-left"
        >
          <p>
            <span class="text-2xl font-serif block mb-2">ถึงจิว,</span>
            ในวันพิเศษของจิวปีนี้ อยากใช้พื้นที่เล็ก ๆ
            ตรงนี้เป็นเหมือนการ์ดอวยพรที่เก็บความตั้งใจและความปรารถนาดีไว้ให้
            ขอบคุณจิวที่ส่งพลังบวกและส่งมอบความสดใส ให้กับแฟนคลับมาโดยตลอดนะครับ
            ไม่ว่าจะเป็นรอยยิ้มหรือความตั้งใจบนเวที ทุกอย่างมีความหมายมากจริง ๆ
          </p>
          <p>
            หวังว่าของขวัญชิ้นเล็กชิ้นนี้จะทำให้จิวยิ้มได้
            และทำให้วันนี้เป็นวันที่ดีอีกวันหนึ่งของปี
          </p>
          <p class="font-medium text-soft-brown-jew">
            สุขสันต์วันเกิดนะครับ ขอให้มีความสุขมาก ๆ 🤎✨
          </p>
          <p class="pt-4 text-sm text-gray-500 text-right">
            - จากคนธรรมดาคนหนึ่ง ที่ดีใจมาก ๆ ที่โลกใบนี้มีจิวอยู่ครับ
          </p>
        </div>

        <div class="pt-10 flex justify-center">
          <button
            class="btn-secondary-jew px-8 py-2 rounded-full"
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
          <h2 class="text-3xl font-bold text-deep-brown-jew mb-3">โมเมนต์น่ารักของจิว</h2>
          <p class="text-lg text-[#6b4a2b]">รวมภาพถ่ายและความทรงจำดี ๆ ที่อยากเก็บไว้ในนี้ครับ</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <div
            v-for="(item, index) in images"
            :key="index"
            class="scroll-animate card bg-pure-white-jew rounded-3xl shadow-sm border border-latte-beige-jew/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <figure class="aspect-[3/4] overflow-hidden relative bg-gray-100">
              <img
                :src="item.src"
                :alt="item.caption"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <img
                v-if="item.sticker"
                :src="item.sticker"
                loading="lazy"
                decoding="async"
                class="absolute bottom-2 right-2 w-16 h-16 sm:w-32 sm:h-32 object-contain drop-shadow-md z-20 hover:scale-110 transition-transform"
              />
            </figure>
            <div
              class="p-4 text-sm sm:text-base text-deep-brown-jew bg-white relative z-10 text-center"
            >
              {{ item.caption }}
            </div>
          </div>
        </div>

        <div class="pt-12 flex justify-center scroll-animate">
          <button
            class="btn-primary-jew px-8 py-3 rounded-full shadow-md"
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
        class="scroll-animate max-w-xl w-full bg-pure-white-jew/95 rounded-[2rem] shadow-soft border border-latte-beige-jew/60 px-6 py-10 sm:px-12 text-center relative z-10"
      >
        <h2 class="text-3xl font-bold text-deep-brown-jew">เพลงประกอบของขวัญ</h2>
        <p class="text-sm mt-2 text-soft-brown-jew font-medium">Now Playing: “Morning Light”</p>

        <div class="mt-8 space-y-4 text-lg leading-relaxed text-deep-brown-jew">
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
            class="btn-primary-jew rounded-full px-8 py-3 flex items-center gap-3 shadow-lg active:scale-95 transition-transform"
            @click="toggleMusic(false)"
          >
            <span v-if="isPlaying" class="flex items-center gap-2">
              <span>⏸</span> พักเพลงก่อน
            </span>
            <span v-else class="flex items-center gap-2"> <span>▶️</span> เล่นเพลงต่อ </span>
          </button>
        </div>

        <div class="pt-10 border-t border-latte-beige-jew/30 mt-8">
          <button
            class="text-soft-brown-jew hover:text-deep-brown-jew transition-colors underline underline-offset-4"
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
            ในทุกวัน ขอให้ได้ทานของอร่อย ๆ และได้นอนหลับเต็มอิ่มในทุกคืนนะครับ
          </p>
          <p>
            ไม่ว่าเส้นทางข้างหน้าจิวจะเลือกเดินไปทางไหน ขอให้จิวได้ทำในสิ่งที่รักด้วยรอยยิ้ม
            และมั่นใจได้เลยว่าจะมีคนที่มองเห็นความพยายามของจิวอยู่ข้าง ๆ เสมอ
          </p>
          <p class="font-medium">
            ในวันที่เหนื่อยหรือท้อ ก็ขอให้จำไว้ว่ายังมีคนทางนี้คอยเอาใจช่วยอยู่เสมอ
            ดีใจทุกครั้งที่ได้เห็นรอยยิ้มและแววตาที่มุ่งมั่นของจิวครับ 🤎
          </p>
        </div>

        <div class="pt-10 flex justify-center">
          <button
            class="btn-primary-jew px-8 py-3 rounded-full shadow-md"
            @click="scrollToSection('chibi-section')"
          >
            ไปดูอนิเมชันที่ตั้งใจทำให้ครับ ✨
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
          <h2 class="text-3xl font-bold text-[#4B3621] mb-8">
            Animation เล็ก ๆ ที่ตั้งใจทำให้ครับ
          </h2>

          <div class="flex justify-center mb-8">
            <div
              class="bg-[#F9F1E7] rounded-[2rem] border-4 border-white shadow-inner p-6 inline-block rotate-1 hover:rotate-0 transition-transform duration-500"
            >
              <img
                src="/jew/iiG.gif"
                alt="Chibi Jew Birthday Animation"
                class="max-w-xs sm:max-w-sm w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

          <div class="space-y-4 text-lg leading-relaxed text-[#4B3621]">
            <p class="font-bold text-xl">สุขสันต์วันเกิดอีกครั้งนะครับจิว 🎉</p>
            <p>
              หวังว่าเว็บเล็ก ๆ และอนิเมชันสั้น ๆ นี้
              จะเป็นอีกหนึ่งความทรงจำที่ทำให้วันนี้อบอุ่นขึ้นอีกนิดหนึ่ง
              ขอให้ทุกปีต่อจากนี้เต็มไปด้วยแสงที่อ่อนโยนและคนดี ๆ รอบตัวเสมอนะครับ
            </p>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <button
            class="btn-secondary-jew px-6 py-2 rounded-full flex items-center gap-2"
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
.bg-cream-light-jew {
  background-color: var(--color-cream-light);
}
.text-deep-brown-jew {
  color: var(--color-deep-brown);
}
.text-soft-brown-jew {
  color: var(--color-soft-brown);
}
.border-latte-beige-jew {
  border-color: var(--color-latte-beige);
}
.bg-pure-white-jew {
  background-color: var(--color-pure-white);
}

.btn-primary-jew {
  background-color: var(--color-soft-brown);
  color: white;
  border: none;
  transition: all 0.2s ease;
}
.btn-primary-jew:hover {
  background-color: #8c6239;
  transform: translateY(-2px);
}

.btn-secondary-jew {
  background-color: var(--color-latte-beige);
  color: var(--color-deep-brown);
  border: none;
  transition: all 0.2s ease;
}
.btn-secondary-jew:hover {
  background-color: #c9af91;
}

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
