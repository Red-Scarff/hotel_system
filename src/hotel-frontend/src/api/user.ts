import myAxios from "@/request";
// 用户登录
export const userLogin = async (params: any) => {
  return await myAxios.request({
    url: "/users/login/",
    method: "POST",
    data: params,
  });
};

export const deleteUsers = async (id: number, token: string) => {
  // 发起删除请求
  return await myAxios.request({
    url: `/users/${id}/`, // 使用模板字符串来插入 ID
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`, // 添加 Authorization 请求头
    },
  });
};

export const searchUsers = async (info: any = "", token: string) => {
  // 将 info 的默认值设置为空字符串
  if (info) {
    // 简化判断条件
    // console.log(`/hotels/?search=${info}/`);
    return await myAxios.request({
      url: `/users/?search=${info}`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  } else {
    return await myAxios.request({
      url: "/users/",
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  }
};

// 编辑用户信息
export const editUsers = async (formState: any) => {
  const { id, mode, token, ...userData } = formState;
  return await myAxios.request({
    url: `/users/${id}/`,
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: userData,
  });
};

// 添加用户信息
export const addUsers = async (formState: any) => {
  const { id, mode, token, ...userData } = formState;
  return await myAxios.request({
    url: "/users/",
    method: "POST",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: userData,
  });
};

export const deleteHotels = async (id: number, token: string) => {
  // 发起删除请求
  return await myAxios.request({
    url: `/hotels/${id}/`, // 使用模板字符串来插入酒店 ID
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`, // 添加 Authorization 请求头
    },
  });
};

export const searchHotels = async (info: any = "") => {
  // 将 info 的默认值设置为空字符串
  if (info) {
    // 简化判断条件
    // console.log(`/hotels/?search=${info}/`);
    return await myAxios.request({
      url: `/hotels/?search=${info}`,
      method: "GET",
    });
  } else {
    return await myAxios.request({
      url: "/hotels/",
      method: "GET",
    });
  }
};

// 编辑酒店信息
export const editHotels = async (formState: any) => {
  const { id, mode, token, ...hotelData } = formState;
  return await myAxios.request({
    url: `/hotels/${id}/`,
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: hotelData, // 发送酒店数据（不包括 ID）
  });
};

// 添加酒店信息
export const addHotels = async (formState: any) => {
  const { id, mode, token, ...hotelData } = formState;
  return await myAxios.request({
    url: "/hotels/",
    method: "POST",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: hotelData, // 发送酒店数据（不包括 ID）
  });
};

export const searchRooms = async () => {
  return await myAxios.request({
    url: "/rooms",
    method: "GET",
  });
};

export const searchBookings = async () => {
  return await myAxios.request({
    url: "/bookings",
    method: "GET",
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
