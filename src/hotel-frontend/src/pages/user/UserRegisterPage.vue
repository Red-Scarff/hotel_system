<template>
  <div id="UserLoginPage">
    <main class="main-content">
      <h1 class="title">用户注册</h1>
      <div class="form-container">
        <a-form
          class="login-form"
          style="max-width: 480px; margin: 0 auto"
          :model="formState"
          name="basic"
          label-align="left"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
            />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :labelCol="{ style: { color: '#fff' } }"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度至少6位' },
            ]"
          >
            <!-- <template #label>
              <span style="font-size: 16px; color: #f8f2f2; margin-bottom: 10px"
                >密码：</span
              >
            </template> -->
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
            />
          </a-form-item>

          <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item> -->

          <a-form-item style="margin-top: 50px">
            <a-button type="primary" html-type="submit">注册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { userLogin, userRegister } from "@/api/user";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
});

const router = useRouter();
const loginUserStore = useLoginUserStore();
const onFinish = async (values: any) => {
  // console.log(values);
  const res = await userRegister(values);
  // console.log(res);
  // 注册成功，保存全局状态
  if (res && res.data.id) {
    // console.log("注册成功");
    console.log(res.data.username, res.data.password);
    const login_res = await userLogin({
      username: values.username,
      password: values.password,
    });
    // console.log(login_res);
    if (login_res.data.message === "Login successful.") {
      await loginUserStore.fetchLoginUser(login_res);
      message.success("注册成功");
      router.push({ path: "/", replace: true });
    } else {
      message.error("注册失败");
    }
  }
};
</script>
<style scoped>
#UserLoginPage {
  font-family: "Arial", sans-serif;
  text-align: center;
  background: url("../../../jinx.jpg") no-repeat center center fixed; /* 背景图片 */
  background-size: cover; /* 背景覆盖整个页面 */
  position: relative; /* 需要为该元素设置相对定位 */
  min-height: 90vh; /* 保证页面最小高度 */
}

#UserLoginPage::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2); /* 半透明白色 */
  z-index: -1; /* 确保这个伪元素在图片和内容下层 */
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
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 30px; /* 内边距 */
  margin: 20px auto; /* 上下边距 */
  transition: transform 0.3s ease; /* 平滑的动画效果 */
}

.form-container:hover {
  transform: translateY(-5px); /* 鼠标悬停时轻微上升效果 */
}
</style>
