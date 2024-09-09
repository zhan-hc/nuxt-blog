import { apiHost } from '@/utils/envConfig'


const fetch = async (url: string, options: any) => {
  let domain = process.env.NODE_ENV === 'development' ? '/api' : apiHost
  if (options.isService) {
    domain = apiHost
  }
  const reqUrl = url.indexOf('http') > -1 ? url : domain + url

  if (!options.headers) {
    options.credentials = 'include' // 跨域携带cookie
    options.headers = {
    }
  }

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options }).then(({ data, error}) => {
      if (error.value) {
        console.log('请求接口报错', reqUrl, error.value)
        reject(error.value)
        return
      }
      const res: any = data.value
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default new class Http {

  get(url: string, params?: any, options?: any) {
    return fetch(url, { method: 'GET', params, ...options })
  }

  post(url: string, body: any, options?: any) {
    return fetch(url, { method: 'POST', body, ...options })
  }
}
