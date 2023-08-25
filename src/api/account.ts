import { get, post, restDel, restGet, restPut } from "@/utils/request";

const baseUrl = "/accounts"


export const loginApi = (data: any): Promise<any> => {
  return post(baseUrl + "/login", data)
}

export const getAccountMenuTreeApi = (accountId: string): Promise<any> => {
  return restGet(baseUrl, accountId + "/menuTrees")
}


export const addAccountApi = (data: any): Promise<any> => {

  return post(baseUrl, data)
}

export const updateAccountApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data)
}

export const getAccountApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id)
}

export const delAccountApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id)
}

export const accountPagingApi = (data: object): Promise<any> => {

  return get(baseUrl, data)
}
