<template>
    <div class="article-container" @scroll="handleScroll($event, setActiveMenu)">
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
  </div>
  </template>
<script setup>
  import axios from 'axios'
  import useArticleMenu from '@/hook/article/useArticleMenu'
  import useScrollAnchor from '@/hook/common/useScrollAnchor'
  import useCollect from '@/hook/common/useCollect'
  import { formatDate } from '@/utils/common'

  const content = useState('content', () => null)
  const article = useState('article', () => null)
  const commentList = useState('comment', () => [])
  const { getUserId } = useCollect()
  const { menu, activeMenuIndex, setMenuStyle, getArticleMenu, setActiveMenu, addIndexToHtml } = useArticleMenu()
  const { handleScroll } = useScrollAnchor('h', 'article-menu_')

  const submitComment = async ({ avatar, content }) => {
    const nickname = await getUserId()
    const params = {
      avatar,
      content,
      nickname,
      article_id: articleId,
      create_time: +new Date(),
      isAuthor: 0
    }
    await axios.post('http://43.138.89.227:3000/comment/addComment', params)
    await getCommentList()
  }

  const getCommentList = async () => {
    const { data:res1 } = await axios.get(`http://43.138.89.227:3000/comment/getCommentList?id=1`)
    commentList.value = res1.data.commentList
  }

  onMounted(() => {
    getArticleMenu(content.value)
  })

  onServerPrefetch(async () => {
    const { data:res } = await axios.get(`http://43.138.89.227:3000/article/getArticleDetail?id=1`)
    content.value = res.data.content
    article.value = res.data.article
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
    .article-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      flex-shrink: 0;
      .article-main {
        padding: 30px;
        box-sizing: border-box;
      }
      .article-title {
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
      box-sizing: border-box;
      .menu-item {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        &.active {
          color: #1E90FF !important;
          font-weight: bold;
        }
        &:hover {
          cursor: pointer;
          color: #49b1f5 !important;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>