import { sm4 } from 'sm-crypto-v2'

const key = 'sdfhuwhr23hred8923h48sdhf283hsd8'
const iv = '23usidhjf23h534yu834hjd823h4hs23'

function createSm4() {
  function encrypt(data: string): string {
    return <string>(<unknown>sm4.encrypt(data, key))
  }

  function encryptCBC(data: string): string {
    return <string>(<unknown>sm4.encrypt(data, key, { mode: 'cbc', iv: iv }))
  }

  function decrypt(encryptData: string): string {
    return <string>(<unknown>sm4.decrypt(encryptData, key))
  }

  function decryptCBC(encryptData: string): string {
    return <string>(<unknown>sm4.decrypt(encryptData, key, { mode: 'cbc', iv: iv }))
  }

  return {
    encrypt,
    encryptCBC,
    decrypt,
    decryptCBC
  }
}

export const sm4Util = createSm4()
