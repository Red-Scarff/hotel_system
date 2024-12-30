<template>
  <div id="UserLoginPage">
    <main class="main-content">
      <h1 class="title">请输入预订相关信息</h1>
      <div class="form-container">
        <a-form
          ref="formRef"
          :model="formState"
          layout="vertical"
          name="form_in_modal"
          style="padding-top: 20px"
        >
          <div class="form-row">
            <a-form-item
              label="客户昵称"
              :rules="[{ required: false, message: '请输入客户昵称!' }]"
            >
              <a-select v-model:value="formState.user">
                <a-select-option
                  v-for="user in userOptions"
                  :key="user.value"
                  :value="user.value"
                >
                  {{ user.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="房间"
              :rules="[{ required: true, message: '请输入房间!' }]"
            >
              <a-select v-model:value="formState.room">
                <a-select-option
                  v-for="room in roomOptions"
                  :key="room.value"
                  :value="room.value"
                >
                  {{ room.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <a-form-item
            label="客户真实姓名"
            :rules="[{ required: true, message: '请输入客户真实姓名!' }]"
          >
            <a-input v-model:value="formState.customer_name" />
          </a-form-item>

          <div class="form-row">
            <a-form-item
              label="入住日期"
              :rules="[{ required: true, message: '请输入入住日期!' }]"
            >
              <a-input
                v-model:value="formState.check_in_date"
                placeholder="(格式:YYYY-MM-DD)"
              />
            </a-form-item>
            <a-form-item
              label="退房日期"
              :rules="[{ required: true, message: '请输入退房日期!' }]"
            >
              <a-input
                v-model:value="formState.check_out_date"
                placeholder="(格式:YYYY-MM-DD)"
              />
            </a-form-item>
          </div>

          <!-- <a-form-item
            label="总价格"
            :rules="[{ required: true, message: '请输入总价格!' }]"
          >
            <a-input v-model:value="formState.total_price" />
          </a-form-item> -->
          <!-- <a-form-item
            label="状态"
            :rules="[{ required: false, message: '请输入状态!' }]"
          >
            <a-input v-model:value="formState.status" />
          </a-form-item> -->
        </a-form>
        <!-- 确认和取消按钮 -->
        <div class="form-buttons">
          <a-button type="primary" @click="onOk">确定</a-button>
          <a-button @click="onCancel">取消</a-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
// 你的脚本部分保持不变
import {
  addBookings,
  searchRooms,
  searchUsers,
  searchHotels_byid,
} from "@/api/user";
import { userLogin } from "@/api/user";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";
import { watch } from "vue";
import type { FormInstance } from "ant-design-vue";

const loginUserStore = useLoginUserStore();
const visible = ref(true);
interface Values {
  id: number;
  user: number;
  room: number;
  customer_name: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: string;
  token: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<Values>({
  id: 0,
  user: 0,
  room: 0,
  customer_name: "",
  check_in_date: "",
  check_out_date: "",
  total_price: 0,
  status: "",
  token: loginUserStore.loginUser.token,
});

// 监控 loginUserStore.loginUser 的变化
watch(
  () => loginUserStore.loginUser,
  (newLoginUser) => {
    if (newLoginUser && newLoginUser.token) {
      formState.token = newLoginUser.token;
    }
  },
  { immediate: true }
);

const resetForm = () => {
  visible.value = false;
  Object.assign(formState, {
    id: 0,
    user: 0,
    room: 0,
    customer_name: "",
    check_in_date: "",
    check_out_date: "",
    total_price: 0,
    status: "",
  });
  formRef.value.resetFields();
};

const onOk = async () => {
  // console.log(formState);

  // 验证表单
  try {
    await formRef.value.validateFields();

    // 计算入住天数
    const checkInDate = new Date(formState.check_in_date);
    const checkOutDate = new Date(formState.check_out_date);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 转换为天数

    if (dayDifference <= 0) {
      message.error("退房日期必须晚于入住日期！");
      return;
    }

    // 获取单天房价
    const roomResponse = await searchRooms(formState.room, formState.token);
    const room = roomResponse.data[0];
    if (room) {
      const dailyPrice = room.price; // 假设房间的价格字段为 price
      formState.total_price = dailyPrice * dayDifference; // 计算总价格
    } else {
      message.error("房间信息获取失败");
      return;
    }

    // 调用添加预订的 API
    await addBookings(toRaw(formState));
    message.success("预订添加成功");

    resetForm();
  } catch (error) {
    console.error("用户预订失败:", error);
    message.error("用户预订失败");
  }
};

const onCancel = () => {
  resetForm();
};

const userOptions = ref<{ value: number; label: string }[]>([]);
const loadingUserData = ref(false);
const fetchUserOptions = async () => {
  loadingUserData.value = true;
  try {
    const response = await searchUsers(
      loginUserStore.loginUser.username,
      formState.token
    );

    if (response && Array.isArray(response.data)) {
      userOptions.value = response.data.map(
        (user: { id: number; username: string }) => ({
          value: user.id,
          label: user.username,
        })
      );
    } else {
      userOptions.value = [];
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    message.error("获取用户信息失败，请重试！");
  } finally {
    loadingUserData.value = false;
  }
};

const roomOptions = ref<{ value: string; label: string }[]>([]);
const loadingRoomData = ref(false);

const fetchHotelOptions = async () => {
  loadingRoomData.value = true;
  try {
    const response = await searchRooms("", formState.token);
    if (response && Array.isArray(response.data)) {
      const rooms = response.data;

      const hotelPromises = rooms.map(async (room: any) => {
        try {
          const hotelResponse = await searchHotels_byid(room.hotel);
          const hotelName =
            hotelResponse && hotelResponse.data
              ? hotelResponse.data.name
              : "未找到酒店";

          return {
            value: room.id,
            label: `${hotelName} - ${room.room_type} - ${room.price}`,
          };
        } catch (error) {
          console.error(`获取房间 ${room.id} 的酒店信息失败:`, error);
          return {
            value: room.id,
            label: `${room.name} - ${room.room_type} - ${room.price} (获取酒店信息失败)`,
          };
        }
      });

      roomOptions.value = await Promise.all(hotelPromises);
    } else {
      roomOptions.value = [];
    }
  } catch (error) {
    console.error("获取房间信息失败:", error);
    message.error("请先登录！");
  } finally {
    loadingRoomData.value = false;
  }
};

fetchUserOptions();
fetchHotelOptions();
</script>

<style scoped>
#UserLoginPage {
  font-family: "Arial", sans-serif;
  text-align: center;
  background: url("../../../jinx.jpg") no-repeat center center fixed;
  background-size: cover;
  position: relative;
  min-height: 90vh;
}

#UserLoginPage::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  z-index: -1;
}
.ant-form-item-label > label {
  color: white !important;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
#UserLoginPage .title {
  margin-top: 150px;
  min-height: 50px;
  font-size: 42px;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 50px;
}
#UserLoginPage .login-form {
  margin-top: 50px;
  max-width: 480px;
  margin: 0 auto;
}
.form-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 20px auto;
  transition: transform 0.3s ease;
}

.form-container:hover {
  transform: translateY(-5px);
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.ant-form-item {
  flex: 1;
  margin-right: 20px;
}

.ant-form-item:last-child {
  margin-right: 0;
}
</style>
