import { defineComponent, ref } from 'vue'
import { toChineseMoney } from '@/utils/format'

export default defineComponent({
  name: 'money',
  props: {
    money: {
      type: [Number],
      default: undefined
    }
  },
  setup(props) {
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
                <div>金额: {props.money} 元</div>
                <div>大写: {toChineseMoney(props.money)}</div>
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
