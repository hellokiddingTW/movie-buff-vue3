<template>
  <div class="container">
    <h2 class="text-[2.5rem] text-center font-bold mb-4 mt-5 text-white">即將上映</h2>
    <div
      v-loading="isLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="載入中..."
      class="w-full min-h-1/2"
    >
      <ul
        v-show="!isLoading"
        class="grid grid-cols-4 gap-4 gap-y-6 place-items-center px-15 py-5 overflow-y-auto"
      >
        <li v-for="movie in upComingMovies" :key="movie.id" @click="onOpenModal(movie.id)">
          <div class="group">
            <div class="relative mb-2.5">
              <img
                class="transition-all duration-300"
                :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                alt=""
              />
              <div
                class="absolute hidden inset-0 bg-black/0 group-hover:bg-black/50 group-hover:cursor-pointer transition-all duration-300 group-hover:flex items-center justify-center text-white text-lg font-bold"
              >
                查看詳情
              </div>
            </div>
            <div>
              <h3 class="titleSize text-white m-0 font-weight-bold">
                {{ movie.original_title }}
              </h3>
              <span class="text-white mt-1 text-[0.75rem]">
                {{ movie.release_date }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <MovieInfoModal v-model:currentMovieId="currentMovieId" />
  </div>
</template>

<!-- 要改成無限滾動 -->

<script setup>
import MovieInfoModal from '@/components/MovieInfoModal.vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const MAXPAGE = 10
const currentMovieId = ref(null)

const store = useMovieStore()
const { fetchAllUpComingMovies } = store
const { upComingMovies, isLoading } = storeToRefs(store)

const onOpenModal = (id) => {
  currentMovieId.value = id
}

onMounted(async () => {
  fetchAllUpComingMovies(MAXPAGE)
})
</script>

<style lang="scss" scoped></style>
