<script setup lang="ts">

const members = [
  'Cherprang',
  'Jan',
  'Jennis',
  'Kaew',
  'Korn',
  'Mobile',
  'Namsai',
  'Pun',
  'Pupe',
  'Satchan',
  'Tarwaan',
  'View',
]
</script>
<template>
  <div class="space-y-4 text-center">
    <div>
      <h1>Ghost Selfie</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h1>Trick or Treat</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h1>Halloween Tattoo</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h1>Potion Lab</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h1>Mystery Pop</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h1>Ghost Hi-Touch</h1>
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table class="table table-auto">
          <thead>
            <tr class=" text-black">
              <th>เมนเบอร์</th>
              <th>31 ตุลาคม</th>
              <th>1 พฤศจิกายน</th>
              <th>2 พฤศจิกายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member">
              <td>{{ member }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
