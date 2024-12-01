<template>
  <div id="UserLoginPage">
    <h2 class="title">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
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

      <a-form-item
        :wrapper-col="{ offset: 10, span: 20 }"
        style="margin-top: 30px"
      >
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
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
#UserLoginPage .title {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  margin-top: 20px;
}
</style>
