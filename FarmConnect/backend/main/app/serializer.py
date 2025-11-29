from rest_framework import serializers
from app.models import BlogPost, Product, Review, Message, GalleryImage, Farm
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for displaying read-only User information."""
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'is_superuser',
            'password'
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'is_superuser'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class BlogPostSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)

    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'content',
            'author',
            'author_info',
            'reads',
            'category',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'reads']

class ProductSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'quantity',
            'category',
            'author',
            'author_info',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class ReviewSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)

    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )

    class Meta:
        model = Review
        fields = [
            'id',
            'author',
            'author_info',
            'content',
            'rating',
            'product',
            'blog_post',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'receiver',
            'title',
            'content',
            'read',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = [
            'id',
            'title',
            'image',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            'id',
            'name',
            'location',
            'description',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']