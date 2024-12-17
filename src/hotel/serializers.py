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

class UserSerializer(serializers.ModelSerializer):
    # 添加password，并设置 write_only 保证安全性
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # 使用 create_user 方法来创建用户，确保密码是加密的
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
