<template>
  <div v-loading="isLoading" element-loading-text="載入中..." element-loading-background="rgba(0, 0, 0, 0.8)">
    <h2 class="text-[2.5rem] font-bold mb-4 text-white">熱門電影</h2>
    <MovieCarousel :popularMovies="popularMovies" />
  </div>
</template>

<script setup>
import MovieCarousel from '@/components/MovieCarousel.vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useMovieStore()
const { getPopularMovies } = store
const { popularMovies, isLoading } = storeToRefs(store)



onMounted(async () => {
  await getPopularMovies()
})
</script>

<style scoped>
/* 可選：添加基本樣式 */
div {
  text-align: center;
  padding: 20px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
p {
  margin-top: 20px;
  font-size: 18px;
}
</style>
