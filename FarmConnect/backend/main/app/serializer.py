from rest_framework import serializers
from .models import BlogPost, Product, Review, Message, GalleryImage, Farm

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'summary', 'author', 'author', 'reads', 'category', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'quantity', 'category', 'created_at', 'updated_at']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['name', 'text', 'rating', 'created_at', 'updated_at']
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'name', 'message', 'read', 'created_at', 'updated_at']

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['image', 'title', 'created_at', 'updated_at']

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['name', 'location', 'description', 'created_at', 'updated_at']