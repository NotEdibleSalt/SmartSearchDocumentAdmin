
import { get, post, restDel, restGet, restPut } from "@/utils/request";

const baseUrl = "/roles"


export const addRoleApi = (data: any): Promise<any> => {

  return post(baseUrl, data)
}

export const updateRoleApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data)
}

export const getRoleApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id)
}

export const delRoleApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id)
}

export const getRolesApi = (data: object): Promise<any> => {

  return get(baseUrl, data)
}