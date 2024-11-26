<template>
  <div id="BasicLayout">
    <a-layout>
      <a-layout-header class="" header>
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
#BasicLayout .content {
  padding: 24px;
  background: #f0f2f5;
  margin: 24px;
}
#BasicLayout .footer {
  background: #79f0b7;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
}
</style>
