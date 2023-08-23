import { get, post, restDel, restGet, restPut } from "@/utils/request";


const baseUrl = "/dicts/items";

export const addDictItemApi = (data: any): Promise<any> => {

  return post(baseUrl, data);
};

export const updateDictItemApi = (id: string, data: any): Promise<any> => {

  return restPut(baseUrl, id, data);
};

export const getDictItemApi = (id: string): Promise<any> => {

  return restGet(baseUrl, id);
};

export const delDictItemApi = (id: string): Promise<any> => {

  return restDel(baseUrl, id);
};

