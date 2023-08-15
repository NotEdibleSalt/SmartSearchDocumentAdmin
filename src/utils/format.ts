import dayjs from "dayjs";

/**
 * 格式化时间
 * 
 * @param time 时间字符串
 * @param format 格式
 * @returns 
 */
export const formatDate = (time: string, format = 'YYYY-MM-DD HH:mm:ss') => {

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

export const toChineseMoney = (money: number | undefined): string => {

  if (!money) {
    return ''
  }

  let cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  ); //汉字的数字
  let cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
  let cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
  let cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
  let cnIntLast = "元"; //整型完以后的单位
  let maxNum = 999999999999999.99; //最大处理的数字
  let IntegerNum: string = ""; //金额整数部分
  let DecimalNum: string = ""; //金额小数部分
  let ChineseStr = ""; //输出的中文金额字符串
  let parts: string[] = ["", ""]; //分离金额后用的数组，预定义
  let zeroCount, IntLen, n, p, q, m, decLen;
  if (money == undefined) {
    return "";
  }
  if (money >= maxNum) {
    return "超出最大处理数字";
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast;
    return ChineseStr;
  }
  if (money.toString().indexOf(".") == -1) {
    IntegerNum = money.toString();
    DecimalNum = "";
    cnIntLast = "元整";
  } else {
    parts = money.toString().split(".");
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 2);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    //获取整型部分转换
    zeroCount = 0;
    IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      n = IntegerNum.substr(i, 1);
      p = IntLen - i - 1;
      q = p / 4;
      m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != "") {
    //小数部分
    decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      n = DecimalNum.substr(i, 1);
      if (n != "0") {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == "") {
    ChineseStr += cnNums[0] + cnIntLast;
  }
  return ChineseStr;

}
