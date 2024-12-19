<template>
  <div id="hotel-manage-page">
    <a-row class="container">
      <!-- 搜索框 -->
      <a-col flex="auto">
        <a-input-search
          class="search-input"
          v-model:value="searchValue"
          placeholder="输入要查询的酒店信息"
          enter-button="搜索"
          size="large"
          @search="onSearch"
          style="width: 100%"
        />
      </a-col>

      <!-- 添加按钮 -->
      <a-col flex="none" class="add-button">
        <a-button type="primary" @click="handleAdd" style="margin-left: 10px">
          添加
        </a-button>
      </a-col>
    </a-row>

    <!-- 表格 -->
    <a-table :columns="columns" :data-source="data" class="table">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-dropdown>
            <template #overlay>
              <a-menu>
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

    <!-- Modal -->
    <a-modal
      class="visible-modal"
      v-model:open="visible"
      title="新的条目内容"
      ok-text="确定"
      cancel-text="取消"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
        style="padding-top: 20px"
      >
        <a-form-item
          label="酒店名"
          :rules="[{ required: true, message: '请输入酒店名!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="地址"
          :rules="[{ required: true, message: '请输入酒店地址!' }]"
        >
          <a-input v-model:value="formState.location" />
        </a-form-item>

        <a-form-item
          label="电话号"
          :rules="[{ required: true, message: '请输入酒店电话号!' }]"
        >
          <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item
          label="email"
          :rules="[{ required: true, message: '请输入酒店email!' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { MenuProps } from "ant-design-vue";
import { searchHotels, deleteHotels, editHotels, addHotels } from "@/api/user";
import { message } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { watch } from "vue";

const loginUserStore = useLoginUserStore();

interface Values {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  mode: string;
  token: string;
}

// Ref 和响应式对象
const formRef = ref<FormInstance>();
const formState = reactive<Values>({
  id: 0,
  name: "",
  location: "",
  phone: "",
  email: "",
  mode: "",
  token: "",
});

const searchValue = ref<string>("");
const data = ref<any[]>([]);
const visible = ref(false);

// 监控 loginUserStore.loginUser 的变化，并更新 formState.token
watch(
  () => loginUserStore.loginUser,
  (newLoginUser) => {
    if (newLoginUser && newLoginUser.token) {
      // console.log(`用户的token: ${newLoginUser.token}`);
      formState.token = newLoginUser.token;
    }
  },
  { immediate: true } // 使用 immediate: true 确保初始化时也会更新 token
);

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
const fetchData = async (info = "") => {
  try {
    const response = await searchHotels(info);
    // console.log(response);
    data.value = [...response.data]; // 强制替换，确保 Vue 能感知到变化
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
    // 更新 formState
    Object.assign(formState, record);
    formState.mode = "edit";
    console.log(formState);
  }
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
    mode: "",
  });
  formRef.value.resetFields();
};

// 确认按钮操作
const onOk = () => {
  formRef.value
    .validateFields()
    .then(async (values) => {
      try {
        if (formState.mode === "add") {
          // console.log(toRaw(formState));
          await addHotels(toRaw(formState)); // 调用添加酒店的函数
          message.success("酒店添加成功");
        } else if (formState.mode === "edit") {
          await editHotels(toRaw(formState)); // 调用编辑酒店的函数
          message.success("酒店信息更新成功");
        }
        fetchData();
      } catch (error) {
        message.error(
          formState.mode === "add" ? "添加酒店失败" : "更新酒店信息失败"
        );
      }
      resetForm();
    })
    .catch((info) => {
      console.log("表单验证失败:", info);
    });
};

//取消按钮操作
const onCancel = () => {
  resetForm();
};

// 删除功能
const handleDelete = async (record?: any) => {
  // console.log(`record.id: ${record.id}, formState.token: ${formState.token}`);
  await deleteHotels(record.id, formState.token);
  message.success("删除成功");
  fetchData();
};

// 添加功能
const handleAdd = () => {
  visible.value = true;
  formState.mode = "add";
  console.log(formState);
};
</script>

<style scoped>
/* 页面布局 */
.container {
  margin-top: 20px;
}

/* 搜索框样式 */
.search-input {
  max-width: 500px;
  margin-right: 20px; /* 搜索框与按钮之间的间隔 */
}

/* 按钮样式 */
.add-button {
  text-align: right; /* 使按钮靠右 */
  margin-right: 67px;
}

.add-button .ant-btn {
  background-color: #1890ff;
  border-color: #1890ff;
}

.add-button .ant-btn:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

/* 表格样式 */
.table {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Modal 弹出框内表单 */
.visible-modal .ant-form-item {
  margin-bottom: 16px;
}

/* 调整 Modal 内部 padding */
.visible-modal .ant-modal-body {
  padding: 20px;
}

/* 表单项 label 字体大小调整 */
.visible-modal .ant-form-item-label {
  font-size: 14px;
}
</style>
