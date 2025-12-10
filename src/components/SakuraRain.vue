<script setup lang="ts">
import { onMounted } from 'vue';

const createPetal = () => {
  const container = document.getElementById('sakura-container');
  if (!container) return;

  const petal = document.createElement('div');
  petal.classList.add('petal');

  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = Math.random() * 3 + 2 + 's';
  petal.style.opacity = Math.random().toString();

  container.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 5000);
};

onMounted(() => {
  setInterval(createPetal, 300);
});
</script>

<template>
  <div id="sakura-container" class="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50"></div>
</template>

<style>
.petal {
  position: absolute;
  top: -10px;
  width: 15px;
  height: 15px;
  background: #FFB7C5;
  border-radius: 100% 0 100% 0;
  animation: fall linear forwards;
}

@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}
</style>
