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

根据需求的分析，我们画出E-R图如下：

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

**1. 构建数据模型（Model）**

* 使用ORM（对象关系映射）来简化数据库操作，便于将Python对象直接映射到PostgreSQL的表中。
* 关键模型及字段：
  * **Hotel** ：`id`（主键）、`name`、`address`、`contact`等。
  * **Room** ：`id`（主键）、`hotel_id`（外键，指向Hotel）、`room_number`、`room_type`、`price`、`status`等。
  * **Booking** ：`id`（主键）、`user_id`、`room_id`（外键，指向Room）、`check_in`、`check_out`、`status`等。
  * **User** ：`id`（主键）、`username`、`password_hash`（存储哈希密码）、`role`（管理员、前台、客人等）等。

**2. API设计**

* **设计RESTful API接口** ：每个实体（如Hotel、Room、Booking、User）有基本的CRUD（增删改查）接口。
* **示例API** ：
  * `POST /hotels/`：添加酒店信息
  * `GET /hotels/<hotel_id>/`：获取指定酒店信息
  * `POST /rooms/`：添加房间信息
  * `POST /bookings/`：创建新的预订
  * `PUT /bookings/<booking_id>/`：更新预订状态

**3. 用户身份验证与权限管理**

* **身份验证** ：使用token实现安全的会话管理。用户在登录后会获取一个token，之后每次请求携带该token来验证身份。
* **权限管理** ：不同角色（如管理员、用户等）在不同操作上的权限有所不同。

**4. 处理数据库保护（安全性和完整性）**

* **数据完整性** ：定义了必要的外键约束、唯一性约束、NOT NULL等字段约束，确保数据质量。
* **SQL注入防护** ：使用ORM避免手动拼接SQL语句，防止SQL注入。
* **敏感信息保护** ：如用户密码应通过哈希存储（如bcrypt、Argon2），避免了直接存储明文密码。

**5. 日志记录与错误处理**

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

我们首先创建了名为my_hotel的django项目，随后创建了名为hotel的app作为我们开发的主要框架

我们使用Django Restful Framework来构建标准的api

### a. 用户管理

如上文(3.a)所述，为了满足对于客户和酒店管理人员的区分，我们选择自定义用户类来进行用户管理

Django 提供了一个强大的认证系统，包含了用户管理、认证（login/logout）、权限管理等功能。其核心功能包括：

1. **用户认证（Authentication）** ：验证用户身份的过程。
2. **授权（Authorization）** ：确定用户是否有权执行某些操作。
3. **权限（Permissions）** ：基于角色或者具体用户进行操作限制。

Django 内置的认证系统通过 `User` 模型、`groups`、`permissions` 等字段来管理用户、用户角色以及权限。

**1. 内置 `User` 模型**

Django 提供了一个默认的 `User` 模型，存储了用户的基本信息。这个模型包括了以下字段：

* `username`：用户名，唯一标识一个用户。
* `password`：加密的用户密码。
* `email`：用户的电子邮箱地址。
* `first_name` 和 `last_name`：用户的姓名。
* `is_active`：指示该用户是否活跃。
* `is_staff`：指示该用户是否为管理员。
* `is_superuser`：指示该用户是否是超级用户（拥有所有权限）。

```python
from django.contrib.auth.models import User
```

在使用 Django 默认的 `User` 模型时，所有的用户管理都可以通过 `django.contrib.auth` 进行。例如，创建用户、修改密码、检查权限等。

**2. 自定义用户模型**

Django 提供了自定义用户模型的能力，允许我们扩展 `User` 模型，添加自定义字段或行为。这对于需要在用户模型上增加额外信息（比如 `role` 字段）非常有用。

**继承 `AbstractUser`** ：

* `AbstractUser` 是 Django 默认的 `User` 模型的基础类，已经提供了很多常见字段（如用户名、密码、电子邮件等）。

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
```

**在 `settings.py` 中指定自定义用户模型** ：

+ 在项目的 `settings.py` 文件中，通过 `AUTH_USER_MODEL` 设置自定义的用户模型：

```python
AUTH_USER_MODEL = 'hotel.User'
```

这样，Django 就会使用我们自定义的 `User` 模型，而不是默认的 `User` 模型。

我们将用户类注册到 `admin.py`中，这样我们便可以使用django的用户管理界面进行管理

```
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # 导入自定义用户模型

# 使用 UserAdmin 配置你的用户模型
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')  # 自定义显示字段
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'role', 'password1', 'password2', 'is_active', 'is_staff')}
        ),
    )

```

进入 `http://127.0.0.1:8000/admin/`我们就可以轻松的进行用户管理

![1734685179356](image/report/1734685179356.png)

也可以对用户信息进行修改

![1734685235501](image/report/1734685235501.png)

### b. serializers.py

在上文中，我们已经根据数据库的设计，定义了我们的models，我们创建serializers.py来编写我们的自定义序列化器。

序列化器是django restful framework 所提供的，序列化器允许将复杂数据（例如查询集和模型实例）转换为原生 Python 数据类型，然后可以轻松将其渲染为 `JSON`或 `XML`其他内容类型。序列化器还提供反序列化，允许在首先验证传入数据后将解析的数据转换回复杂类型。

我们的自定义序列化器继承于serializers.ModelSerializer，这允许我们简介的通过以下方法定义自己的序列化器，只需将所需的数据从模型的字段中选出，放入fields中。

```
from rest_framework import serializers
from django.contrib.auth import get_user_model

from hotel.models import Hotel, Room, Booking

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'phone', 'email']
  
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'hotel', 'room_type', 'capacity', 'price', 'description']
  
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'room', 'customer_name', 'check_in_date', 'check_out_date', 'total_price', 'status']
```

在用户的序列化器中，我们重构了create方法

在 `User` 模型里，密码字段使用的是 Django 内部的  **哈希存储机制** ，不能直接存储明文密码。

所以，在 **序列化器 (Serializer)** 中，我们需要专门处理密码的写入，因为：

1. **安全性** ：确保密码不会作为明文存储。
2. **验证加密** ：通过 `set_password()` 方法来对密码进行加密。
3. **API 设计** ：允许用户通过 API 端点传递明文密码进行注册。

---

**为什么要重新定义 password 字段？**

* 当我们接收用户注册时，用户通过 API 传递明文密码。
* 如果我们不做额外处理，直接将密码保存到模型中，它将被当作普通字符串存储，不会加密。
* 所以，我们在 `create()` 方法中，手动调用 `set_password()` 来加密密码。

**如果不定义 password 字段会怎样？**

如果不显式定义 `password` 字段并调用 `set_password()`：

1. 通过 API 传入的密码会直接以明文存储在数据库中。
2. 这样，Django 的用户验证机制（比如登录）会失败，因为它会尝试与加密后的密码进行比对。

---

我们定义 `password` 字段， **接收用户传入的明文密码** ，并在 `create()` 或 `update()` 方法中使用 `set_password()` 加密后存储到数据库中，确保用户密码的安全性。

```
class UserSerializer(serializers.ModelSerializer):
    # 添加password，并设置 write_only 保证安全性
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # 提取明文密码
        password = validated_data.pop('password', None)
        # 创建用户对象，但不保存到数据库
        instance = self.Meta.model(**validated_data)
        if password:
            # 调用 set_password 方法将密码加密
            instance.set_password(password)
        # 保存用户对象到数据库
        instance.save()
        return instance

```

### c. views.py

我们在这里编写视图，构建我们的api，我们采用 ModelViewSet作为父类

在 Django REST framework (DRF) 中，**ViewSet** 是一种高级抽象，专门用于简化视图的编写，它将多个操作（如 `list`, `retrieve`, `create`, `update`, `destroy`）合并到单一类中。ViewSet 的核心目的是提供一个符合 RESTful 规范的 API 端点，同时减少重复代码。

以下是 ViewSet 编写的规范和流程：

**1. 使用基类**

* **`ViewSet`** ：最基础的类，需要手动定义行为方法（如 `list`, `create`）。
* **`ModelViewSet`** ：常用，自动处理 CRUD 操作，适合操作数据库模型的 API。

**2. 序列化器**

* 每个 ViewSet 通常会搭配一个序列化器（`Serializer`），如我们上面所编写的，用于定义 API 数据的输入输出格式。

**3. 路由绑定**

* 使用 `DefaultRouter` 或 `SimpleRouter` 为 ViewSet 自动生成路由。

**4. 权限控制**

* 配置 `permission_classes`，确保资源的访问符合权限要求。

**5. 查询优化**

* 配置 `queryset` 和 `get_queryset` 方法，确保高效的数据查询。

**6. 自定义动作**

* 通过 `@action` 装饰器定义额外的非标准 RESTful 操作。

通过这种方式，我们可以实现一个清晰、规范、可扩展的 RESTful API。

---

#### permissions.py

Django REST Framework 提供了 `permissions` 模块，可以基于请求的用户角色实现权限控制。

在 `permissions.py` 文件中定义自定义权限类：

```
from rest_framework.permissions import BasePermission

class IsCustomerReadOnly(BasePermission):

    def has_permission(self, request, view):
        # 所有用户可以访问列表视图 (GET 方法)
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # 仅角色为 Manager 的用户可以进行写操作
        return request.user.is_authenticated and request.user.is_manager()

```

通过此方式实现后：

1. **即使前端被绕过** ，后端依然会根据用户角色验证权限，确保 Customer 不能执行写操作。
2. **用户体验**更加友好，前端动态渲染界面减少了无效操作。

这样，`Customer` 和 `Manager` 的权限范围清晰，系统安全性和灵活性都得到保证。

#### HotelViewSet， RoomViewSet，BookingViewSet

+ 在视图里面，通过viewsets.ModelViewSet，我们自动就可以支持CRUD（增删改查）的操作。
+ 并且引入搜索功能，支持在指定字段里面的搜索。
+ 并且为api加上权限的保护，仅支持有 `permissions`的操作，在后端保证了数据库的安全

```
class HotelViewSet(viewsets.ModelViewSet):

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsCustomerReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']  # 支持搜索的字段  
  
class RoomViewSet(viewsets.ModelViewSet):

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsCustomerReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['hotel__id', 'room_type']  # 支持搜索的字段  

  
class BookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_name']  # 支持搜索的字段  
    permission_classes = [permissions.IsAuthenticated]
```

#### UserViewSet

除了以上CRUD（增删改查）的操作，我们还为User实现了login的api，为用户提供登录的操作

在login中，我们会验证账号密码的正确性，若错误，将会返回error

若正确，将会返回token，用于登录后信息的验证

```
class UserViewSet(viewsets.ModelViewSet):
    """
    用户视图集合: 提供增删改查以及注册功能
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # 允许任何人访问（注册）
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']  # 支持搜索的字段  

    def get_permissions(self):
        """
        根据请求方法设置不同权限
        """
        if self.action == 'create' or self.action == 'login':  # 注册
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]  # 其他操作需要认证


    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        """
        Custom login action for UserViewSet.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if user.is_customer():
            role = 'customer'
        elif user.is_manager():
            role = 'manager'
        else:
            return Response({'message': 'Role not recognized'}, status=status.HTTP_403_FORBIDDEN)
  
        token, created = Token.objects.get_or_create(user=user)

        # Return the token and user details
        return Response({
            "message": "Login successful.",
            "token": token.key,
            "role": role,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)
```

#### token

在 Django Rest Framework (DRF) 中，认证和权限的机制通常是通过 **认证 (Authentication)** 和 **权限 (Permissions)** 来实现的。登录后，前端需要使用返回的 **token** 来验证用户身份，从而获取访问权限。

认证是指系统如何识别用户身份。Django Rest Framework 提供了几种认证方式，最常用的是  **Token 认证** 。当用户成功登录时，后端会返回一个  **token** ，前端每次请求时，都需要在请求头中带上这个 token 来验证用户身份。

**1. 前端如何获取权限**

在用户登录成功后，后端会返回一个  **token** ，这个 **token** 是唯一的身份标识。前端可以将该 token 存储在浏览器的 localStorage 或 sessionStorage 中，并且每次发请求时，通过 HTTP 请求头将 token 发送给后端。

**认证过程的流程：**

+ **用户登录：**

  用户在前端输入用户名和密码，发送到后端 `/users/login/`。
  后端验证用户名和密码正确，成功后返回一个  **token** 。
+ **前端存储 token：**
  前端将收到的 token 存储在 `localStorage` 或 `sessionStorage` 中。比如：

  ```js
  localStorage.setItem('authToken', token);
  ```

  之后的每次请求都会带上这个 token。
+ **带 token 发起请求：**
  前端每次发请求时，需要将 token 加入到请求头中，通常是加在 `Authorization` 字段中：

  ```js
  fetch('/api/some_endpoint/', {
    method: 'GET',
    headers: {
      'Authorization': 'Token ' + localStorage.getItem('authToken'),
    },
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```

**2. 后端如何验证用户身份**

在后端，DRF 会根据请求头中的 `Authorization` 字段来检查用户身份。使用 `TokenAuthentication` 类进行 token 认证。每次请求时，系统会通过解析请求头中的 token 来识别用户是否已登录。

**步骤：**

* **TokenAuthentication** 会检查请求中的 `Authorization` 字段是否包含一个有效的 token。
* 如果 token 存在且有效，Django 会为该请求用户设置 `request.user`。
* 如果 token 无效或缺失，系统会返回 401 Unauthorized 错误。

**3. 使用权限控制**

在后端，使用 **permissions** 来控制不同用户的访问权限。

* **IsAuthenticated** : 只允许已认证的用户访问。
* **IsAdminUser** : 只允许管理员用户访问。
* **Custom Permission** : 根据自定义规则决定是否允许访问。正是前文所述的自定义permission

可以通过后台管理我们的token

![1734689151275](image/report/1734689151275.png)

### d. urls.py

我们在这里为 API 配置路由

由于我们使用了ViewSet，我们可以在这里使用 `DefaultRouter` 为 ViewSet 自动生成路由。

```
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import HotelViewSet, RoomViewSet, BookingViewSet, UserViewSet

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'hotels', HotelViewSet)
router.register(r'rooms', RoomViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'users', UserViewSet, basename='user')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
```

在 `my_hotel.urls.py`中，将我们app的路由加入

```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('hotel.urls')),
]

```

### e. 后端运行

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

以管理员进入 `http://127.0.0.1:8000/` 我们可以在这里看到所有的api 并且测试api的效果，已经查看信息的格式

![1734688553641](image/report/1734688553641.png)

如：get

![1734688597880](image/report/1734688597880.png)

search

![1734688641257](image/report/1734688641257.png)

### f. api

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

## 7. 功能介绍

### a. customer

#### 1. 用户注册

进入注册界面进行注册

![1734703743648](image/report/1734703743648.png)

可以看到注册成功

![1734703760044](image/report/1734703760044.png)

#### 2. 用户登录

来到登录界面我们使用刚才注册的账号登录

![1734703802612](image/report/1734703802612.png)

可以看到登录成功

![1734703827368](image/report/1734703827368.png)

#### 3. 酒店查询

#### 4. 酒店预订

#### 5. 预定查询/修改

### b. manager

### 1. 酒店信息管理

进入酒店信息管理界面 我们可以看到所有的酒店

![1734703947716](image/report/1734703947716.png)

+ 我们可以进行修改

![1734703992504](image/report/1734703992504.png)

+ 可以看到成功进行修改

![1734704020002](image/report/1734704020002.png)

+ 也可以搜索酒店

![1734704067231](image/report/1734704067231.png)

![1734704077791](image/report/1734704077791.png)

+ 也可以删除酒店

![1734704113620](image/report/1734704113620.png)

+ 同样可以添加回来

![1734704158344](image/report/1734704158344.png)

### 2. 房间管理

查看房间信息

![1734704278191](image/report/1734704278191.png)

修改信息

![1734704321243](image/report/1734704321243.png)

增加删除

![1734704347835](image/report/1734704347835.png)

![1734704356422](image/report/1734704356422.png)

### 3. 预定管理

### 4. 用户管理

在这里可以管理用户信息

可以看到我们前面所注册的新用户账户user_test3

![1734704379778](image/report/1734704379778.png)

可以进行修改

![1734704513631](image/report/1734704513631.png)

同样新增删除

![1734704556116](image/report/1734704556116.png)

![1734704564083](image/report/1734704564083.png)

## 8. 项目总结

该项目是一个  **酒店预订管理系统** ，使用 **Django** 作为后端框架，**PostgreSQL** 作为数据库管理系统，前端部分可以选择 **Vue.js** 作为展示界面。系统主要功能包括用户管理、酒店管理、房间预订、预定历史等。

### 关键功能模块

1. **用户管理** ：

* 用户可以分为 **顾客 (Customer)** 和  **管理员 (Manager)** ，两者有不同的权限。
* 顾客只能进行房间查询和预定，而管理员可以进行酒店管理、房间管理等操作。
* 用户通过 **Django Rest Framework** 提供的 API 进行登录、注册，使用 **JWT token** 进行身份验证。

2. **酒店管理** ：

* 酒店管理员可以管理酒店信息，如酒店名称、地址等。
* 管理员还可以管理房间的添加、删除、修改等操作。

3. **预定系统** ：

* 顾客可以查看房间信息，并进行预订。
* 预订信息包括入住日期、退房日期、房间类型等。
* 系统支持查询和管理预定记录，包括查询订单历史等功能。

4. **权限管理** ：

* 使用 **Django 自带的权限系统** 进行角色管理，顾客和管理员有不同的权限。
* 使用 **JWT token** 进行身份认证，确保只有经过授权的用户能够访问特定的资源。

5. **前端与后端交互** ：

* 前端通过发送 HTTP 请求（如 GET、POST、PUT 等）与后端 API 进行交互。
* 前端请求可以包含 JWT token，后端通过权限验证用户身份。

### 技术栈

* **后端框架** ：Django + Django Rest Framework (DRF)
* **数据库** ：PostgreSQL
* **前端框架** ：Vue.js
* **认证方式** ：JWT (JSON Web Token)
* **部署** ：可能涉及 Docker、Nginx 等工具

### 结语

+ 后端：

作为一个不大不小的非常经典类型的项目，其实并未有什么创新在里面，也都不是什么高深的技术，内容虽然有些乏善可陈，但是在一步一步开发的过程中，逐渐看到项目完备起来，还是有喜悦在其中的，从中也是学到了很多。总之，虽然内容略显陈旧无趣，开发的过程并不枯燥。
