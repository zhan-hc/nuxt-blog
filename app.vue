<template>
  <div class="app-container">
    <NavHeader />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  @include bg_image();
  background-size: 50px 50px;
}
</style>
