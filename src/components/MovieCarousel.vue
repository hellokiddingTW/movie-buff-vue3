<template>
  <div>
    <el-carousel height="600px" trigger="click" indicator-position="none">
      <el-carousel-item v-for="movie in popularMovies" :key="movie.id">
        <div class="flex justify-center w-full h-full">
          <div class="movieCarousel">
            <div
              class="movieBg flex items-end space-x-8 p-5"
              :style="{
                backgroundImage: movie.backdrop_path
                  ? `url(${imageBaseUrl}${imageSize}${movie.backdrop_path})`
                  : 'none',
              }"
            >
              <div>
                <img
                  @click="onOpenModal(movie.id)"
                  class="w-32 aspect-[2/3] hover:w-48 hover:cursor-pointer transition-all duration-300"
                  :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
                  alt=""
                />
              </div>

              <div class="space-y-2">
                <h3 class="text-4xl font-bold w-full">{{ movie.title }}</h3>
                <div>
                  <p class="text-3xl text-white">
                    觀眾評分：
                    {{ Math.trunc(movie.vote_average) }} / <span>10</span>
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <MovieInfoModal v-model:currentMovieId="currentMovieId" />
  </div>
</template>

<script setup>
import MovieInfoModal from '@/components/MovieInfoModal.vue'
import { computed, defineProps } from 'vue'

const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/'
const imageSize = 'w1920_and_h800_multi_faces'

const currentMovieId = ref(null)


const props = defineProps({
  popularMovies: {
    type: Array,
    required: true,
  },
})


const onOpenModal = (id) => {
  currentMovieId.value = id
}
</script>

<style lang="scss" scoped>
p,
h2 {
  margin: 0;
}

.movieCarousel {
  background-size: cover;
  aspect-ratio: 16 / 9;
  max-width: 60rem;
  color: #fff;
  text-align: left;
  display: flex;
  .movieBg {
    border-radius: 0.625rem;
    background: center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 50%,
        rgba(0, 0, 0, 0.3) 70%,
        rgba(0, 0, 0, 0.8) 100%
      );
      border-radius: 0.625rem;
      z-index: 1;
    }
    > * {
      position: relative;
      z-index: 2;
    }
  }
}
</style>
