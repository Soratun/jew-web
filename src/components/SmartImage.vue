<!-- src/components/SmartImage.vue -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  src: string           // อาจเป็นลิงก์ Drive หรือไม่ก็ได้
  size?: number         // ขนาดสำหรับ thumbnail
  alt?: string
  class?: string
}>()

function extractDriveId(url: string): string | null {
  try {
    const u = new URL(url)
    const m1 = u.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (m1?.[1]) return m1[1]
    const id = u.searchParams.get('id')
    if (id) return id
    return null
  } catch { return null }
}

function candidates(url: string, size = 1000): string[] {
  const id = extractDriveId(url)
  if (!id) return [url] // ไม่ใช่ Drive → ใช้ url เดิม
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`, // 1) เร็ว/เล็ก
    `https://drive.google.com/uc?export=view&id=${id}`,        // 2) ไฟล์ต้นฉบับ
    url                                                        // 3) เผื่อกรณีสุดท้าย
  ]
}

const idx = ref(0)
const opts = ref<string[]>([])

watchEffect(() => {
  idx.value = 0
  opts.value = candidates(props.src, props.size ?? 1000)
})

const onError = () => {
  if (idx.value < opts.value.length - 1) idx.value++   // ลองตัวถัดไป
}
</script>

<template>
  <img :src="opts[idx]" :alt="props.alt" :class="props.class" loading="lazy" @error="onError" />
</template>
