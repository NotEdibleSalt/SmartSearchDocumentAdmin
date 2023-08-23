import { get, post, restDel, restGet, restPut } from "@/utils/request";


const baseUrl = "/dicts"

export const addDictApi = (data: any): Promise<any> => {

  return post(baseUrl, data)
}

export const updateDictApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data)
}

export const getDictApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id)
}

export const delDictApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id)
}

export const dictPagingApi = (data: object): Promise<any> => {

  return get(baseUrl, data)
}

export const getDictByTypeApi = (type: string): Promise<any> => {

  return get(baseUrl + "/type/" + type)
}

export const getAllDictItemsByIdApi = (dictId: string): Promise<any> => {

  return get(baseUrl + "/" + dictId + "/items")
}
