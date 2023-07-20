<template>
  <el-container class="layout-class">
    <el-aside class="sider-class">
      <Sider />
    </el-aside>
    <el-container class="container-content-class">
      <el-header class="header-class">
        <Header />
      </el-header>
      <el-main class="content-div-class">
        <Content />
      </el-main>
      <el-footer class="footer-class">{{ date() }}</el-footer>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Sider from './components/Sider.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
export default defineComponent({
  components: {
    Sider,
    Header,
    Content
  },
  setup() {
    const date = (): string => {
      const date = new Date()
      let month: string | number = date.getMonth() + 1
      let strDate: string | number = date.getDate()

      if (month <= 9) {
        month = '0' + month
      }
      if (strDate <= 9) {
        strDate = '0' + strDate
      }

      return (
        date.getFullYear() +
        '-' +
        month +
        '-' +
        strDate +
        '  ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
      )
    }

    return {
      date
    }
  }
})
</script>

<style lang="scss" scope>
@import '../../styles/variables.scss';
.layout-class {
  height: 100vh;
  .container-content-class {
    .header-class {
      height: $sider-height;
    }
    .content-div-class {
      border: 10px solid #f2f3f5;
    }
    .footer-class {
      height: 25px;
      margin: 0 auto;
    }
  }
}
</style>
