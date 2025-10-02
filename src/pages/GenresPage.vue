<template>
  <div class="container">
    <div>Banner</div>
    <div class="flex items-center space-x-4">
      <el-select
        popper-class="!bg-[#111827B3] !font-bold border-none backdrop-blur-md"
        v-model="selectedOption"
        multiple
        clearable
        value-key="id"
        placeholder="請選擇電影類型"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item" />
      </el-select>
      <Search class="search-icon" @click="handleSerch" />
    </div>
    <div class="space-y-5">
      <MovieGallery v-for="genre in searchList" :genre="genre" />
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
  searchList.value = selectedOption.value
}

watch(selectedOption, () => {
  console.log(selectedOption.value)
})
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 40%;
}

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
