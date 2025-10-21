<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

type MenuItem = { label: string; to: string }
const route = useRoute()
const open = ref(false)

const items: MenuItem[] = [
  { label: 'CreateTemplate', to: '/template' },
  { label: 'meibirthday', to: '/meibirthday' },
  { label: 'namping', to: '/namping' },
  { label: 'Moonlight & Monster', to: '/moonlight-and-monster' },
]

const isActive = (to: string) =>
  computed(() => route.path === to || route.path.startsWith(to + '/'))
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md"
  >
    <nav class="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-1">
        <span class="text-xl font-bold">Fan Club 48 Thailand</span>
      </RouterLink>

      <ul class="hidden md:flex items-center gap-2 px-2">
        <li v-for="m in items" :key="m.to">
          <RouterLink
            :to="m.to"
            class="px-3 py-2 rounded-xl text-sm"
            :class="[
              isActive(m.to).value
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-black/5'
            ]"
          >
            {{ m.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- ปุ่มขวา (เช่น Share/Download) – วางที่นี่ต่อยอดภายหลังได้ -->
      <div class="hidden md:flex items-center gap-2">
        <slot name="actions" />
      </div>

      <!-- hamburger (mobile) -->
      <button
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5"
        @click="open = !open"
        aria-label="Toggle menu"
        :aria-expanded="open"
      >
        <svg v-if="!open" class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </nav>

    <!-- เมนู mobile -->
    <transition name="fade">
      <div v-if="open" class="md:hidden border-t border-black/5 bg-white">
        <ul class="px-4 py-2 space-y-1">
          <li v-for="m in items" :key="m.to">
            <RouterLink
              :to="m.to"
              class="block px-3 py-2 rounded-lg"
              :class="[
                isActive(m.to).value
                  ? 'bg-black text-white'
                  : 'text-gray-800 hover:bg-black/5'
              ]"
              @click="open = false"
            >
              {{ m.label }}
            </RouterLink>
          </li>

          <!-- ปุ่ม actions (mobile) -->
          <li>
            <div class="pt-2 flex items-center gap-2">
              <slot name="actions" />
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
