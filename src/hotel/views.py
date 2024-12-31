from django.shortcuts import render

from rest_framework import viewsets, status, permissions, filters

from .models import Hotel, Room, Booking
from hotel.serializers import HotelSerializer, RoomSerializer, BookingSerializer, UserSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import action

from rest_framework.views import APIView
from rest_framework.response import Response

from .permissions import IsCustomerReadOnly
from rest_framework.authtoken.models import Token

import django_filters.rest_framework


class HotelViewSet(viewsets.ModelViewSet):

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsCustomerReadOnly]
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ['name', 'location']
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']  # 支持搜索的字段  
    
class RoomViewSet(viewsets.ModelViewSet):

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsCustomerReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'hotel__id', 'room_type']  # 支持搜索的字段  

    
class BookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_name']  # 支持搜索的字段  
    permission_classes = [permissions.IsAuthenticated]

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
