<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import HomePage from '@/pages/HomePage.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: url('../assets/2001.jpg') center center no-repeat;
  background-size: cover;
}
</style>
