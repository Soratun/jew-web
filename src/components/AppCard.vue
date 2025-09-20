<template>
  <div class="text-center mb-8  w-11/12 max-w-2xl bg-amber-300 rounded-lg shadow-md p-6 m-4">
    <p class="text-lg text-gray-600">
      {{ name }}'s Birthday is on {{ formatDate(birthdate) }}
    </p>
    <p class="text-lg text-gray-600">Generation: {{ generation || '—' }}</p>
    <p class="text-lg text-gray-600">Brand: {{ brand || '—' }}</p>
    <p class="text-lg text-gray-600">Team: {{ team || '—' }}</p>

    <div class="text-xl font-semibold text-blue-600 mt-4">
      <span>{{ dd }}d {{ hh }}h {{ mm }}m {{ ss }}s</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const props = withDefaults(defineProps<{
  name: string
  birthdate: string
  generation?: string
  brand?: string
  team?: string
}>(), {
  generation: '',
  brand: '',
  team: '',
})

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
