<template>
  <div v-if="!isLoadingDetail">
    <el-dialog
      @close="close"
      :model-value="!!currentMovieId"
      class="custom-transition-dialog"
      width="30%"
    >
      <div class="flex space-x-4">
        <div>
          <img
            :src="`${IMG_BASE_URL}/${IMG_SIZE.infoModal}/${selectedMovie.poster_path} `"
            alt=""
          />
        </div>
        <div>
          <h3>{{ selectedMovie?.title }}</h3>
          <ul>
            <li v-for="(config, key) in SOCIAL_CONFIG" :key="key">
              <a
                v-if="selectedMovie.socialNetworkIds[key]"
                :href="`${config.url}/${selectedMovie.socialNetworkIds[key]}`"
                target="_blank"
              >
                <img :src="config.icon" :alt="key" />
              </a>
            </li>
          </ul>
          <div>片長: {{ selectedMovie?.runtime }}分鐘</div>

          <ul>
            <li v-for="genre in selectedMovie?.genres" :key="genre.id">
              <el-tag type="info">{{ genre.name }}</el-tag>
            </li>
          </ul>
          <div>上映時間: {{ selectedMovie?.release_date }}</div>
          <div>電影簡介: {{ selectedMovie?.overview }}</div>
          <div>
            觀眾評分：
            {{ Math.trunc(selectedMovie?.vote_average) }} / 10
          </div>
          <div>
            演員陣容:
            {{ actors }}
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close"> Confirm </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, defineProps, watch } from 'vue'
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
  currentMovieId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['update:currentMovieId'])

const close = () => {
  emit('update:currentMovieId', null)
}

watch(
  () => props.currentMovieId,
  async (newMovieId) => {
    if (newMovieId) {
      await getMovieDetail(newMovieId)
      console.log(`selectedMovie`, selectedMovie.value)
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>
