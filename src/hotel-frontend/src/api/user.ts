import myAxios from "@/request";
// 用户登录
export const userLogin = async (params: any) => {
  return await myAxios.request({
    url: "/users/login/",
    method: "POST",
    data: params,
  });
};

// 用户注册
export const userRegister = async (params: any) => {
  return await myAxios.request({
    url: "/users/",
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

export const searchHotels_byid = async (id: number) => {
  // console.log(id);
  return await myAxios.request({
    url: `/hotels/${id}/`,
    method: "GET",
  });
};
export const searchRooms_byid = async (id: number) => {
  // console.log(id);
  return await myAxios.request({
    url: `/rooms/${id}/`,
    method: "GET",
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

export const deleteRooms = async (id: number, token: string) => {
  // 发起删除请求
  return await myAxios.request({
    url: `/rooms/${id}/`, // 使用模板字符串来插入 ID
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`, // 添加 Authorization 请求头
    },
  });
};

export const searchRooms = async (info: any = "", token: string) => {
  // 将 info 的默认值设置为空字符串
  if (info) {
    // 简化判断条件
    // console.log(`/hotels/?search=${info}/`);
    return await myAxios.request({
      url: `/rooms/?search=${info}`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  } else {
    return await myAxios.request({
      url: "/rooms/",
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  }
};

// 编辑房间信息
export const editRooms = async (formState: any) => {
  const { id, mode, token, hotel_name, hotel_location, ...roomData } =
    formState;
  return await myAxios.request({
    url: `/rooms/${id}/`,
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: roomData,
  });
};

// 添加房间信息
export const addRooms = async (formState: any) => {
  const { id, mode, token, hotel_name, hotel_location, ...roomData } =
    formState;
  return await myAxios.request({
    url: "/rooms/",
    method: "POST",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: roomData,
  });
};

export const deleteBookings = async (id: number, token: string) => {
  // 发起删除请求
  return await myAxios.request({
    url: `/bookings/${id}/`, // 使用模板字符串来插入 ID
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`, // 添加 Authorization 请求头
    },
  });
};

export const searchBookings = async (info: any = "", token: string) => {
  // 将 info 的默认值设置为空字符串
  if (info) {
    // 简化判断条件
    // console.log(`/hotels/?search=${info}/`);
    return await myAxios.request({
      url: `/bookings/?search=${info}`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  } else {
    return await myAxios.request({
      url: "/bookings/",
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // 添加Authorization头
      },
    });
  }
};

// 编辑房间信息
export const editBookings = async (formState: any) => {
  const { id, mode, token, hotel_name, hotel_location, ...bookingData } =
    formState;
  return await myAxios.request({
    url: `/bookings/${id}/`,
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: bookingData,
  });
};

// 添加房间信息
export const addBookings = async (formState: any) => {
  const { id, mode, token, hotel_name, hotel_location, ...bookingData } =
    formState;
  return await myAxios.request({
    url: "/bookings/",
    method: "POST",
    headers: {
      Authorization: `Token ${token}`, // 添加Authorization头
    },
    data: bookingData,
  });
};
