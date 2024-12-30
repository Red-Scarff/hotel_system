import router from "@/router";
import { useLoginUserStore } from "./store/useLoginUserStore";
import { message } from "ant-design-vue";
// 全局路由守卫
router.beforeEach((to, from, next) => {
  const loginUserStore = useLoginUserStore();
  const loginUser = loginUserStore.loginUser;
  const to_url = to.path;
  // console.log(`to_url:${to_url}`);
  if (to_url.startsWith("/admin/") || to_url.startsWith("/user/booking")) {
    // console.log(`${loginUser.userRole}`);
    if (!loginUser || loginUser.userRole === "") {
      message.error("请先登录");
      next("/user/login?redirect=" + to_url);
      return;
    } else if (
      (to_url.startsWith("/admin/booking") ||
        to_url.startsWith("/admin/user")) &&
      loginUser.userRole !== "manager"
    ) {
      message.error("抱歉，您无权访问此页面");
      // next("/user/login?redirect=" + to_url);
      return;
    } else {
      // console.log("正确导航");
      next();
    }
  } else {
    // console.log("正确导航");
    next();
  }
});
