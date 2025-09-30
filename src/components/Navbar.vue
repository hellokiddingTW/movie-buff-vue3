<template>
  <div class="w-full flex justify-between p-6">
    <h2 class="text-white p-2">Movie Buff</h2>
    <div class="flex">
      <RouterLink
        class="text-[1.25rem] p-2 text-white"
        v-for="item in LIST"
        :key="item.path"
        :to="item.path"
      >
        {{ item.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const LIST = [
  {
    name: 'Home',
    path: '/',
  },
  { name: 'UpComing', path: '/upComing' },
  { name: 'NowPlaying', path: '/nowPlaying' },
  {
    name: 'List',
    path: '/list',
  },
]
</script>

<style lang="scss" scoped></style>
