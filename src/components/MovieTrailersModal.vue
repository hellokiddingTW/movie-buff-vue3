<template>
  <div v-if="!!currentModal.id">
    <el-dialog
      @close="close"
      :model-value="!!currentModal.id"
      class="custom-transition-dialog !bg-[#ffffff]/20 backdrop-blur"
      width="70%"
    >
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :loop="videos.length > 4"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2 p-5"
      >
        <swiper-slide v-for="videoData in videos">
          <div class="w-full h-full">
            <iframe
              width="100%"
              height="100%"
              :src="`https://www.youtube.com/embed/${videoData.key}?rel=0&modestbranding=1`"
              frameborder="0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe></div
        ></swiper-slide>
      </swiper>
      <swiper
        @swiper="setThumbsSwiper"
        :loop="movieTrailers.length > 4"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="videoData in videos">
          <img
            :src="`https://img.youtube.com/vi/${videoData.key}/hqdefault.jpg`"
            alt="Video Thumbnail"
          />
        </swiper-slide>
      </swiper>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, Thumbs } from 'swiper/modules'
import { storeToRefs } from 'pinia'

const store = useMovieStore()
const { getMovieTrailer } = store
const { movieTrailers } = storeToRefs(store)

const modules = ref([Autoplay, Pagination, Navigation, Thumbs])

const videos = computed(() => movieTrailers.value.slice(0, 10))

const props = defineProps({
  currentModal: {
    type: Object,
    default: {},
  },
})

const thumbsSwiper = ref(null)

const emit = defineEmits(['update:currentModal'])

const close = () => {
  emit('update:currentModal', {})
}

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

watch(
  () => props.currentModal,
  async (newValue) => {
    console.log(`newMovieId`, newValue)
    if (newValue.id) {
      await getMovieTrailer(newValue.id)
      console.log(`movieTrailers`, movieTrailers.value)
    }
  },
  { immediate: true },
)
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
  height: 27rem;
  width: 100%;
  margin-top: 1rem;
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
