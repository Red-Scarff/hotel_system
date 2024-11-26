<template>
  <div id="BasicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        Designed by 王志杰 and 徐子鑫
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#BasicLayout .header {
  background: #a0b9c8; /* 柔和的莫兰迪蓝色 */
  color: #a0b9c8;
  margin-bottom: 10px;
  height: 64px;
  line-height: 64px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  border-bottom: 1px solid #d0d0d0;
}

#BasicLayout .content {
  padding: 24px;
  background: #f7f8fa; /* 柔和的浅灰背景 */
  min-height: calc(100vh - 128px);
  overflow: auto;
  box-shadow: none; /* 去掉阴影 */
}

#BasicLayout .footer {
  background: #a0b9c8; /* 柔和的莫兰迪蓝色 */
  color: #fff; /* 白色字体 */
  margin-top: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  font-size: 14px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 添加顶部阴影 */
}
</style>
