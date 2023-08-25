import { get, post, restDel, restGet, restPut } from "@/utils/request";


const baseUrl = "/roleMenus";

export const addRoleMenuApi = (data: any): Promise<any> => {

  return post(baseUrl, data);
};

export const getRoleMenuApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id);
};

export const delRoleMenuApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id);
};

export const roleMenuPagingApi = (data: object): Promise<any> => {

  return get(baseUrl, data);
};
