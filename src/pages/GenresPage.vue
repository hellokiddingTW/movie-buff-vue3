<template>
  <div class="container relative min-h-[calc(100vh-12.5rem)]">
    <div       
    :class="[
        'selectContainer transition-all duration-700 ease-in-out transform w-[40%]',
        selectedOption.length === 0
          ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-110'
          : 'absolute left-[7.5rem] top-8 translate-x-0 translate-y-0 scale-100'
      ]">
      <el-select
        append-to=".selectContainer"
        popper-class="!bg-[#111827B3] !font-bold border-none backdrop-blur-md"
        v-model="selectedOption"
        multiple
        clearable
        value-key="id"
        placeholder="請選擇電影類型"
        @clear="handleClear"
        @remove-tag="handleSerch"
        @change="handleSerch"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item" />
      </el-select>
    </div>
    <div class="space-y-5 pt-20">
      <MovieGallery v-for="genre in searchList" :genre="genre" :key="genre.id" />
    </div>
  </div>
</template>

<script setup>
import MovieGallery from '@/components/MovieGallery.vue'
import { MOVIE_GENRES } from '@/consts/movie'
import { ref, watch } from 'vue'

const selectedOption = ref([])
const searchList = ref([])

const options = Object.keys(MOVIE_GENRES).map((key) => {
  return {
    id: key,
    label: MOVIE_GENRES[key],
  }
})

const handleSerch = () => {
  searchList.value = [...selectedOption.value]
}

const handleClear = () => {
  searchList.value = []
}



watch(selectedOption, () => {
  console.log(selectedOption.value)
})
</script>

<style lang="scss" scoped>
/* :deep(.el-select) {
  width: 40%;
} */

:deep(.el-input__inner),
:deep(.el-select__wrapper) {
  background-color: #111827b3;
  color: #ffffff;
  border: none;
}

:deep(.el-select__wrapper) {
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  min-height: 40px;
}

:deep(.el-select__selection) {
  padding: 0 0.625rem;
}

.search-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #ffffff;
  margin-right: 8px;
  transition: all 0.3s ease; /* 添加平滑過渡 */
  &:hover {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
