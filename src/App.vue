<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- 固定背景層 -->
    <div class="bg-fixed"></div>

    <!-- 可滾動內容層 -->
    <div class="content-layer">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
}

.bg-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/2001.png') center center no-repeat;
  background-size: cover;
  background-attachment: fixed; 
  z-index: -1; 
}
</style>
