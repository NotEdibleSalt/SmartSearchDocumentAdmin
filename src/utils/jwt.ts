import * as jose from 'jose'


export const decodeJwt = (data: string) => {

  return jose.decodeJwt(data)
}