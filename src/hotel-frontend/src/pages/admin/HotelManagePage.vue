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
      v-model:open="visible"
      title="新的条目内容"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOk"
    >
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
              message: 'Please input the title of collection!',
            },
          ]"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item name="description" label="Description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        <a-form-item
          name="modifier"
          class="collection-create-form_last-form-item"
        >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { MenuProps } from "ant-design-vue";
import { searchHotels, deleteHotels } from "@/api/user";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { message, Modal, Form, Input } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";

interface Values {
  title: string;
  description: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<Values>({
  title: "",
  description: "",
});

const searchValue = ref<string>("");

// 表格列
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "酒店名",
    dataIndex: "name",
  },
  {
    title: "地址",
    dataIndex: "location",
  },
  {
    title: "电话",
    dataIndex: "phone",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "操作",
    key: "action",
  },
];

// 用于存储表格数据的响应式对象
const data = ref<any[]>([]);

// 获取数据并更新表格
const fetchData = async (name = "") => {
  try {
    const response = await searchHotels(name); // 调用封装好的接口函数
    data.value = response.data; // 将返回的数据赋值给 data 响应式对象
  } catch (error) {
    message.error("请求失败，请重试");
  }
};

// 搜索功能
const onSearch = () => {
  fetchData(searchValue.value); // 调用 fetchData 来进行数据获取
};

// 编辑时的模态框数据
const visible = ref(false); // 控制模态框是否显示
const editingRecord = ref<any>({}); // 用于保存当前正在编辑的记录

// 菜单点击事件
const handleMenuClick: MenuProps["onClick"] = (e) => {
  switch (e.key) {
    case "1":
      handleDelete();
      break;
    case "2":
      handleEdit();
      break;
    default:
      break;
  }
};

//修改功能，弹出表单
const handleEdit = (record?: any) => {
  visible.value = true;
  if (record) {
    editingRecord.value = record;
  }
};

const onOk = () => {
  formRef.value
    .validateFields()
    .then((values) => {
      console.log("Received values of form: ", values);
      console.log("formState: ", toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log("reset formState: ", toRaw(formState));
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
};

// 删除功能
const handleDelete = async (record?: any) => {
  if (record && record.id) {
    try {
      await deleteHotels(record.id);
      message.success("删除成功");
      fetchData(); // 重新加载数据
    } catch (error) {
      message.error("删除失败，请重试");
      console.error("Delete error:", error);
    }
  } else {
    message.warning("请选择要删除的记录");
  }
};

// 获取初始数据
fetchData();
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
