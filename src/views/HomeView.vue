<template>
  <layout></layout>
</template>
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import layout from '@/components/layout/index.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
