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