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
// 编写好后端后，请解除这部分注释
// import { getCurrentUser } from "@/api/user";
// getCurrentUser().then((res) => {
//   console.log(res);
// });
</script>

<style scoped>
#BasicLayout .header {
  /* background: #a0b9c8; */
  background: linear-gradient(to right, #ffc0cb, #9370db);
  color: #a0b9c8;
  padding-inline: 10px;
  height: 64px;
}

#BasicLayout .footer {
  background: linear-gradient(to right, #5faad5, #1e8fffb2, #5faad5);
  color: #fff;
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
#BasicLayout .content {
  background: #f7f8fa; /* 柔和的浅灰背景 */
  min-height: calc(100vh - 120px); /* 内容区域高度 */
  box-shadow: none; /* 去掉阴影 */
}
</style>
