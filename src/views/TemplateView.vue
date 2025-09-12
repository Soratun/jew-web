<template>
  <div class="bg-white min-h-screen">
    <h1 class="text-3xl font-bold underline text-center pt-10">Template View</h1>

    <div class="flex flex-col items-center justify-center pt-10">
      <p class="text-lg p-3 font-itim">กรอกชื่อที่ต้องการสุขสันต์วันเกิด</p>
      <input
        type="text"
        v-model="name"
        placeholder="Enter something"
        class="border border-gray-300 rounded-md p-2 w-64 mb-4"
      />
    </div>

    <p class="text-lg p-3 font-itim text-center">
      ตัวอย่างข้อความที่กรอก : 🎂 สุขสันต์วันเกิด
      <span class="text-green-700 font-extrabold">{{ name || '{ชื่อ}' }}</span> 🎂
    </p>

    <div class="flex flex-col items-center justify-center pt-2">
      <p class="text-lg p-3 font-itim">เพิ่มรูปภาพ สูงสุด {{ MAX }} รูป</p>
      <input
        type="file"
        accept="image/*"
        multiple
        @change="handleFileUpload"
        class="border border-gray-300 rounded-md p-2 w-64 mb-2"
      />
      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
      <p class="text-sm text-gray-500">
        เลือกได้อีก {{ Math.max(0, MAX - images.length) }} รูป
      </p>
    </div>

    <div>
      <p class="text-lg p-3 font-itim text-center">ตัวอย่างรูปภาพที่เพิ่ม :</p>
      <div class="flex justify-center gap-4 flex-wrap px-4">
        <div
          v-for="(src, i) in objectUrls"
          :key="i"
          class="relative"
        >
          <img
            :src="src"
            alt="preview"
            class="w-24 h-24 object-cover rounded-md border border-gray-300"
          />
          <button
            class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs"
            @click="removeAt(i)"
            title="ลบรูปนี้"
          >
            ×
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center pt-10">
      <button
        @click="submit"
        :disabled="images.length === 0"
        class="bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const MAX = 4;

const name = ref('')
const images = ref<File[]>([])
const errorMsg = ref<string>('');


const objectUrls = computed(() => images.value.map((f) => URL.createObjectURL(f)))

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  const picked = Array.from(target.files);
  const remain = MAX - images.value.length;

  if (picked.length > remain) {
    errorMsg.value = `เลือกรูปได้สูงสุด ${MAX} รูป (ตอนนี้เพิ่มได้อีก ${remain} รูป)`;
    target.value = '';
    return;
  }

  images.value = images.value.concat(picked);
  errorMsg.value = '';
  target.value = '';
};

watch(
  images,
  (newVal, oldVal, onCleanup) => {
    const urlsToRevoke = oldVal?.map(f => URL.createObjectURL(f)) ?? [];
    onCleanup(() => urlsToRevoke.forEach(u => URL.revokeObjectURL(u)));
  },
  { flush: 'post' }
);

onBeforeUnmount(() => {
  objectUrls.value.forEach(u => URL.revokeObjectURL(u));
});

const removeAt = (i: number) => {
  const copy = images.value.slice();
  copy.splice(i, 1);
  images.value = copy;
};

const submit = () => {
  console.log('Name:', name.value);
  console.log('Files:', images.value);
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

.font-itim {
  font-family: 'Itim', cursive;
}
</style>
