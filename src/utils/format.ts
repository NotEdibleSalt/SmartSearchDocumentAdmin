import dayjs from "dayjs";

/**
 * 格式化时间
 * 
 * @param time 时间字符串
 * @param format 格式
 * @returns 
 */
export const formatDate = (time: string, format = 'YYYY-MM-DD HH:mm:ss') => {

  console.log("asfsdg");
  debugger
  const date = dayjs(time)
  return date.format(format)
}


/**
 * 格式化金额
 *  
 * @param money 金额
 * @param decimals 小数位
 * @returns 
 */
export const formatMoney = (money: number | bigint, decimals = 2) => {

  return new Intl.NumberFormat("zh-CN", {
    // style: "currency", // 货币形式
    currency: "CNY", // "CNY"是人民币
    // currencyDisplay: "symbol", // 默认“symbol”，中文中代表“¥”符号
    // useGrouping: true, // 是否使用分组分隔符，如千位分隔符或千/万/亿分隔符，默认为true
    // minimumIntegerDigits: 1, // 使用的整数数字的最小数目.可能的值是从1到21,默认值是1
    minimumFractionDigits: decimals, // 使用的小数位数的最小数目.可能的值是从 0 到 20
    maximumFractionDigits: decimals, // 使用的小数位数的最大数目。可能的值是从 0 到 20
  }).format(money);

}