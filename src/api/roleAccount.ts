import { get, post, restDel, restGet, restPut } from "@/utils/request";


const baseUrl = "/roleAccounts";

export const addRoleAccountApi = (data: any): Promise<any> => {

  return post(baseUrl, data);
};

export const updateRoleAccountApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data);
};

export const getRoleAccountApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id);
};

export const delRoleAccountApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id);
};

export const roleAccountPagingApi = (data: object): Promise<any> => {

  return get(baseUrl, data);
};
