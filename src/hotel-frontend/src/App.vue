<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<style></style>
<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import { useLoginUserStore } from "@/store/useLoginUserStore";
// 完成后端后请解除注释
// const LoginUserStore = useLoginUserStore();
// LoginUserStore.fetchLoginUser();
</script>
