<template>
  <div>
    <div class="nav-header">
    <NuxtLink :to="`${pageHost}`" class="header-left">
      <img class="logo" src="http://43.138.89.227/logo.svg" alt=""/>
      <span class="author">前端笨鸟</span>
    </NuxtLink>
    <div class="header-tags">
      <NuxtLink  :to="`${pageHost}`" class="tag">Home</NuxtLink >
      <NuxtLink  :to="`${pageHost}/nav`" class="tag">Nav</NuxtLink >
      <i class="iconfont icon-expand" @click="expandStatus = true"></i>
    </div>
  </div>
  <div class="nav-fill"></div>
  <Transition name="slide-fade">
    <div v-show="expandStatus" ref="header" class="header-expand">
      <NuxtLink  :to="`${pageHost}`" class="tag" @click.stop="toggleExpand">
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </NuxtLink >
      <NuxtLink  :to="`${pageHost}/nav`" class="tag" @click.stop="toggleExpand">
        <i class="iconfont icon-menu"></i>
        <span>Nav</span>
      </NuxtLink >
    </div>
  </Transition>
  </div>

</template>

<script lang='ts' setup>
  import { Ref, ref } from "vue"
  import { onClickOutside } from '@vueuse/core'
  import { pageHost } from '@/utils/envConfig'
  const expandStatus = ref(false)
  const header:Ref<HTMLElement|null> = ref(null)
  const toggleExpand = () => {
    expandStatus.value = !expandStatus.value
  }
  onClickOutside(header, () => { expandStatus.value = false })

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
    justify-content: space-between;
    height: 64px;
    padding: 8px 32px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
    .header-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .author {
        font-size: 20px;
        font-weight: bold;
        color: #fa8072;
        letter-spacing: 3px;
      }
      .logo {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }
    .header-tags {
      display: flex;
      .tag {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.6);
        margin-right: 20px;
        text-decoration: none;
        &:hover {
          cursor: pointer;
          color: #f08080;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
      .icon-expand {
        display: none;
        font-size: 24px;
        color: #696969;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .header-expand {
    z-index: 2;
    position: absolute;
    top: 56px;
    width: 100%;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
    .iconfont {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.5);
    }
    .tag {
      display: block;
      padding: 10px 10px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.5);
      &:hover {
        cursor: pointer;
        color: #f08080;
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
