<template>
  <div id="user-manage-page">
    <a-input-search
      class="search-input"
      v-model:value="searchValue"
      placeholder="输入要查询的用户"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userRole'">
          <a-tag v-if="record.userRole === 0" color="magenta">用户</a-tag>
          <a-tag v-else-if="record.userRole === 1" color="cyan">管理员</a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">增加</a-menu-item>
                <a-menu-item key="2">修改</a-menu-item>
                <a-menu-item key="3">删除</a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Actions
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import type { MenuProps } from "ant-design-vue";
import { searchUser } from "@/api/user";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { ref } from "vue";

const searchValue = ref<string>("");

const onSearch = (searchValue: string) => {
  // 这段具体怎么实现搜索回来再改吧，直接输入用户名的话调用一下下面的fetch就行了
};
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "身份",
    dataIndex: "userRole", //假设userRole为0是用户，为1 是管理员
  },
  {
    title: "操作",
    key: "action",
  },
];

let data = reactive([]);
// 获取数据
const fetchData = async () => {
  const res = await searchUser();
  if (res.data.data) {
    data = res.data.data;
  } else {
    message.error("Failed to fetch data");
  }
};
const handleMenuClick: MenuProps["onClick"] = (e) => {
  switch (e.key) {
    case "1":
      // 增加用户
      break;
    case "2":
      // 修改用户
      break;
    case "3":
      // 删除用户
      break;
    default:
      break;
  } //具体实现再说吧
};
</script>

<style scoped>
#user-manage-page .search-input {
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
