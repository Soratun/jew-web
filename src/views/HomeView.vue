<template>
  <div class="min-h-screen bg-white">
    <div>
      <h1 class="text-4xl font-bold text-center pt-12 pb-7">วันเกิดประจำเดือนนี้</h1>
      <div class="flex flex-row items-center justify-center">
        <div v-for="(item, index) in res" :key="item.id || index">
          <AppCard
            v-if="isCurrentMonth(item.birthdate)"
            :name="item.formalDisplayName"
            :birthdate="item.birthdate"
            :generation="item.generation || ''"
            :brand="item.brand || ''"
            :team="item.team || ''"
          />
          <!-- <AppCard
            :name="item.formalDisplayName"
            :birthdate="item.birthdate"
            :generation="item.generation || ''"
            :brand="item.brand || ''"
            :team="item.team || ''"
          /> -->
        </div>
        <div v-if="!res.some((item) => isCurrentMonth(item.birthdate))">ไม่มีวันเกิดในเดือนนี้</div>
      </div>
    </div>

    <div>
      <CalendarEvent />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppCard from '@/components/BirthdateCard.vue'
import CalendarEvent from '@/components/CalendarEvent.vue'
import api from '@/lib/api'
import { onMounted, ref } from 'vue'

console.log('VITE_API_BASE =', import.meta.env?.VITE_API_BASE)

interface BirthdayItem {
  id?: number | string
  formalDisplayName: string
  birthdate: string
  age: number
  generation?: string
  brand?: string
  team?: string
}

const res = ref<BirthdayItem[]>([])

const isCurrentMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return false

  const now = new Date()
  return date.getMonth() === now.getMonth() && date.getDay() === now.getDate()
}

onMounted(async () => {
  document.title = "home";
  try {
    const response = await api.get('/birthmonth')
    res.value = response.data.map((item: BirthdayItem) => ({
      id: item.id,
      formalDisplayName: item.formalDisplayName,
      birthdate: item.birthdate,
      generation: item.generation || '',
      brand: item.brand || '',
      team: item.team || '',
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
