<template>
  <div class="header-root">
    <div class="dark-switch-div" @click.stop>
      <el-switch
        v-model="isDark"
        @change="toggleDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        active-color="var(--el-fill-color-dark)"
        inactive-color="var(--el-color-primary)"
      />
    </div>

    <div>
      <el-dropdown class="dropdown-class" @command="onSwitchLanguage">
        <el-avatar shape="square" @click.prevent size="small">
          <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-12008bb2=""
          >
            <path
              fill="currentColor"
              d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"
            ></path>
          </svg>
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu v-for="languageOption in viewConfigStore.getLanguageOptions()">
            <el-dropdown-item :command="languageOption.value">{{
              languageOption.label
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div>
      <el-dropdown class="dropdown-class" @click="onClick">
        <el-avatar
          class="ant-dropdown-link"
          shape="circle"
          @click.prevent
          size="small"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        >
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">{{ $t('header.personalData') }}</el-dropdown-item>
            <el-dropdown-item command="2">{{ $t('header.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useViewConfigStore } from '@/stores/locale'
import { localStorageUtil } from '@/utils'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useToggle } from '@vueuse/shared'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const toggleDark = () => useToggle(isDark)

const viewConfigStore = useViewConfigStore()
const onClick = (routePath: string) => {
  if (routePath === '1') {
    router.push('/home')
  } else {
    localStorageUtil.clear()
    router.push('/login')
  }
}

const onSwitchLanguage = (language: string) => {
  viewConfigStore.viewConfig.language = language
}
</script>
<style lang="scss" scope>
.header-root {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .dark-switch-div {
    margin-right: 20px;
    margin-top: 8px;
  }

  .dropdown-class {
    margin-right: 20px;
    margin-top: 8px;
  }
}
</style>
