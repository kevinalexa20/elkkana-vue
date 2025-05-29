<script setup lang="ts">
const loopText = 'Elkkana'
const loopText2 = 'Corp'
const loopText3 = 'Ship'
const loopText4 = 'Crewing'
const loopText5 = 'Management'
</script>

<template>
  <div class="mb-28">
    <div class="relative w-full my-10 py-2 overflow-hidden">
      <div class="flex left-0 animate-marquee space-x-96">
        <div class="flex space-x-5">
          <div class="font-bold text-8xl mx-5">{{ loopText }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText2 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText3 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText4 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText5 }}</div>
        </div>
        <div class="flex space-x-5">
          <div class="font-bold text-8xl mx-5">{{ loopText }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText2 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText3 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText4 }}</div>
          <div class="font-bold text-8xl mx-5">{{ loopText5 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}
</style>
