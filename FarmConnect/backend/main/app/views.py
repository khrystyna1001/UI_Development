from rest_framework.viewsets import ModelViewSet
from .models import BlogPost, Product, Farm, GalleryImage, Review, Message
from .serializer import BlogPostSerializer, ProductSerializer, FarmSerializer, GalleryImageSerializer, ReviewSerializer, MessageSerializer

# Create your views here.

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
    
