<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 text-center">ปฎิทินกิจกรรม</h2>
    <div class="flex px-8 gap-4">
      <vue-cal xs view="month" :views="['month']" />
      <div class="p-4 border rounded-lg w-10/12">
        รายละเอียดกิจกรรม
        <div class="mt-4">
          เลือกวันที่ในปฎิทินเพื่อดูรายละเอียดกิจกรรม
          <div class="border-t border-gray-300 mt-2 pt-2">
            ไม่มีรายละเอียดกิจกรรมในขณะนี้
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueCal } from 'vue-cal'
import 'vue-cal/style'
</script>
