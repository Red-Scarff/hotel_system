from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

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
        null=True
    )

    def __str__(self):
        return f"预订 - {self.customer_name} - {self.room}"

    class Meta:
        verbose_name = "预订"
        verbose_name_plural = "预订管理"
        ordering = ["-check_in_date"]

