<template>
  <div class="container mx-auto px-4">
    <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center">ปฏิทินกิจกรรม</h2>

    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
      <!-- ปฏิทิน -->
      <div>
        <vue-cal class="h-[450px] sm:h-[500px] w-full" xs view="month" :views="['month']" />
      </div>

      <div class="w-full lg:w-7/12 p-4 border rounded-lg bg-white shadow-sm">
        <h3 class="text-lg font-semibold mb-3">รายละเอียดกิจกรรม</h3>
        <div>
          <p class="text-gray-600">เลือกวันที่ในปฏิทินเพื่อดูรายละเอียดกิจกรรม</p>
          <div class="border-t border-gray-300 mt-3 pt-3 text-gray-500">
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
