import { getCurrentUser } from "@/api/user";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    username: "",
    id: "",
    userRole: "",
  });
  //远程获取登录用户信息
  async function fetchLoginUser() {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      setTimeout(() => {
        loginUser.value = {
          username: "test",
          id: "1",
        };
      }, 1000);
    } //这个else用于测试后端，测试完可以注释掉
  }
  //设置登录用户信息
  function setLoginUser(user: any) {
    loginUser.value = user;
  }
  return {
    loginUser,
    fetchLoginUser,
    setLoginUser,
  };
});
