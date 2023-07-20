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
      <el-footer class="footer-class">{{ footerText }}</el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Sider from './components/Sider.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import { onMounted, ref } from 'vue'

const footerText = ref<string>('')
const getRandomSC = () => {
  fetch('https://api.7585.net.cn/shici/api.php')
    .then((response) => response.json())
    .then((json) => {
      footerText.value = json.hitokoto + '   --  ' + json.source
    })
}

onMounted(() => {
  getRandomSC()
})
</script>

<style lang="scss" scope>
@import '../../styles/variables.scss';
.layout-class {
  height: 100vh;
  letter-spacing: $letter-spacing;
  .container-content-class {
    .header-class {
      height: 6vh;
      min-height: $sider-height;
    }
    .content-div-class {
      border: 10px solid #f2f3f5;
    }
    .footer-class {
      min-height: 25px;
      height: 4vh;
      line-height: 4vh;
      text-align: center;
      margin: 0 auto;
    }
  }
}
.dark .footer-class {
  color: var(--el-menu-text-color);
}
</style>
