<template>
  <div class="app-container">
    <NavHeader />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
<style scoped lang="scss">
.app-container {
  @include bg_image();
  background-size: 50px 50px;
}
</style>
