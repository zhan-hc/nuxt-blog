import dayjs from 'dayjs'
import Fingerprint2 from 'fingerprintjs2'
/**
 * 
 * @param url 用相对路径
 * @returns 
 */
export function getImageUrl (url:string) {
    return new URL('../' + url, import.meta.url).href
}

export const formatDate = (time: any, formatStr: string = 'YYYY-MM-DD hh:mm:ss') => {
    return dayjs(time).format(formatStr)
}

export const getUserId = () => {
    return new Promise((resolve) => {
      Fingerprint2.get(function (components:any) {
        const values = components.map((component:any) => component.value) // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
        resolve(murmur)
      })
    })
  }