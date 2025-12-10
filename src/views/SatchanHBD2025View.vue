<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Memory {
  id: number;
  image: string;
  date: string; // เพิ่มวันที่แบบญี่ปุ่น
  title: string;
  delay: number;
}

const memories = ref<Memory[]>([
  { id: 1, image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800', date: '2023.04.15', title: 'First Date', delay: 0 },
  { id: 2, image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&w=800', date: '2023.12.25', title: 'Christmas', delay: 200 },
  { id: 3, image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800', date: '2024.02.14', title: 'Valentine', delay: 100 },
   // ใส่รูปเพิ่ม...
]);

onMounted(() => {
  AOS.init({ duration: 1200, once: false });
});
</script>

<template>
  <div class="min-h-screen bg-base-100 relative overflow-hidden font-sans">

    <div class="sakura-container">
      <div class="sakura" v-for="n in 20" :key="n"></div>
    </div>

    <div class="flex flex-col items-center justify-center min-h-[40vh] pt-10 text-center relative z-10">
      <h1 class="text-5xl md:text-7xl font-bold text-secondary mb-4 drop-shadow-sm" data-aos="fade-down">
        お誕生日<br>おめでとう
      </h1>
      <p class="text-xl text-gray-500 mt-2 tracking-widest">HAPPY BIRTHDAY</p>
      <div class="divider divider-secondary w-24 mx-auto mt-6">🌸</div>
    </div>

    <div class="container mx-auto px-4 pb-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div
          v-for="item in memories"
          :key="item.id"
          class="card bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100"
          data-aos="fade-up"
          :data-aos-delay="item.delay"
        >
          <figure class="px-3 pt-3">
            <img :src="item.image" class="rounded-xl object-cover h-72 w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </figure>

          <div class="card-body items-center text-center py-6">
            <div class="badge badge-primary badge-outline mb-2">{{ item.date }}</div>
            <h2 class="card-title text-gray-700 font-serif">{{ item.title }}</h2>

            <div class="mt-2 w-8 h-8 rounded-full border-2 border-red-400 text-red-400 flex items-center justify-center text-xs font-bold opacity-60 transform rotate-12">
              愛
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🌸 CSS สำหรับกลีบซากุระร่วง */
.sakura-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; /* ไม่ให้บังการคลิก */
}

.sakura {
  position: absolute;
  top: -10%;
  width: 15px;
  height: 15px;
  background: #ffb7c5; /* สีซากุระ */
  border-radius: 100% 0 100% 0; /* ทรงกลีบดอกไม้ */
  opacity: 0.6;
  animation: fall linear infinite;
}

/* สร้างตำแหน่งแบบสุ่มด้วย nth-child (ตัวอย่างคร่าวๆ) */
.sakura:nth-child(2n) { width: 10px; height: 10px; left: 20%; animation-duration: 10s; animation-delay: 1s; }
.sakura:nth-child(3n) { width: 12px; height: 12px; left: 50%; animation-duration: 12s; animation-delay: 4s; }
.sakura:nth-child(4n) { left: 80%; animation-duration: 8s; animation-delay: 2s; }
/* ... เพิ่มได้ตามต้องการ ... */

@keyframes fall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0.8; }
  100% { transform: translateY(100vh) translateX(20px) rotate(360deg); opacity: 0; }
}
</style>
