import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";
import UserBookingPage from "@/pages/user/UserBookingPage.vue";
import UserManagePage from "@/pages/admin/UserManagePage.vue";
import HotelManagePage from "@/pages/admin/HotelManagePage.vue";
import RoomManagePage from "@/pages/admin/RoomManagePage.vue";
import BookingManagePage from "@/pages/admin/BookingManagePage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/user/login",
    name: "userLogin",
    component: UserLoginPage,
  },
  {
    path: "/user/register",
    name: "userRegister",
    component: UserRegisterPage,
  },
  {
    path: "/user/booking",
    name: "userBooking",
    component: UserBookingPage,
  },
  {
    path: "/admin/userManage",
    name: "adminUserManage",
    component: UserManagePage,
  },
  {
    path: "/admin/hotelManage",
    name: "adminHotelManage",
    component: HotelManagePage,
  },
  {
    path: "/admin/RoomManage",
    name: "adminRoomManage",
    component: RoomManagePage,
  },
  {
    path: "/admin/bookingManage",
    name: "adminBookingManage",
    component: BookingManagePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
