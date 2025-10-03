<template>
  <div class="w-full flex justify-between items-center p-6">
    <h1 class="text-white text-[2rem] p-2 bt">M o v i e B u f f</h1>
    <div class="flex">
      <RouterLink
        class="text-[1.25rem] p-2 text-white bt nav-link relative hover:cursor-pointer hover:text-[#409eff]"
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
  { name: 'Genres', path: '/genres' },
  {
    name: 'List',
    path: '/list',
  },
]
</script>

<style lang="scss" scoped>
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #409eff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.nav-link:hover::after {
  transform: scaleX(1);
}
</style>
