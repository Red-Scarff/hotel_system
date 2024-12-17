<template>
  <div class="HomePage">
    <main class="main-content">
      <section class="welcome">
        <h1>欢迎来到酒店预订管理系统</h1>
        <p>请选择您需要的服务</p>
      </section>

      <section class="cards-container">
        <div class="card">
          <h2>酒店信息管理</h2>
          <p>管理酒店的基本信息。</p>
          <router-link to="/hotel-management" class="btn">进入</router-link>
        </div>

        <div class="card">
          <h2>房间管理</h2>
          <p>查看和管理所有房间信息。</p>
          <router-link to="/room-management" class="btn">进入</router-link>
        </div>

        <div class="card">
          <h2>预订管理</h2>
          <p>查看和管理预订记录。</p>
          <router-link to="/booking-management" class="btn">进入</router-link>
        </div>

        <div class="card">
          <h2>客户管理</h2>
          <p>查看和管理所有客户信息。</p>
          <router-link to="/room-management" class="btn">进入</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.HomePage {
  font-family: "Arial", sans-serif;
  text-align: center;
  background: url("../../jinx.jpg") no-repeat center center fixed; /* 背景图片 */
  background-size: cover; /* 背景覆盖整个页面 */
  position: relative; /* 需要为该元素设置相对定位 */
  min-height: 100vh; /* 保证页面最小高度 */
}

.HomePage::before {
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

.welcome h1 {
  margin-top: 150px;
  min-height: 50px;
  font-size: 42px;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 10px;
}

.welcome p {
  min-height: 50px;
  font-size: 18px;
  color: #ffffff;
  font-weight: 400;
}

.cards-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 30px;
  flex-wrap: wrap;
}

.card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.card h2 {
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 10px;
}

.card p {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.card .btn {
  display: inline-block;
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.card .btn:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}

.card .btn:active {
  transform: scale(1);
}
</style>
