import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    username: "",
    token: "",
    userRole: "",
  });
  //远程获取登录用户信息
  async function fetchLoginUser(res: any) {
    loginUser.value.username = res.data.user.username;
    loginUser.value.token = res.data.token;
    loginUser.value.userRole = res.data.role;
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
