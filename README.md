# hotel_system

### 1. **项目架构设计**

* **后端 (Django)** ：Django 负责构建 RESTful API，用于处理数据库交互、业务逻辑和身份验证。
* **前端 (Vue.js)** ：Vue.js 用于实现用户界面，发送请求给 Django API 并展示响应数据。
* **通信方式** ：前端通过 Axios（或其他 HTTP 客户端库）向 Django API 发送请求，并通过 JSON 格式交换数据。

**a. Django 项目**

* 安装 Django 和 Django REST Framework：
  ```bash
  pip install django djangorestframework
  ```

+ 运行
  ```bash
  python manage.py runserver 
  ```

**b. Vue 项目**

[https://blog.csdn.net/weixin_47036445/article/details/137519844]()

+ 安装Node.js [https://nodejs.org/en]()
+ 安装vue脚手架 `npm install -g @vue/cli`
+ 运行 `npm run serve`
