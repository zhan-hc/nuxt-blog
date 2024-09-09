import Http from '@/service'
export const getCommentList = (id: string) => {
  return Http.get(`/comment/getCommentList?id=${id}`)
}

export const addComment = (data: any) => {
  return Http.post('/comment/addComment', data)
}

