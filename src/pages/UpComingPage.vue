<template>
  <div class="container" v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <ul class="grid grid-cols-4 gap-4 gap-y-6 place-items-center px-15 overflow-y-auto">
      <li v-for="movie in upComingMovies" :key="movie.id" >
        <div>
          <img class=" mb-2.5 hover:opacity-70 hover:cursor-pointer transition-all duration-300" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt=""  />
          <div>
            <h3 class="titleSize text-white m-0 font-weight-bold">
              {{ movie.original_title }}
            </h3>
            <span class="text-white mt-1 text-[0.75rem]">{{ movie.release_date }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const MAXPAGE = 10

const store = useMovieStore()
const { fetchAllUpComingMovies } = store
const { upComingMovies, isLoading } = storeToRefs(store)

onMounted(async () => {
  fetchAllUpComingMovies(MAXPAGE)
})
</script>

<style lang="scss" scoped></style>
