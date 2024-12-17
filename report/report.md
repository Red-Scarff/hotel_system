# **数据库系统实验课程设计项目**

| 姓名   | 学号     |
| ------ | -------- |
| 徐子鑫 | 22336267 |
| 王志杰 | 22331095 |

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

## 3. 项目总览

### a. 后台数据库设计 (PostgreSQL)

#### 关系模式总结

* **Hotels (HotelID, Name, Location, Phone, Email)**
* **Rooms (RoomID, HotelID, RoomType, Capacity, Price, Description)**
* **Customers (CustomerID, FirstName, LastName, Phone, Email, Address)**
* **Bookings (BookingID, CustomerID, RoomID, CheckInDate, CheckOutDate, TotalPrice, Status)**

---

### b. 后端开发 (Python + Django)

### c. 前端开发 (Vue)

### d. 项目测试

## 4. 后台数据库设计 (PostgreSQL)

#### 数据库关系模式设计

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
  | ---------------- | -------------- | ---------------------------|
  | `BookingID`    | INT (主键)     | 预订唯一标识                 |
  | `CustomerID`   | INT (外键)     | 预订的客户 ID                |
  | `RoomID`       | INT (外键)     | 预订的房间 ID                |
  | `CheckInDate`  | DATE           | 入住日期                     |
  | `CheckOutDate` | DATE           | 退房日期                     |
  | `TotalPrice`   | DECIMAL(10, 2) | 总价格                       |
  | `Status`       | VARCHAR(20)    | 预订状态（如已确认、已取消） |



#### 满足3NF的验证

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

## 6. 前端开发 (Vue)

## 7. 项目整合

## 8. 项目测试与优化

## 9. 功能介绍

## 10. 项目总结
