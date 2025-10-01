<template>
  <div class="container">
    <div>Banner</div>
    <div>
      <el-select v-model="selectedOption" multiple placeholder="Select">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
    </div>
    <div>
      <MovieGallery
        :genre="{
          id: 28,
          name: 'Action',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import MovieGallery from '@/components/MovieGallery.vue'
import { MOVIE_GENRES } from '@/consts/movie'
import { ref } from 'vue'

const selectedOption = ref([])
const options = Object.keys(MOVIE_GENRES).map((key) => {
  return {
    id: key,
    label: MOVIE_GENRES[key],
  }
})
</script>

<style lang="scss" scoped></style>
