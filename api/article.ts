import Http from '@/service'
export const getArticleDetail = (id: string) => {
  return Http.get(`/article/getArticleDetail?id=${id}`, {}, { isService: true })
}

export const toggleLike = (data: any) => {
  return Http.post('/like/changeLikestatus', data)
}

export const getLikeTotal = (id: string) => {
  return Http.get(`/like/getLikeToId?id=${id}`)
}

export const getLikeStatus = (id: string, userId: string) => {
  return Http.get(`/like/getLikeToUserId?article_id=${id}&user_id=${userId}`)
}