"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app.views import BlogPostViewSet, ProductViewSet, ReviewViewSet, MessageViewSet, GalleryViewSet, FarmViewSet, SignupView, MyDataView, LogoutView, UserViewSet, ChatViewSet, CartViewSet, FavoriteBlogViewSet, CartItemViewSet, NotificationViewSet
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()

# Content Management APIs
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'gallery', GalleryViewSet, basename='gallery')

# E-commerce APIs  
router.register(r'products', ProductViewSet, basename='products')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'favorites', FavoriteBlogViewSet, basename='favorite-blog')

# Farm Management APIs
router.register(r'farms', FarmViewSet, basename='farms')

# Communication APIs
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'chats', ChatViewSet, basename='chats')
router.register(r'notifications', NotificationViewSet, basename='notification')

# User Management APIs
router.register(r'users', UserViewSet, basename='users')
urlpatterns = [
    path("admin/", admin.site.urls),
    path('app/', include(router.urls)),
    path('auth/', include('django.contrib.auth.urls')),
    path('api/signup/', SignupView.as_view()),
    path('api/mydata/', MyDataView.as_view(), name='my-data'),
    path('api/logout/', LogoutView.as_view()),

    # Enhanced API Documentation
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Update dj-rest-auth URLs to use JWT
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'), name='rest_register'),
] 

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

