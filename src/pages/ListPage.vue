<template>
  <div class="container relative">
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :loop="true"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2"
    >
      <swiper-slide>
        <div>
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${videoData.key}?rel=0&modestbranding=1`"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe></div></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :loop="true"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <img
          :src="`https://img.youtube.com/vi/${videoData.key}/hqdefault.jpg`"
          alt="Video Thumbnail"
        />
      </swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<!-- <script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
 import 'swiper/css';
const onSwiper = (swiper) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}
</script> -->

<script setup>
import { ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, Thumbs } from 'swiper/modules'

const thumbsSwiper = ref(null)
const videoData = ref({
  iso_639_1: 'en',
  iso_3166_1: 'US',
  name: 'What Time Is It?',
  key: 'f8T4mmUJF6A',
  site: 'YouTube',
  size: 1080,
  type: 'Teaser',
  official: true,
  published_at: '2025-07-17T18:00:40.000Z',
  id: '687990cd268343956855bfff',
})

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const modules = ref([Autoplay, Pagination, Navigation, Thumbs])
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
