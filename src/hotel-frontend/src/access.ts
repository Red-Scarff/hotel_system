import router from "@/router";
import { useLoginUserStore } from "./store/useLoginUserStore";
import { message } from "ant-design-vue";
// 全局路由守卫
router.beforeEach((to, from, next) => {
  const loginUserStore = useLoginUserStore();
  const loginUser = loginUserStore.loginUser;
  const to_url = to.path;
  if (to_url.startsWith("/admin")) {
    if (!loginUser || loginUser.userRole !== "0") {
      message.error("请先登录");
      next("/user/login?redirect=" + to_url);
      return;
    }
  } else {
    next();
  }
});
