from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.response import Response

from app.models import BlogPost, Product, Farm, GalleryImage, Review, Message, User
from app.serializer import BlogPostSerializer, ProductSerializer, FarmSerializer, GalleryImageSerializer, ReviewSerializer, MessageSerializer, UserRegistrationSerializer, UserSerializer

import logging


logger = logging.getLogger(__name__)

# Create your views here.


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BlogPostViewSet(ModelViewSet):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class MessageViewSet(ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class GalleryViewSet(ModelViewSet):
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()

class FarmViewSet(ModelViewSet):
    serializer_class = FarmSerializer
    queryset = Farm.objects.all()

class MyDataView(generics.RetrieveAPIView):
    serializer_class = UserSerializer 

    def get_object(self):
        return self.request.user

class LogoutView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


