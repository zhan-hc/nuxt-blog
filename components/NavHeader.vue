<template>
  <div class="nav-header">
    <NuxtLink :to="`${pageHost}`" class="header-left">
      <img class="logo" src="http://oss.janus-c.top/logo/logo.svg" alt=""/>
      <span class="author">前端笨鸟</span>
    </NuxtLink>
    <div class="header-search">
      <input type="text" v-model="searchVal" placeholder="请输入关键字..." @keyup.enter="onSearch"/>
      <div class="search-right" @click="onSearch">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <i class="theme iconfont" :class="isDark ? 'icon-dark' : 'icon-light'" @click="toggleDark()" style="font-size: 20px"></i>
    <div class="header-tags">
      <NuxtLink  :to="`${pageHost}`" class="tag">Home</NuxtLink >
      <NuxtLink  :to="`${pageHost}/nav`" class="tag">Nav</NuxtLink >
      <NuxtLink  :to="`${pageHost}/project`" class="tag">Project</NuxtLink >
      <!-- <i class="iconfont icon-expand" @click="expandStatus = true"></i> -->
    </div>
  </div>
  <div class="nav-fill"></div>
</template>

<script lang='ts' setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { useDark, useToggle } from '@vueuse/core'
  import { pageHost } from '@/utils/envConfig'

  const router = useRouter()
  const expandStatus = ref(false)
  const searchVal = ref('')
  
  const isDark = useDark({
    storageKey: 'janus-blog-theme',
    attribute: 'data-theme',
    valueDark:'dark',
    valueLight:'light'
  })

  const toggleDark = () => {
    isDark.value = isDark.value ? false : true;
  }
  const onSearch = () => {
    location.href = `${pageHost}/search?keyword=${searchVal.value}`
    searchVal.value = ''
  }

</script>

<style scoped lang='scss'>
  .nav-header {
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 64px;
    padding: 8px 32px;
    @include bg_color();
    box-shadow: $box-shadow;
    box-sizing: border-box;
    .iconfont {
      @include font_color(1);
    }
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        cursor: pointer;
      }
      .author {
        flex-shrink: 0;
        font-size: 20px;
        font-weight: bold;
        color: $primary-color;
        letter-spacing: 3px;
      }
      .logo {
        width: 52px;
        height: 52px;
        margin-right: 10px;
      }
    }
    .theme {
      margin-right: 20px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
    .header-search {
      display: flex;
      align-items: center;
      height: 34px;
      min-width: 120px;
      margin-right: 30px;
      border-radius: 20px;
      padding-left: 2px;
      box-sizing: border-box;
      background-color: $blog-color-gray-4;
      transition: all .6s;
      overflow: hidden;
      input {
        height: 30px;
        padding-left: 10px;
        border: none;
        background-color: $blog-color-gray-4;
        border-radius: 20px 0 0 20px;
        font-size: 14px;
        -webkit-appearance: none; //去掉input 在iOS中的默认圆角和内阴影
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); //去掉点击时高亮的样式
        &:focus {
          outline-color: $primary-color;
        }
      }
      .search-right {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 10px 0 8px;
        background-color: $primary-color;
        border-radius: 0 20px 20px 0;
        box-sizing: border-box;
      }
      .icon-search {
        color: #fff;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .header-tags {
      display: flex;
      .tag {
        font-weight: bold;
        @include font_color(0);
        margin-right: 20px;
        text-decoration: none;
        &.router-link-exact-active {
          color: $primary-color;
        }
        &:hover {
          cursor: pointer;
          color: $primary-color-sub;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
      .icon-expand {
        display: none;
        font-size: 24px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .author-wrap {
    margin: auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  .nav-list {
    display: flex;
    flex-direction: column;
    @include font_color(1);
    .tag {
      padding: 10px 10px;
      font-weight: bold;
      .iconfont {
        margin-right: 10px;
      }
      &.router-link-exact-active {
        color: $primary-color-sub;
        .iconfont {
          color: $primary-color-active;
        }
      }
      &:hover {
        cursor: pointer;
        color: $primary-color-active;
      }
    }
  }
  .nav-fill {
    height: 64px;
  }
  @keyframes expand {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }
  .slide-fade-enter-active {animation: expand .2s ease-in; transition: all 0.5s ease-out;}
  
</style>