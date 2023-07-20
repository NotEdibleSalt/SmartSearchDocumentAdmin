import { post } from "@/utils/request";

const baseUrl = "/account"


export const loginApi = (data: any): Promise<any> => {
  return post(baseUrl + "/login", data)
}