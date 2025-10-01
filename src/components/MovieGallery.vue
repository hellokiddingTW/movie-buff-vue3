<template>
  <div>
    <ul  class="flex overflow-auto">
      <li v-for="movie in movies" :key="movie.id">
        <div><img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="" /></div>
        <div>{{ movie.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const movies = ref([])

const store = useMovieStore()
const { fetchAllUpComingMovies } = store
const { isLoading } = storeToRefs(store)

const props = defineProps({
  genre: {
    type: Object,
    required: true,
  },
})

onMounted(async () => {
  movies.value = await fetchAllUpComingMovies(3, { type: 'genre', params: props.genre.id })
  console.log(`movies`, movies.value)
})
</script>

<style lang="scss" scoped></style>
