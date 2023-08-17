import axiosInstance from './axios'
import {
  RequestHttpEnum,
  ContentTypeEnum,
} from '@/enums/httpEnum'

export const get = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.GET,
    params: params
  })
}

export const restGet = (url: string, id: string, params?: object) => {

  url = url + "/" + id
  return get(url, params)
}

export const post = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.POST,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const restPost = (url: string, id: string, data?: object, headersType?: string) => {

  url = url + "/" + id
  return post(url, data, headersType)
}

export const patch = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PATCH,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const restPatch = (url: string, id: string, data?: object, headersType?: string) => {

  url = url + "/" + id
  return patch(url, data, headersType)
}

export const put = (url: string, data?: object, headersType?: ContentTypeEnum) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PUT,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const restPut = (url: string, id: string, data?: object, headersType?: ContentTypeEnum) => {

  url = url + "/" + id
  return put(url, data, headersType)
}

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.DELETE,
    params
  })
}

export const restDel = (url: string, id: string, params?: object) => {

  url = url + "/" + id
  return del(url, params)
}

// 获取请求函数，默认get
export const http = (type?: RequestHttpEnum) => {
  switch (type) {
    case RequestHttpEnum.GET:
      return get

    case RequestHttpEnum.POST:
      return post

    case RequestHttpEnum.PATCH:
      return patch

    case RequestHttpEnum.PUT:
      return put

    case RequestHttpEnum.DELETE:
      return del

    default:
      return get
  }
}
