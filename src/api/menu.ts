
import { get, post, restDel, restGet, restPut } from "@/utils/request";

const baseUrl = "/menu"


export const addMenuApi = (data: any): Promise<any> => {

  return post(baseUrl, data)
}

export const updateMenuApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data)
}

export const getMenuApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id)
}

export const delMenuApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id)
}

export const getMenuTreeApi = (): Promise<any> => {

  return get(baseUrl + '/tree')
}