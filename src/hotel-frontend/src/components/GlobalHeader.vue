<template>
  <div id="global-header">
    <a-row :wrap="false">
      <a-col flex="200px" class="header-name">
        <div class="title">酒店预订管理系统</div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="handleClick"
        />
      </a-col>
      <a-col flex="80px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ useLoginUserStore.loginUser.username ?? "请起一个名字" }}
          </div>
          <div v-else>
            <a-button type="primary" @click="handleButtonClick">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import {
  HomeOutlined,
  CrownOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/useLoginUserStore";

const loginUserStore = useLoginUserStore();

const router = useRouter();
const handleClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};

const handleButtonClick = () => {
  router.push({ path: "/user/login" });
};
const current = ref<string[]>(["mail"]);

router.afterEach((to, from, failure) => {
  current.value = [to.path];
});

const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/login",
    icon: () => h(UserOutlined),
    label: "用户登录",
    title: "用户登录",
  },
  {
    key: "/user/register",
    icon: () => h(UserOutlined),
    label: "用户注册",
    title: "用户注册",
  },
  {
    key: "/admin/userManage",
    icon: () => h(CrownOutlined),
    label: "管理后台",
    title: "管理后台",
  },
  {
    key: "/settings",
    icon: () => h(SettingOutlined),
    label: "设置",
    title: "设置",
  },
]);
</script>
<style scoped>
/* 顶部导航栏整体样式 */
.header-container {
  background: linear-gradient(90deg, #a0b9c8, #89a3b8);
  /* 渐变背景 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* 添加轻微阴影 */
  /* height: 64px; */
  /* 固定高度，确保内容完全显示 */
  display: flex;
  /* 使用 flex 布局 */
  align-items: center;
  /* 垂直居中 */
}

/* 系统标题样式 */
.title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  /* 防止文字换行 */
}

/* 导航菜单样式 */
#global-header .ant-menu-horizontal {
  background: transparent;
  /* 菜单背景透明，与header背景一致 */
  border-bottom: none;
  color: #fff;
  /* 白色字体 */
  display: flex;
  /* 使用 flex 布局 */
}

#global-header .ant-menu-item {
  color: #fff;
  padding: 0 15px;
  /* 调整间距 */
  transition: background 0.3s ease, color 0.3s ease;
  /* 添加平滑过渡 */
}

#global-header .ant-menu-item:hover,
#global-header .ant-menu-item-selected {
  background: rgba(255, 255, 255, 0.2);
  /* 半透明白色悬停背景 */
  border-radius: 5px;
  /* 增加圆角效果 */
  color: #fff;
}

#global-header .header-name {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 登录按钮样式 */
.login-button {
  background: #305d9a;
  /* 深蓝色按钮 */
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
  height: 36px;
  /* 固定高度，防止失衡 */
  line-height: 36px;
  border-radius: 18px;
  /* 圆角按钮 */
  transition: all 0.3s ease;
  /* 添加平滑过渡 */
}

.login-button:hover {
  background: #467ec2;
  /* 按钮悬停效果 */
}

/* 用户状态区域 */
.user-login-status {
  align-items: center;
  height: 100%;
  /* 高度填满父容器 */
}
</style>
