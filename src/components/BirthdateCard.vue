<template>
  <div
    class="w-11/12 max-w-2xl rounded-xl shadow-lg p-6 m-4 opacity-0 animate-fade-in hover:scale-105 transition-transform duration-300 text-center"
    :class="cardBrandClass(brand)"
    @click="open = true"
  >
    <p class="text-lg text-gray-700 mb-2">🎂 {{ name }}'s Birthday</p>

    <p class="w-full text-2xl font-extrabold text-gray-900 tracking-wide mb-4">
      {{ formatDate(birthdate) }}
    </p>

    <div class="flex justify-center gap-2 text-sm text-gray-700 mb-4">
      <p><span class="font-semibold">Generation:</span> {{ generation || '—' }}</p>
      <p><span class="font-semibold">Team:</span> {{ team || '—' }}</p>
    </div>

    <div v-if="today > new Date(birthdate)" class="flex items-center justify-center gap-4 mt-4">
      <div
        class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
        :class="countdownBrandClass(brand)"
      >
        <span class="text-2xl font-bold">{{ dd }}</span>
        <span class="text-xs uppercase opacity-90">Days</span>
      </div>
      <div
        class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
        :class="countdownBrandClass(brand)"
      >
        <span class="text-2xl font-bold">{{ hh }}</span>
        <span class="text-xs uppercase opacity-90">Hours</span>
      </div>
      <div
        class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
        :class="countdownBrandClass(brand)"
      >
        <span class="text-2xl font-bold">{{ mm }}</span>
        <span class="text-xs uppercase opacity-90">Mins</span>
      </div>
      <div
        class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
        :class="countdownBrandClass(brand)"
      >
        <span class="text-2xl font-bold">{{ ss }}</span>
        <span class="text-xs uppercase opacity-90">Secs</span>
      </div>
    </div>
  </div>

  <div
    v-if="open"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="open = false"
  >
    <div
      class="h-9/12  w-full max-w-4xl rounded-xl p-8 shadow-2xl transform animate-scale-in text-center relative"
      :class="cardBrandClass(brand)"
    >
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        @click="open = false"
      >
        ✕
      </button>

      <p class="text-lg text-gray-700 mb-2">🎂 {{ name }}'s Birthday</p>

      <p class="w-full text-2xl font-extrabold text-gray-900 tracking-wide mb-4">
        {{ formatDate(birthdate) }}
      </p>

      <div class="flex justify-center gap-2 text-sm text-gray-700 mb-4">
        <p><span class="font-semibold">Generation:</span> {{ generation || '—' }}</p>
        <p><span class="font-semibold">Team:</span> {{ team || '—' }}</p>
      </div>

      <div v-if="today < new Date(birthdate)" class="flex items-center justify-center gap-4 mt-4">
        <div
          class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
          :class="countdownBrandClass(brand)"
        >
          <span class="text-2xl font-bold">{{ dd }}</span>
          <span class="text-xs uppercase opacity-90">Days</span>
        </div>
        <div
          class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
          :class="countdownBrandClass(brand)"
        >
          <span class="text-2xl font-bold">{{ hh }}</span>
          <span class="text-xs uppercase opacity-90">Hours</span>
        </div>
        <div
          class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
          :class="countdownBrandClass(brand)"
        >
          <span class="text-2xl font-bold">{{ mm }}</span>
          <span class="text-xs uppercase opacity-90">Mins</span>
        </div>
        <div
          class="flex flex-col items-center rounded-lg px-3 py-2 shadow"
          :class="countdownBrandClass(brand)"
        >
          <span class="text-2xl font-bold">{{ ss }}</span>
          <span class="text-xs uppercase opacity-90">Secs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    name: string
    birthdate: string
    generation?: string
    brand?: string
    team?: string
  }>(),
  {
    generation: '',
    brand: '',
    team: '',
  },
)

const today = new Date()
const open = ref(false)

function cardBrandClass(brand?: string) {
  switch (brand) {
    case 'BNK48':
      return 'bg-pink-100 border-4 border-pink-400'
    case 'CGM48':
      return 'bg-emerald-100 border-4 border-emerald-400'
    default:
      return 'bg-gray-100 border-4 border-gray-300'
  }
}

function countdownBrandClass(brand?: string) {
  switch (brand) {
    case 'BNK48':
      return 'bg-gradient-to-r from-pink-500 to-violet-600 text-white'
    case 'CGM48':
      return 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white'
    default:
      return 'bg-gray-700 text-white'
  }
}

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })
}

const nextBirthday = (): Date => {
  const [, m, day] = props.birthdate.split('-').map(Number)
  const now = new Date()
  const thisYear = now.getFullYear()

  const candidate = new Date(thisYear, (m ?? 1) - 1, day ?? 1, 0, 0, 0, 0)
  if (Number.isNaN(candidate.getTime())) return now

  if (candidate.getTime() <= now.getTime()) {
    candidate.setFullYear(thisYear + 1)
  }
  return candidate
}

const remainMs = ref(0)

const tick = () => {
  const target = nextBirthday().getTime()
  const now = Date.now()
  remainMs.value = Math.max(0, target - now)
}

useIntervalFn(tick, 1000, { immediate: true })

const dd = computed(() => Math.floor(remainMs.value / (1000 * 60 * 60 * 24)))
const hh = computed(() => Math.floor((remainMs.value / (1000 * 60 * 60)) % 24))
const mm = computed(() => Math.floor((remainMs.value / (1000 * 60)) % 60))
const ss = computed(() => Math.floor((remainMs.value / 1000) % 60))
</script>
