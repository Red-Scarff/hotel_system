<template>
  <div id="user-manage-page">
    <a-input-search
      class="search-input"
      v-model:value="searchValue"
      placeholder="输入要查询的酒店"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1" @click="() => handleDelete(record)"
                  >删除</a-menu-item
                >
                <a-menu-item key="2" @click="() => handleEdit(record)"
                  >修改</a-menu-item
                >
              </a-menu>
            </template>
            <a-button>
              选择
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </template>
      </template>
    </a-table>
    <a-modal
      class="visible-modal"
      v-model:open="visible"
      title="新的条目内容"
      ok-text="确定"
      cancel-text="取消"
      @ok="onOk"
    >
      <div style="margin-top: 20px">
        <!-- 调整上方距离 -->
        <a-form
          ref="formRef"
          :model="formState"
          layout="vertical"
          name="form_in_modal"
        >
          <a-form-item
            label="id"
            :rules="[
              {
                required: true,
                message: '请输入酒店id!',
              },
            ]"
          >
            <a-input v-model:value="formState.id" />
          </a-form-item>
          <a-form-item
            label="酒店名"
            :rules="[
              {
                required: true,
                message: '请输入酒店名!',
              },
            ]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item
            label="地址"
            :rules="[
              {
                required: true,
                message: '请输入酒店地址!',
              },
            ]"
          >
            <a-input v-model:value="formState.location" />
          </a-form-item>
          <a-form-item
            label="电话号"
            :rules="[
              {
                required: true,
                message: '请输入酒店电话号!',
              },
            ]"
          >
            <a-input v-model:value="formState.phone" />
          </a-form-item>
          <a-form-item
            label="email"
            :rules="[
              {
                required: true,
                message: '请输入酒店email!',
              },
            ]"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { MenuProps } from "ant-design-vue";
import { searchHotels, deleteHotels, editHotels } from "@/api/user";
import { message } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";

interface Values {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
}

// Ref 和响应式对象
const formRef = ref<FormInstance>();
const formState = reactive<Values>({
  id: 0,
  name: "",
  location: "",
  phone: "",
  email: "",
});
const searchValue = ref<string>("");
const data = ref<any[]>([]);
const visible = ref(false);
const editingRecord = ref<any>({});

// 表格列定义
const columns = [
  { title: "id", dataIndex: "id" },
  { title: "酒店名", dataIndex: "name" },
  { title: "地址", dataIndex: "location" },
  { title: "电话", dataIndex: "phone" },
  { title: "email", dataIndex: "email" },
  { title: "操作", key: "action" },
];

// 获取数据并更新表格
const fetchData = async (name = "") => {
  try {
    const response = await searchHotels(name);
    data.value = response.data;
  } catch (error) {
    message.error("请求失败，请重试");
  }
};

// 获取初始数据
fetchData();

// 搜索功能
const onSearch = () => {
  fetchData(searchValue.value);
};

// 编辑功能
const handleEdit = (record?: any) => {
  visible.value = true;
  if (record) {
    editingRecord.value = record;
    // 更新 formState
    Object.assign(formState, record);
  }
};

// 菜单点击事件
const handleMenuClick: MenuProps["onClick"] = (e) => {
  switch (e.key) {
    case "1":
      handleDelete(editingRecord.value);
      break;
    case "2":
      handleEdit(editingRecord.value);
      break;
    default:
      break;
  }
};

// 确认按钮操作
const onOk = () => {
  formRef.value
    .validateFields()
    .then(async (values) => {
      try {
        await editHotels(toRaw(formState));
        message.success("酒店信息更新成功");
      } catch (error) {
        message.error("更新酒店信息失败");
      }
      resetForm();
    })
    .catch((info) => {
      console.log("表单验证失败:", info);
    });
};

// 重置表单状态
const resetForm = () => {
  visible.value = false;
  Object.assign(formState, {
    id: 0,
    name: "",
    location: "",
    phone: "",
    email: "",
  });
  formRef.value.resetFields();
};

// 删除功能
const handleDelete = async (record?: any) => {
  if (record && record.id) {
    try {
      await deleteHotels(record.id);
      message.success("删除成功");
      fetchData();
    } catch (error) {
      message.error("删除失败，请重试");
    }
  } else {
    message.warning("请选择要删除的记录");
  }
};
</script>

<style scoped>
#user-manage-page .search-input {
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
