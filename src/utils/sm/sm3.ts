import { sm3 } from 'sm-crypto-v2'

function createSm3() {
  function sign(data: string): string {
    return sm3(data)
  }
  return {
    sign
  }
}

export const sm3Util = createSm3()