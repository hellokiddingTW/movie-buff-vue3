<template>
  <div class="text-white">
    <h3 class="text-xl font-bold pt-5 bt">{{ genre.label }}</h3>
    <ul v-loading="isLoading" element-loading-text="載入中..." element-loading-background="transparent" :class="`flex p-4 overflow-y-auto space-x-5 ${isLoading && 'h-[23.3125rem]'}`">
      <li
        v-for="movie in movies"
        :key="movie.id"
        :class="`${
          selectedMovieId === movie.id
            ? 'ring-3 ring-slate-300 shadow-2xl shadow-slate-300/50 rounded-sm'
            : ''
        } p-1 hover:cursor-pointer`"
        @click="handleClickMovie(movie.id)"
      >
        <div class="w-[12.5rem] mb-2">
          <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="" />
        </div>
        <div class="w-[12.5rem] truncate">{{ movie.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { onMounted } from 'vue'

const movies = ref([])
const selectedMovieId = ref(null)

const store = useMovieStore()
const { fetchAllUpComingMovies } = store

const handleClickMovie = (movieId) => {
  selectedMovieId.value = movieId
}

const isLoading = computed(() => {
  return movies.value.length === 0
})

const props = defineProps({
  genre: {
    type: Object,
    required: true,
  },
})

onMounted(async () => {
  movies.value = await fetchAllUpComingMovies(3, { type: 'genre', params: props.genre.id })
})
</script>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
