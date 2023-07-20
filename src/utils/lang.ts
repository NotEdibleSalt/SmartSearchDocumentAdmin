
/**
 * 获取浏览器默认语言
 * @returns string
 */
export function getBrowserLang(): string {
  const browserLang = navigator.language.toLowerCase()
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang)) {
    defaultBrowserLang = 'zh-cn'
  } else {
    defaultBrowserLang = 'en'
  }

  return defaultBrowserLang
}


