<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

type MenuItem = { label: string; to: string }

const route = useRoute()
const open = ref(false)

const items: MenuItem[] = [
  { label: 'meibirthday', to: '/meibirthday' },
  { label: 'namping', to: '/namping' },
  { label: 'Satangpound', to: '/satangpound' },
  { label: 'Jew', to: '/jew-birthday-2025' },
]

const isActive = (to: string) =>
  computed(() => route.path === to || route.path.startsWith(to + '/'))

// ✅ state เช็คว่ามีการเลื่อนหรือยัง
const isScrolled = ref(false)

const handleScroll = () => {
  // > 10 px จะถือว่า "เลื่อนแล้ว"
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  handleScroll() // เผื่อโหลดมาหน้าแรกไม่ได้อยู่บนสุด
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <header
    class="sticky top-0 z-50 border-b border-black/5 transition-colors duration-300"
    :class="[
      // ถ้าเลื่อนแล้ว → โปร่ง + เบลอ
      isScrolled
        ? 'bg-white/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/10'
        // ถ้าอยู่บนสุด → ขาวทึบ
        : 'bg-white'
    ]"
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

      <div class="hidden md:flex items-center gap-2">
        <slot name="actions" />
      </div>

      <button
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5"
        @click="open = !open"
        aria-label="Toggle menu"
        :aria-expanded="open"
      >
        <svg v-if="!open" class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </nav>

    <transition name="fade">
      <div v-if="open" class="md:hidden border-t border-black/5">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
