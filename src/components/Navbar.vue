<template>
  <a-flex class="container" justify="space-between">
    <h2 class="title">Movie Buff</h2>
    <a-flex gap="middle" justify="end">
      <RouterLink
        class="link"
        v-for="item in LIST"
        :key="item.path"
        :to="item.path"
      >
        {{ item.name }}
      </RouterLink>
    </a-flex>
  </a-flex>
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

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 1.5rem;
}
.title {
  color: #fff;
  padding: 0.5rem;
  margin-bottom: 0px;
}
.link {
  padding: 0.5rem;
  font-size: 1.25rem;
  //   font-weight: 200;
  color: #fff;
}
</style>
