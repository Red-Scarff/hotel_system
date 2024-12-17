from django.shortcuts import render

from rest_framework import viewsets, status, permissions

from .models import Hotel, Room, Booking
from hotel.serializers import HotelSerializer, RoomSerializer, BookingSerializer, UserSerializer
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .permissions import IsCustomerReadOnly


class HotelViewSet(viewsets.ModelViewSet):

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsCustomerReadOnly]
    
class RoomViewSet(viewsets.ModelViewSet):

    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    
class BookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            if user.is_customer():
                return Response({'message': 'Logged in as Customer'}, status=status.HTTP_200_OK)
            elif user.is_manager():
                return Response({'message': 'Logged in as Hotel Manager'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Role not recognized'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    """
    用户视图集合: 提供增删改查以及注册功能
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # 允许任何人访问（注册）

    def get_permissions(self):
        """
        根据请求方法设置不同权限
        """
        if self.action == 'create':  # 注册
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]  # 其他操作需要认证
