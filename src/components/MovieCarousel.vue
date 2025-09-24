<template>
  <div>
    <a-carousel :dots="false">
      <div class="movieCarousel" v-for="movie in popularMovies" :key="movie.id">
        <a-flex>
          <img :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" alt="" />
          <a-flex vertical>
            <h3 class="movieTitle">{{ movie.title }}</h3>
            <a-flex :justify="flex - start">
              <p class="movieScore">
                觀眾評分：
                {{ movie.vote_average }} / <span>10</span>
              </p>
            </a-flex>
          </a-flex>
          <div></div>
        </a-flex>
      </div>
    </a-carousel>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  popularMovies: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
// :deep(.slick-slide) {
//   text-align: center;
//   height: 160px;
//   line-height: 160px;
//   background: #364d79;
//   overflow: hidden;
// }

// :deep(.slick-slide h3) {
//   color: #fff;
// }

.movieCarousel {
  border-radius: 0.625rem;
  background: center center no-repeat;
  background-size: cover;
  aspect-ratio: 16 / 9;
  max-width: 60rem;
  position: relative;
  color: #fff;
  .movieTitle {
    font-size: 40px;
    font-weight: bold;
    width: 100%;
  }

  .movieScore {
    font-size: 32px;
    color: #fff;
    span {
      font-size: 24px;
    }
  }
  //   .menu {
  //     color: #fff;
  //     opacity: 0.6;
  //     position: fixed;
  //     span {
  //       font-size: 2.5rem;
  //     }
  //     &:hover {
  //       color: #000;
  //     }
  //   }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 300px;
    // background-color: #000000;
    left: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, transparent 30%, black, black);
  }

  .movieCard {
    margin-bottom: -80px;
    z-index: 9999;
    img {
      &:hover {
        width: 200px;
        cursor: pointer;
      }
    }
    .cardTitle {
      font-size: 40px;
      font-weight: 2000;
      // background-color: #000000e6;
      width: 100%;
    }
    .movieScore {
      font-size: 32px;
      span {
        font-size: 24px;
      }
    }
    .cardContent {
      font-size: 20px;
    }
    .cardImage {
      width: 125px;
    }
  }
}
</style>
