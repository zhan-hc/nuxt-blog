<template>
  <div class="article-container">
    <div class="article-wrap">
      <div class="operate-card">
        <div class="like" :class="{'active' : like.status }" @click="handleLike">
          <i class="iconfont icon-upvote"></i>
          <div class="like-num" v-show="like.num !== 0">{{ like.num }}</div>
        </div>
        <div class="comment" @click="scrollComment">
          <i class="iconfont icon-comment"></i>
          <div class="comment-num" v-show="commentList.length !== 0">{{ commentList.length }}</div>
        </div>
      </div>
      <div class="article-main card">
        <div class="article-title">{{article.data?.article_title}}</div>
        <div class="article-info">
          <span class="article-time">{{formatDate(article.data?.create_time)}}</span>
          <span class="iconfont icon-view mr-10"></span>
          <span>{{ article.data?.article_view }}</span>
        </div>
        <div class="article-content markdown-body" v-html="article.content"></div>
      </div>
      <comment @submit="submitComment" :commentList="commentList"></comment>
    </div>
    <div class="article-minor">
      <AuthorCard />
      <ja-anchor class="card article-anchor" container=".article-container">
        <ja-anchor-link :href="`#${item.title}`" :title="item.title" v-for="(item, i) in anchorLinks" :key="i"></ja-anchor-link>
      </ja-anchor>
    </div>
    <div class="article-operate">
      <div class="item"  :class="{'active' : like.status }"  @click="handleLike">
        <i class="iconfont icon-upvote"></i>
        <span v-show="like.num !== 0">{{ like.num }}</span>
      </div>
      <div class="item" @click="scrollComment">
        <i class="iconfont icon-comment"></i>
        <span>{{ commentList.length }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { formatDate, getUserId } from '@/utils/common'
import { getArticleDetail, toggleLike, getLikeTotal, getLikeStatus } from '@/api/article'
import { addComment, getCommentList } from '@/api/comment'


const route = useRoute()

const id = route.params.id

const like = reactive({
  num: 0,
  status: false
})

const article = reactive({
  data: {},
  content: ''
})
const anchorLinks = useState('article', () => [])
const commentList = useState('comment', () => [])
const userId = useState('user', () => [])

const handleLike = async () => {
  await toggleLike({
    article_id: id,
    user_id: userId.value,
    status: !like.status
  })
  await getLikeData()
}


const scrollComment = () => {
  const comment = document.querySelector('.article-comment')
  comment?.scrollIntoView()
}

const extractHTags = (htmlString: string) => {
  const pattern = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const hTags = [];
  let match;

  while ((match = pattern.exec(htmlString)) !== null) {
    hTags.push({ level: match[1], title: match[2] });
  }

  return hTags;
}

const submitComment = async (data: any) => {
  const params = {
    nickname: userId.value,
    article_id: id,
    create_time: +new Date(),
    isAuthor: 0,
    ...data
  }
  await addComment(params)
  await getCommentData()
}

async function getArticleData () {
  const data = await getArticleDetail(id)
  article.data = data.article
  article.content = data.content
  anchorLinks.value = extractHTags(article.content)
}

async function getCommentData () {
  const data = await getCommentList(id)
  commentList.value = data.list
}

async function getLikeData () {
  const [{ total }, { status }] = await Promise.all([
    getLikeTotal(id),
    getLikeStatus(id, userId.value)
  ])
  like.num = total
  like.status = status
}

onServerPrefetch(async () => {
  await getArticleData()
})

onMounted(async () => {
  userId.value = await getUserId()
  await getCommentData()
  await getLikeData()
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
      position: fixed;
      top: 304px;
      margin-left: -8rem;
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
        @include bg_color();
        color: #989EBE;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(50,50,50,.2);
        box-sizing: border-box;
        &-num {
          position: absolute;
          top: 0;
          right: -15px;
          background-color: $primary-color;
          color: #fff;
          border-radius: 10px;
          padding: 3px 6px;
          font-size: 14px;
        }
        &.active {
          .icon-upvote {
            color: $primary-color;
          }
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
    .article-anchor {
      margin-top: 20px;
      padding: 10px 0;
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
            color: $primary-color;
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