<template>
  <div class="HomePage">
    <main class="main-content">
      <section class="welcome">
        <h1>欢迎来到酒店管理系统</h1>
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
  padding: 20px;
}
.nav a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}

.main-content {
  margin-top: 40px;
}

.welcome h1 {
  font-size: 36px;
  color: #2c3e50;
}

.cards-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.card {
  background-color: #ecf0f1;
  border-radius: 8px;
  margin: 0 20px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 22px;
  color: #2c3e50;
}

.card p {
  color: #7f8c8d;
}

.card .btn {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.card .btn:hover {
  background-color: #2980b9;
}
</style>
