<template>
  <div id="room-manage-page">
    <a-row class="container">
      <!-- 搜索框 -->
      <a-col flex="auto">
        <a-input-search
          class="search-input"
          v-model:value="searchValue"
          placeholder="输入要查询的房间信息"
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
          label="所属酒店"
          :rules="[{ required: true, message: '请输入所属酒店!' }]"
        >
          <a-select v-model:value="formState.hotel" placeholder="选择酒店">
            <a-select-option
              v-for="hotel in hotelOptions"
              :key="hotel.value"
              :value="hotel.value"
            >
              {{ hotel.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="房间类型"
          :rules="[{ required: true, message: '请输入房间类型!' }]"
        >
          <a-input v-model:value="formState.room_type" />
        </a-form-item>
        <a-form-item
          label="容纳人数"
          :rules="[{ required: true, message: '请输入容纳人数!' }]"
        >
          <a-input v-model:value="formState.capacity" />
        </a-form-item>

        <a-form-item
          label="每晚价格"
          :rules="[{ required: true, message: '请输入每晚价格!' }]"
        >
          <a-input v-model:value="formState.price" />
        </a-form-item>

        <a-form-item
          label="房间描述"
          :rules="[{ required: false, message: '请输入房间描述!' }]"
        >
          <a-input v-model:value="formState.description" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { MenuProps } from "ant-design-vue";
import {
  searchRooms,
  deleteRooms,
  editRooms,
  addRooms,
  searchHotels_byid,
  searchHotels,
} from "@/api/user";
import { message } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { watch } from "vue";

const hotelOptions = ref<{ value: string; label: string }[]>([]); // 存储酒店选项
const loadingHotelData = ref(false); // 用于控制加载状态
// 获取酒店信息并处理成下拉框需要的格式
const fetchHotelOptions = async () => {
  loadingHotelData.value = true; // 设置为加载状态
  try {
    const response = await searchHotels(); // 调用 API 获取酒店数据
    if (response && Array.isArray(response.data)) {
      // 处理酒店数据并生成下拉框选项
      hotelOptions.value = response.data.map((hotel: any) => ({
        value: hotel.id, // 使用酒店的 id 作为 value
        label: `${hotel.name} - ${hotel.location}`, // 将酒店名称和地址结合为 label
      }));
    } else {
      hotelOptions.value = []; // 如果没有酒店数据，清空选项
    }
  } catch (error) {
    console.error("获取酒店信息失败:", error);
    message.error("获取酒店信息失败，请重试！");
  } finally {
    loadingHotelData.value = false; // 结束加载状态
  }
};

// 在组件加载时获取酒店信息
fetchHotelOptions();

const loginUserStore = useLoginUserStore();

interface Values {
  id: number;
  hotel_name: string;
  hotel_location: string;
  hotel: number;
  room_type: string;
  capacity: number;
  price: number;
  description: string;
  mode: string;
  token: string;
}

// Ref 和响应式对象
const formRef = ref<FormInstance>();
const formState = reactive<Values>({
  id: 0,
  hotel_name: "",
  hotel_location: "",
  hotel: 0,
  room_type: "",
  capacity: 0,
  price: 0,
  description: "",
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
  { title: "房间id", dataIndex: "id" },
  { title: "所属酒店id", dataIndex: "hotel" },
  { title: "所属酒店名", dataIndex: "hotel_name" },
  { title: "所属酒店地址", dataIndex: "hotel_location" },
  { title: "房间类型", dataIndex: "room_type" },
  { title: "容纳人数", dataIndex: "capacity" },
  { title: "每晚价格", dataIndex: "price" },
  { title: "房间描述", dataIndex: "description" },
  { title: "操作", key: "action" },
];

// 获取数据并更新表格
const fetchData = async (info = "", token: string) => {
  try {
    // 请求房间数据
    const response = await searchRooms(info, token);
    // console.log(response);

    // 检查响应是否包含有效数据
    if (response && Array.isArray(response.data) && response.data.length > 0) {
      const roomDataWithHotelInfo = [];

      // 遍历房间数据数组
      for (let room of response.data) {
        // 请求酒店数据
        const hotel_res = await searchHotels_byid(room.hotel);

        if (hotel_res && hotel_res.data) {
          // 将酒店信息添加到房间数据
          roomDataWithHotelInfo.push({
            ...room,
            hotel_name: hotel_res.data.name,
            hotel_location: hotel_res.data.location,
          });
        } else {
          // 如果获取酒店信息失败，依然将房间数据添加到数组中，但不添加酒店信息
          roomDataWithHotelInfo.push({
            ...room,
            hotel_name: "未知酒店",
            hotel_location: "未知位置",
          });
        }
      }

      // 更新房间数据列表
      data.value = roomDataWithHotelInfo;
    } else {
      // 如果没有有效的数据，清空数据列表
      data.value = [];
    }
  } catch (error) {
    console.error("fetchData error:", error);
    message.error("请求失败，请重试");
  }
};

// 获取初始数据
fetchData("", formState.token);

// 搜索功能
const onSearch = () => {
  fetchData(searchValue.value, formState.token);
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
    hotel: 0,
    hotel_name: "",
    hotel_location: "",
    room_type: "",
    capacity: 0,
    price: 0,
    description: "",
    mode: "",
  });
  formRef.value.resetFields();
};

// 确认按钮操作
const onOk = () => {
  console.log(formState);
  formRef.value
    .validateFields()
    .then(async (values) => {
      try {
        if (formState.mode === "add") {
          // console.log(toRaw(formState));
          await addRooms(toRaw(formState));
          message.success("用户添加成功");
        } else if (formState.mode === "edit") {
          await editRooms(toRaw(formState));
          message.success("用户信息更新成功");
        }
        fetchData("", formState.token);
      } catch (error) {
        message.error(
          formState.mode === "add" ? "添加用户失败" : "更新用户信息失败"
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
  await deleteRooms(record.id, formState.token);
  message.success("删除成功");
  fetchData("", formState.token);
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
