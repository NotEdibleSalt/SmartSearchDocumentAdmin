import { defineComponent, ref } from 'vue'
import { toChineseMoney } from '@/utils/format'

export default defineComponent({
  name: 'money',
  props: {
    money: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const moneyNum = props.money ? Number(props.money) : undefined
    return () => (
      <el-popover
        effect="light"
        trigger="hover"
        placement="top"
        width="auto"
        v-slots={{
          default: () => {
            return (
              <div>
                <div>金额: {moneyNum} 元</div>
                <div></div>
                <div>大写: {toChineseMoney(moneyNum)}</div>
              </div>
            )
          },
          reference: () => {
            return <div>{props.money}</div>
          }
        }}
      ></el-popover>
    )
  }
})
