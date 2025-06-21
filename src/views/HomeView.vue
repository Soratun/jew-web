<template>
  <div class="bg-blue-400 h-screen flex items-center justify-center text-5xl flex-col">
    <button @click="toggleTyping" class="px-4 py-2 bg-pink-500 text-white rounded mb-4">
      {{ hasTyped ? 'ลบข้อความ' : 'พิมพ์ข้อความ' }}
    </button>

    <div class="flex gap-2 items-center">
      <h1 id="typewriter" class="text-7xl font-bold mt-10 text-center"></h1>

      <div class="w-28 h-28 rounded-full overflow-hidden">
        <img src="/499739564_122232150404179407_2509833584844019209_n.jpg" alt="jew" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TypeIt from "typeit";
import { ref, nextTick } from "vue";

const hasTyped = ref(false);
let instance: TypeIt | null = null;

const toggleTyping = async () => {
  if (!hasTyped.value) {
    hasTyped.value = true;

    // รอ DOM render ก่อนสร้าง TypeIt
    await nextTick();

    instance = new TypeIt("#typewriter", {
      speed: 80,
      cursor: true,
      afterComplete: () => {
        const cursor = document.querySelector(".ti-cursor") as HTMLElement;
        if (cursor) {
          cursor.classList.add("fade-out-cursor");
        }
      },
    })
      .type("Happy birthday to Jew BNK48")
      .go();
  } else {
    hasTyped.value = false;

    if (instance) {
      instance.destroy();
      instance = null;
    }

    const el = document.getElementById("typewriter");
    if (el) el.innerHTML = "";
  }
};
</script>

<style>
.fade-out-cursor {
  animation: fadeOut 1s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    display: none;
  }
}
</style>
