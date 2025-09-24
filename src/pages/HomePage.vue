<template>
  <div v-show="!isLoading">
    <MovieCarousel :popularMovies="popularMovies"  />
  </div>
</template>

<script setup>
import MovieCarousel from '@/components/MovieCarousel.vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

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
