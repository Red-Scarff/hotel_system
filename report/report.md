# **数据库系统实验课程设计项目**

| 姓名   | 学号     | 主要负责部分             |
| ------ | -------- | ------------------------ |
| 徐子鑫 | 22336267 | 数据库框架设计、后端开发 |
| 王志杰 | 22331095 | 前端框架设计、前端开发   |

## 1. 项目要求

以**Postgresql**、 **SQL Server**或**My SQL**等作为后台数据库，以**React**、 **Vue**、 **Angular**等或其它开发工具作为前台开发工具，完成一个小型数据库应用系统的设计开发。完成系统的分析、设计和开发。

**酒店预订管理系统的设计与实现**

设计一个酒店预订管理系统，包括酒店信息管理、房间管理、预订管理等功能。酒店信息管理负责酒店信息的添加、修改和查询；房间管理负责房间信息的添加、修改和查询；预订管理负责预订信息的录入、修改和查询。

**要求：**

(1) **针对给定的系统进行需求分析，设计系统结构图和系统功能模块图；**

(2) **针对需求分析，画出**E-R**图表示的概念模型，并将其转换为至少满足**3NF**的关系模式，设计较为合理的数据库模式**；

(3) **系统中应能体现对数据库的保护（安全性、完整性等）；**

(4) **系统应该有较为友好的用户界面；**

## 2. 项目需求分析

### a. 系统结构图

### b. 系统功能模块图

### c. E-R图

* **酒店信息管理** ：酒店信息的添加、修改和查询。
* **房间管理** ：房间信息的添加、修改和查询。
* **预订管理** ：预订信息的录入、修改和查询。

![1734593574297](image/report/1734593574297.png)

## 3. 项目总览

### a. 后台数据库设计 (PostgreSQL)

**数据表设计** ：根据项目需求，建议创建以下表：

+ **Hotels** ：包含酒店的基本信息（例如名称、地址、联系方式等）。
+ **Rooms** ：包含房间信息（房号、房型、价格、状态等）。
+ **Bookings** ：包含预订信息（用户ID、房间ID、入住和离开日期、状态等）。
+ **Users** ：用户表，存储系统中用户的身份和权限等。

**外键约束和引用完整性** ：确保数据库设计的外键约束，避免不一致数据的出现。
**事务和安全** ：为需要原子性操作的任务（例如预订操作）使用事务控制，确保一致性。

**关系模式:**

* Hotels (HotelID, Name, Location, Phone, Email)
* Rooms (RoomID, HotelID, RoomType, Capacity, Price, Description)
* Customers (CustomerID, FirstName, LastName, Phone, Email, Address)
* Bookings (BookingID, CustomerID, RoomID, CheckInDate, CheckOutDate, TotalPrice, Status)

---

### b. 后端开发 (Python + Django)

+ **后端**：Django 负责构建 RESTful API，用于处理数据库交互、业务逻辑和身份验证。

Django 是一个用 Python 编写的高层次 Web 框架，主要特点包括：

1. **ORM（对象关系映射）** ：Django自带ORM，可以直接将Python对象映射到数据库表，简化数据库交互。
2. **认证系统** ：Django内置了身份验证和用户管理功能，帮助开发者快速实现用户登录、注册、权限控制等功能。
3. **权限管理** ：Django拥有内置的权限系统，允许为不同用户或用户组分配不同权限，方便控制访问权限。
4. **自动生成的管理界面** ：Django提供一个强大的后台管理界面，自动生成管理页面来管理数据。
5. **快速开发** ：Django推崇“少即是多”的设计原则，通过一站式的架构帮助快速开发复杂应用。

因为Django内置了丰富的功能，适合项目逻辑复杂、数据库操作频繁的应用，是许多开发者构建Web应用的首选框架之一。

**构建数据模型（Model）**

* 使用ORM（对象关系映射）来简化数据库操作，便于将Python对象直接映射到PostgreSQL的表中。
* 关键模型及字段：
  * **Hotel** ：`id`（主键）、`name`、`address`、`contact`等。
  * **Room** ：`id`（主键）、`hotel_id`（外键，指向Hotel）、`room_number`、`room_type`、`price`、`status`等。
  * **Booking** ：`id`（主键）、`user_id`、`room_id`（外键，指向Room）、`check_in`、`check_out`、`status`等。
  * **User** ：`id`（主键）、`username`、`password_hash`（存储哈希密码）、`role`（管理员、前台、客人等）等。

**API设计**

* **设计RESTful API接口** ：每个实体（如Hotel、Room、Booking、User）有基本的CRUD（增删改查）接口。
* **示例API** ：
  * `POST /hotels/`：添加酒店信息
  * `GET /hotels/<hotel_id>/`：获取指定酒店信息
  * `POST /rooms/`：添加房间信息
  * `POST /bookings/`：创建新的预订
  * `PUT /bookings/<booking_id>/`：更新预订状态

**用户身份验证与权限管理**

* **身份验证** ：使用token实现安全的会话管理。用户在登录后会获取一个token，之后每次请求携带该token来验证身份。
* **权限管理** ：不同角色（如管理员、用户等）在不同操作上的权限有所不同。

**处理数据库保护（安全性和完整性）**

* **数据完整性** ：定义了必要的外键约束、唯一性约束、NOT NULL等字段约束，确保数据质量。
* **SQL注入防护** ：使用ORM避免手动拼接SQL语句，防止SQL注入。
* **敏感信息保护** ：如用户密码应通过哈希存储（如bcrypt、Argon2），避免了直接存储明文密码。

**日志记录与错误处理**

* **日志记录** ：配置日志记录模块（例如logging库），记录关键事件（如用户登录、预订操作等），帮助后续系统维护和问题排查。
* **错误处理** ：设计标准的错误响应机制，对常见错误（如404、500）提供清晰的反馈；确保敏感信息不暴露给前端。

### c. 前端开发 (Vue)

## 4. 后台数据库设计 (PostgreSQL)

### a. 数据库关系模式设计

**1. 酒店信息表（Hotels）**

* **功能** ：存储酒店的基本信息。
* **主键** ：`HotelID`

---

| 字段名       | 数据类型     | 描述         |
| ------------ | ------------ | ------------ |
| `HotelID`  | INT (主键)   | 酒店唯一标识 |
| `Name`     | VARCHAR(100) | 酒店名称     |
| `Location` | VARCHAR(255) | 酒店地址     |
| `Phone`    | VARCHAR(15)  | 联系电话     |
| `Email`    | VARCHAR(100) | 邮箱地址     |

**2. 房间信息表（Rooms）**

* **功能** ：存储每个酒店的房间信息。
* **主键** ：`RoomID`
* **外键** ：`HotelID`（关联 Hotels 表）

---

| 字段名          | 数据类型       | 描述                         |
| --------------- | -------------- | ---------------------------- |
| `RoomID`      | INT (主键)     | 房间唯一标识                 |
| `HotelID`     | INT (外键)     | 所属酒店的 ID                |
| `RoomType`    | VARCHAR(50)    | 房间类型（如单人间、双人间） |
| `Capacity`    | INT            | 容量（人数）                 |
| `Price`       | DECIMAL(10, 2) | 每晚价格                     |
| `Description` | TEXT           | 房间描述                     |

**3. 客户信息表（Customers）**

* **功能** ：存储客户的基本信息。
* **主键** ：`CustomerID`

---

| 字段名         | 数据类型     | 描述         |
| -------------- | ------------ | ------------ |
| `CustomerID` | INT (主键)   | 客户唯一标识 |
| `FirstName`  | VARCHAR(50)  | 姓名         |
| `LastName`   | VARCHAR(50)  | 姓           |
| `Phone`      | VARCHAR(15)  | 联系电话     |
| `Email`      | VARCHAR(100) | 邮箱地址     |
| `Address`    | VARCHAR(255) | 地址         |

**4. 预订信息表（Bookings）**

* **功能** ：记录每次预订的详细信息。
* **主键** ：`BookingID`
* **外键** ：`RoomID`（关联 Rooms 表），`CustomerID`（关联 Customers 表）

---

| 字段名           | 数据类型       | 描述                         |
| ---------------- | -------------- | ---------------------------- |
| `BookingID`    | INT (主键)     | 预订唯一标识                 |
| `CustomerID`   | INT (外键)     | 预订的客户 ID                |
| `RoomID`       | INT (外键)     | 预订的房间 ID                |
| `CheckInDate`  | DATE           | 入住日期                     |
| `CheckOutDate` | DATE           | 退房日期                     |
| `TotalPrice`   | DECIMAL(10, 2) | 总价格                       |
| `Status`       | VARCHAR(20)    | 预订状态（如已确认、已取消） |

### b. model.py

`# Src/hotel/model.py`

我们在这里进行了数据库模型的实现

+ User

**扩展用户模型** ：

* 使用 Django 自带的 `AbstractUser`  创建自定义用户模型。
* 为用户添加角色字段（ `role` 字段）来区分身份。
* 并且创建身份函数来判断身份

```
class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('manager', 'Hotel Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')

    def is_customer(self):
        return self.role == 'customer'

    def is_manager(self):
        return self.role == 'manager'
```

+ Hotel

根据上述的数据库模型实现了Hotel

```
# 酒店模型
class Hotel(models.Model):
    name = models.CharField(max_length=100, verbose_name="酒店名称")
    location = models.CharField(max_length=255, verbose_name="地址")
    phone = models.CharField(max_length=15, verbose_name="联系电话")
    email = models.EmailField(verbose_name="邮箱地址")
  

    def __str__(self):
        return f"{self.name} - {self.location}"

    class Meta:
        verbose_name = "酒店"
        verbose_name_plural = "酒店管理"
        ordering = ["name"]  # 按酒店名称排序
```


+ Room

以酒店作为外键， 根据上述的数据库模型实现了Room

```
# 房间模型
class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, verbose_name="所属酒店")
    room_type = models.CharField(max_length=50, verbose_name="房间类型")
    capacity = models.PositiveIntegerField(verbose_name="容纳人数")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="每晚价格")
    description = models.TextField(blank=True, verbose_name="房间描述")

    def __str__(self):
        return f"{self.hotel.name} - {self.room_type} - {self.price}元"

    class Meta:
        verbose_name = "房间"
        verbose_name_plural = "房间管理"
        ordering = ["hotel", "room_type"]
```

+ Booking

以Hotel以及Room为外键，根据上述的数据库模型实现了Booking

```
# 预订模型
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1, verbose_name="客户id")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name="房间")
    customer_name = models.CharField(max_length=100, verbose_name="客户姓名")
    check_in_date = models.DateField(verbose_name="入住日期")
    check_out_date = models.DateField(verbose_name="退房日期")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="总价格")
    status = models.CharField(
        max_length=20,
        choices=[("confirmed", "已确认"), ("cancelled", "已取消")],
        default="confirmed",
        verbose_name="预订状态",
    )

    def __str__(self):
        return f"预订 - {self.customer_name} - {self.room}"

    class Meta:
        verbose_name = "预订"
        verbose_name_plural = "预订管理"
        ordering = ["-check_in_date"]
```

### c. 数据库效果

在postgre中我们可以看到数据库共有如下表

![1734666118722](image/report/1734666118722.png)

+ User

![1734666256465](image/report/1734666256465.png)

+ Hotel

![1734666227071](image/report/1734666227071.png)

+ Room

![1734666244055](image/report/1734666244055.png)

+ Booking

![1734666208884](image/report/1734666208884.png)

### d. 满足3NF的验证

**1.满足1NF（第一范式）：**

* 所有表的字段都只包含原子值（不可再分）。
* 表中每个字段只存储单一的信息，没有多值属性。

**2.满足2NF（第二范式）：**

* 每个非主属性完全依赖于主键，没有部分依赖。
  * 例如：`Rooms` 表的非主属性（如 `RoomType`、`Price` 等）完全依赖于主键 `RoomID`，而不是部分依赖于外键 `HotelID`。

**3.满足3NF（第三范式）：**

* 消除了传递依赖，所有非主属性都直接依赖于主键。
  * 例如：在 `Bookings` 表中，`TotalPrice` 直接依赖于主键 `BookingID`，没有间接依赖于 `CustomerID` 或 `RoomID`。

---

## 5. 后端开发 (Python + Django)

### a. Django





### 后端运行

在my_hotel目录中新建local_setting.py，在这里将参数改为你的数据库设置

去数据库建立一个名为my_hotel的库

```
  # my_hotel/local_setting.py

  Local_DATABASES = {
      "default": {
          "ENGINE": "django.db.backends.postgresql",
          "NAME": "my_hotel",
          "USER": "postgres", # 你的用户名
          "PASSWORD": "", # 你的密码
          "HOST": "127.0.0.1",
          "PORT": "5432",
      }
  }
```

数据库迁移：现在回到src目录，找到manage.py

`python manage.py makemigrations` or `python manage.py makemigrations hotel`

`python manage.py migrate`

后端启动：`python manage.py runserver`


### e. api

使用resource表示hotel, User, Booking, Room, 我们实现了以下API 接口：

| **HTTP 方法** | **URL 动作**     | **描述**                             |
| ------------------- | ---------------------- | ------------------------------------------ |
| `GET`             | `/resource/`         | 列出所有资源（List）                       |
| `POST`            | `/resource/`         | 创建一个新的资源（Create）                 |
| `GET`             | `/resource/{id}/`    | 获取单个资源的详细信息（Retrieve）         |
| `PUT`             | `/resource/{id}/`    | 更新单个资源（完全更新）（Update）         |
| `PATCH`           | `/resource/{id}/`    | 更新单个资源（部分更新）（Partial Update） |
| `DELETE`          | `/resource/{id}/`    | 删除单个资源（Delete）                     |
| `GET`             | `/resource/?search=` | 搜索资源 (Search)                          |
| `POST`            | `/User/login/`       | 登录 (Login)                               |

## 6. 前端开发 (Vue)

## 7. 项目测试与优化

## 8. 功能介绍

## 9. 项目总结
