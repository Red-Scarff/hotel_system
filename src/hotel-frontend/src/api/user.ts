import myAxios from "@/request";

// 用户注册
export const userRegister = async (params: any) => {
  return await myAxios.request({
    url: "/api/user/register",
    method: "POST",
    data: params,
  });
};

// 用户登录
export const userLogin = async (params: any) => {
  return await myAxios.request({
    url: "/api/user/login",
    method: "POST",
    data: params,
  });
};

// 获取用户信息
export const getCurrentUser = async () => {
  return await myAxios.request({
    url: "/api/user/current",
    method: "GET",
  });
};

// 用户注销
export const userLogout = async (params: any) => {
  return await myAxios.request({
    url: "/api/user/logout",
    method: "POST",
    data: params,
  });
};

// 获取用户列表
export const searchUsers = async () => {
  return await myAxios.request({
    url: "/api/user/search",
    method: "GET",
    // params: {
    //   username: username,
    // },
  });
};

// 删除用户
export const deleteUser = async (id: any) => {
  return await myAxios.request({
    url: "/api/user/delete",
    method: "POST",
    data: id,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
