<template>
  <div class="login-root">
    <div class="login-form-div">
      <el-form
        ref="formRef"
        :model="formState"
        :label-position="'right'"
        label-width="120px"
        status-icon
      >
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <el-input v-model="formState.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码' }]"
          show-password
        >
          <el-input v-model="formState.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="login-button-class">
            <el-button type="primary" html-type="submit" @click="login(formRef)">登录</el-button>
            <el-button style="margin-left: 10px" @click="resetForm(formRef)">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus/es/components/form'
import { loginApi } from '@/api/account'
import { setLocalStorage } from '@/utils/storage'
import { useRouteStore } from '@/stores/route'
import router from '@/router'

const routeStore = useRouteStore()
const formRef = ref<FormInstance>()
const formState = reactive({
  username: 'admin',
  password: '12345678'
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const login = async (formEl: FormInstance | undefined) => {
  const b = await formEl?.validate()
  if (!b) {
    return
  }

  const result = await loginApi(formState)
  setLocalStorage('token', result)
  router.push('/')
}
</script>

<style lang="scss" scoped>
.login-root {
  width: 100%;
  height: 100vh;
  background: url('@/assets/login.jpg') no-repeat;
  background-size: 100% 100%;

  .login-form-div {
    width: 30%;
    color: red;
    padding-top: 18%;
    margin: 0 auto;

    :deep() .el-form-item__label {
      color: #ffffff;
    }

    .login-button-class {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 120px;
    }
  }
}
</style>
