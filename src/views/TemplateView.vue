<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 via-pink-50 to-yellow-50">
    <!-- Header -->
    <di class="border-b border-black/5 bg-white/70 backdrop-blur-md">
      <div class="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight">🎂 Template Builder</h1>
      </div>
    </di>

    <div class="mx-auto max-w-6xl px-5 py-8">
      <section class="mb-6">
        <label class="block mb-2 text-base font-medium text-gray-800">กรอกชื่อเรื่อง</label>
        <input
          v-model="title"
          type="text"
          placeholder="เช่น Happy Birthday"
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <section class="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <div class="p-5 border-b border-gray-100">
            <h2 class="text-lg font-semibold">ข้อมูลข้อความ</h2>
            <p class="text-sm text-gray-500">กรอกข้อความอวยพรและชื่อ</p>
          </div>
          <div class="p-5 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-800">ข้อความ</label>
                <input
                  v-model="message"
                  type="text"
                  placeholder="เช่น สุขสันต์วันเกิด"
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-800">ชื่อ</label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="เช่น NamPing"
                  class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
            </div>

            <div class="pt-2">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-medium text-gray-800">เพิ่มรูปภาพจาก URL</h3>
                <button
                  type="button"
                  class="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-white text-sm hover:bg-emerald-700"
                  @click="addUrl"
                >
                  ➕ เพิ่ม URL
                </button>
              </div>

              <div class="space-y-2">
                <div v-for="(u, i) in urls" :key="i" class="flex items-center gap-2">
                  <span class="w-6 text-xs text-gray-500 text-right">{{ i + 1 }}.</span>
                  <input
                    v-model="urls[i]"
                    type="text"
                    placeholder="วางลิงก์รูปภาพ เช่น https://…/image.webp"
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                  <button
                    v-if="urls.length > 1"
                    type="button"
                    class="rounded-lg bg-red-500 px-2.5 py-1.5 text-white text-xs hover:bg-red-600"
                    @click="removeUrl(i)"
                  >
                    ลบ
                  </button>
                </div>
              </div>

              <div v-if="filteredUrls.length" class="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                <div
                  v-for="(u, i) in filteredUrls"
                  :key="'thumb-' + i"
                  class="rounded-lg overflow-hidden border bg-white"
                >
                  <SmartImage
                    :src="u"
                    :size="1000"
                    class="h-32 w-full object-contain"
                    alt="preview"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="p-5 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              :disabled="!canCreate"
              class="rounded-xl bg-black px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-40"
              @click="clickCreate"
            >
              สร้าง
            </button>
          </div>
        </section>

        <section class="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sticky top-4">
          <div class="p-5 border-b border-gray-100">
            <h2 class="text-lg font-semibold">Preview</h2>
            <p class="text-sm text-gray-500">ตัวอย่างผลลัพธ์</p>
          </div>

          <div class="p-6 space-y-4">
            <div class="text-center">
              <p class="text-xs uppercase tracking-wide text-gray-500">Title</p>
              <p class="text-xl font-semibold">{{ title || '—' }}</p>
            </div>

            <div class="rounded-xl bg-gradient-to-br from-pink-50 to-emerald-50 p-5 text-center">
              <p class="text-2xl font-bold">
                {{ message || 'สุขสันต์วันเกิด' }}
                <span class="text-emerald-700 font-extrabold">{{ name || '{ชื่อ}' }}</span>
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500 mb-2">Images</p>
              <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  v-for="(u, i) in filteredUrls"
                  :key="'img-' + i"
                  class="rounded-xl overflow-hidden border bg-white"
                >
                  <div class="aspect-[4/3] bg-white/60">
                    <SmartImage
                      :src="u"
                      :size="1000"
                      class="w-full h-full object-contain"
                      alt="preview"
                    />
                  </div>
                </div>

                <template v-if="filteredUrls.length === 0">
                  <div
                    v-for="n in 3"
                    :key="'ph-' + n"
                    class="rounded-xl border border-dashed border-gray-300 bg-gray-50"
                  >
                    <div class="aspect-[4/3] grid place-items-center text-gray-400 text-sm">
                      ไม่มีรูป
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SmartImage from '@/components/SmartImage.vue'
import api from '@/lib/api'
import router from '@/router'

const title = ref('')
const message = ref('')
const name = ref('')

const urls = ref<string[]>([''])
const addUrl = () => urls.value.push('')
const removeUrl = (i: number) => urls.value.splice(i, 1)

const filteredUrls = computed(() => urls.value.map((u) => u.trim()).filter(Boolean))
const canCreate = computed(
  () => !!(title.value.trim() && (message.value.trim() || name.value.trim())),
)

const clickCreate = async () => {
  if (!canCreate.value) return
  const payload = [message.value]
  const response = await api.post('/pages', {
    template_id: 'b-01',
    title: title.value.trim(),
    message: payload,
    photo_url: filteredUrls.value,
  })
  console.log('Create response:', response.data)
  router.push({
    name: 'birthday',
    query: {
      id: response.data.id
    },
  })
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

.font-itim {
  font-family: 'Itim', cursive;
}
</style>
