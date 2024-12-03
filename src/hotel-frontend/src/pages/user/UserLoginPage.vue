<template>
  <div id="UserLoginPage">
    <main class="main-content">
      <h1 class="title">用户登录</h1>
      <a-form
        class="login-form"
        style="max-width: 480px; margin: 0 auto"
        :model="formState"
        name="basic"
        label-align="left"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
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
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度至少6位' },
          ]"
        >
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
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { userLogin } from "@/api/user";
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
  const res = await userLogin(values);
  //登录成功，保存全局状态
  if (res.code === 200 && res.data.data) {
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    router.push({ path: "/", replace: true });
  } else {
    message.error("登录失败");
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
  min-height: 100vh; /* 保证页面最小高度 */
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
</style>
