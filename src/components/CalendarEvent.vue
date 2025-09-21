<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">ปฎิทินกิจกรรม</h2>
    <div>
      <vue-cal xs view="month" :views="['month']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueCal } from 'vue-cal'
import 'vue-cal/style'
</script>
