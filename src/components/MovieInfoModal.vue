<template>
  <div v-if="!isLoadingDetail">
    <el-dialog
      @close="close"
      :model-value="!!currentModal.id"
      class="custom-transition-dialog !bg-[#ffffff]/20 backdrop-blur"
      width="70%"
    >
      <div class="grid grid-cols-6 gap-4 text-start p-5">
        <div class="col-span-2">
          <img
          class="rounded-sm"
            :src="`${IMG_BASE_URL}/${IMG_SIZE.infoModal}/${selectedMovie.poster_path} `"
            alt=""
          />
        </div>
        <div class="col-span-4 grid gap-y-3 text-white">
          <h3 class="text-3xl font-bold text-white">{{ selectedMovie?.title }}</h3>
          <ul class="flex space-x-1.5">
            <li v-for="(config, key) in socialLinks" :key="key">
              <a
                :href="`${config.url}/${selectedMovie.socialNetworkIds[key]}`"
                target="_blank"
              >
                <img :src="config.icon" class="w-6 h-6" :alt="key" />
              </a>
            </li>
          </ul>
          <div>片長： {{ selectedMovie?.runtime }}分鐘</div>

          <ul class="flex space-x-1.5">
            類型：
            <li v-for="genre in selectedMovie?.genres" :key="genre.id">
              <el-tag class="!text-[#000] !text-[0.75rem]" size="small" type="info">{{ genre.name }}</el-tag>
            </li>
          </ul>
          <div>上映時間： {{ selectedMovie?.release_date }}</div>
          <div>劇情簡介： 
            <p>{{ selectedMovie?.overview }}</p>
            </div>
          <div>
            演員陣容:
            <p>{{ actors }}</p>
          </div>
          <div>
            觀眾評分：
            {{ Math.trunc(selectedMovie?.vote_average) }} / 10
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useMovieStore } from '@/store/useMovieStore.js'
import { storeToRefs } from 'pinia'
import { IMG_BASE_URL, IMG_SIZE } from '@/consts/image.js'

import facebookIcon from '@/assets/icons/facebookIcon.png'
import instagramIcon from '@/assets/icons/instagramIcon.png'
import twitterIcon from '@/assets/icons/twitterIcon.png'
import imdbIcon from '@/assets/icons/imdbIcon.png'

const SOCIAL_CONFIG = {
  facebook_id: { icon: facebookIcon, url: 'https://facebook.com' },
  instagram_id: { icon: instagramIcon, url: 'https://instagram.com' },
  twitter_id: { icon: twitterIcon, url: 'https://twitter.com' },
  imdb_id: { icon: imdbIcon, url: 'https://imdb.com/title' },
}

const store = useMovieStore()
const { getMovieDetail } = store
const { selectedMovie, isLoadingDetail } = storeToRefs(store)

const actors = computed(() => selectedMovie.value?.actors?.slice(0, 5).join(' / ') ?? [])
const props = defineProps({
  currentModal: {
    type: Object,
    default: {},
  },
})

const socialLinks = computed(() => {
  const movie = selectedMovie.value;
  if (!movie?.socialNetworkIds) return {};
  return Object.fromEntries(
    Object.entries(SOCIAL_CONFIG).filter(([key]) => {
      return movie.socialNetworkIds[key];
    })
  );
});

const emit = defineEmits(['update:currentModal'])

const close = () => {
  emit('update:currentModal', {})
}

watch(
  () => props.currentModal,
  async (newValue) => {
    if (newValue.id) {
      await getMovieDetail(newValue.id)
      console.log(`selectedMovie`, selectedMovie.value)
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>
