<template>
    <div class="article-container" @scroll="handleScroll($event, setActiveMenu)">
    <div class="operate-card">
      <div class="like" :class="{'active' : likeStatus }" @click="changeLikeStatus">
        <i class="iconfont icon-upvote"></i>
        <div class="like-num" v-show="likeNum !== 0">{{ likeNum }}</div>
      </div>
      <div class="comment" @click="scrollComment">
        <i class="iconfont icon-comment"></i>
        <div class="comment-num" v-show="commentList.length !== 0">{{ commentList.length }}</div>
      </div>
    </div>
    <div class="article-wrap">
      <div class="article-main card">
        <div class="article-title">{{article?.article_title}}</div>
        <div class="article-info">
          <span class="article-time">{{formatDate(article?.create_time, 'YYYY-MM-DD hh:mm:ss')}}</span>
          <span class="iconfont icon-view mr-10"></span>
          <span>{{ article?.article_view }}</span>
        </div>
        <div class="article-content markdown-body" v-html="addIndexToHtml(content)"></div>
      </div>
      <comment @submit="submitComment" :commentList="commentList"/>
    </div>
    <div class="article-minor">
      <AuthorCard />
      <div class="article-menu card">
        <a class="menu-item" v-for="(item, i) in menu" :key="i" :href="`#article-menu_${i + 1}`" :class="{active: i === activeMenuIndex}" :style="setMenuStyle(item)">{{ item.content }}</a>
      </div>
    </div>
    <div class="article-operate">
      <div class="item"  :class="{'active' : likeStatus }"  @click="changeLikeStatus">
        <i class="iconfont icon-upvote"></i>
        <span v-show="likeNum !== 0">{{ likeNum }}</span>
      </div>
      <div class="item" @click="scrollComment">
        <i class="iconfont icon-comment"></i>
        <span>{{ commentList.length }}</span>
      </div>
    </div>
  </div>
  </template>
<script setup>
  import axios from 'axios'
  import useArticleMenu from '@/hook/article/useArticleMenu'
  import useScrollAnchor from '@/hook/common/useScrollAnchor'
  import useCollect from '@/hook/common/useCollect'
  import { formatDate } from '@/utils/common'
  import { apiHost } from '@/utils/envConfig'
  

const route = useRoute()

  const id = route.params.id

  const content = useState('content', () => null)
  const article = useState('article', () => null)
  const likeStatus = useState('likeStatus', () => 0)
  const likeNum = useState('likeNum', () => 0)
  const commentList = useState('comment', () => [])
  const { getUserId } = useCollect()
  const userId = useState('userId', () => '')
  const { menu, activeMenuIndex, setMenuStyle, getArticleMenu, setActiveMenu, addIndexToHtml } = useArticleMenu()
  const { handleScroll } = useScrollAnchor('h', 'article-menu_')

  const submitComment = async ({ avatar, content }) => {
    const nickname = await getUserId()
    const params = {
      avatar,
      content,
      nickname,
      article_id: id,
      create_time: +new Date(),
      isAuthor: 0
    }
    await axios.post(`${apiHost}/comment/addComment`, params)
    await getCommentList()
  }
  
  const scrollComment = () => {
    const comment = document.querySelector('.article-comment')
    comment?.scrollIntoView()
  }

  const getCommentList = async () => {
    const { data:res1 } = await axios.get(`${apiHost}/comment/getCommentList?id=${id}`)
    commentList.value = res1.data.commentList
  }

  const initLikeData = async () => {
    userId.value = await getUserId()
    const userRes = await axios.get(`${apiHost}/like/getLikeToUserId?article_id=${id}&user_id=${userId.value}`)
    const articleRes = await axios.get(`${apiHost}/like/getLikeToId?id=${id}`)
    likeStatus.value = userRes.data.data.status
    likeNum.value = articleRes.data.data.total
  }

  const changeLikeStatus =  async () => {
    await axios.post(`${apiHost}/like/changeLikestatus`, {
      article_id: id,
      user_id: userId.value,
      status: !likeStatus.value
    })
    // likeStatus.value = !likeStatus.value
    await initLikeData()
  }

  onMounted(async () => {
    getArticleMenu(content.value)
    // await initLikeData()
  })

  onServerPrefetch(async () => {
    const { data:res } = await axios.get(`${apiHost}/article/getArticleDetail?id=${id}`)
    content.value = res.data.content
    article.value = res.data.article
    getArticleMenu(content.value)
    await getCommentList()
  })
</script>
<style scoped lang='scss'>
  .article-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: calc(100vh - 64px);
    padding: 20px 200px;
    box-sizing: border-box;
    overflow-y: scroll;
    .operate-card {
      margin-top: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 120px;
      .like, .comment {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        padding: 10px;
        background: #fff;
        color: #989EBE;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(50,50,50,.2);
        box-sizing: border-box;
        &-num {
          position: absolute;
          top: 0;
          right: -15px;
          background-color: #fa8072;
          color: #fff;
          border-radius: 10px;
          padding: 3px 6px;
          font-size: 14px;
        }
        &.active {
          color: #fa8072;
        }
        &:hover {
          cursor: pointer;
          color: #808080;
        }
        .icon-upvote {
          font-size: 28px;
        }
        .icon-comment {
          font-size: 28px;
        }
      }
      .comment {
        margin-top: 20px;
      }
    }
    .article-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      flex-shrink: 0;
      max-width: 850px;
      transition: width 0.5s;
      @include bg_color();
      .article-main {
        padding: 30px;
        box-sizing: border-box;
      }
      .article-title {
        @include font_color(1);
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 28px;
      }
      .article-info {
        margin: 15px 0;
        font-size: 14px;
        color: #515767;
        .article-time {
          margin-right: 15px;
        }
        .mr-10 {
          margin-right: 10px;
        }
      }
    }
    .article-minor {
      position: sticky;
      top: 0;
      flex-shrink: 0;
      width: 200px;
      height: auto;
      padding-left: 20px;
    }
    .article-menu {
      margin-top: 20px;
      padding: 20px;
      background-color: #fff;
      box-sizing: border-box;
      .menu-item {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        &.active {
          color: #FE6865 !important;
          font-weight: bold;
        }
        &:hover {
          cursor: pointer;
          color: #fa8072 !important;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .article-operate {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding-bottom: calc(constant(safe-area-inset-bottom)); /* 兼容 iOS < 11.2 */
      padding-bottom: calc(env(safe-area-inset-bottom)); /* 兼容 iOS >= 11.2 */
      display: none;
      @include bg_color();
      @include font_color(1);
      height: 54px;
      border-top: 1px solid #e4e6eb;
      @include border_color(1);
      box-sizing: border-box;
      align-items: center;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        &.active {
          .iconfont {
            color: #fa8072;
          }
        }
        .iconfont {
          margin-right: 15px;
          font-size: 20px;
          color: #515767;
        }
      }
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 60%;
        width: 1px;
        background-color: #ccc;
      }
    }
  }
</style>