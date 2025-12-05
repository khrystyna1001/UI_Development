from rest_framework import serializers
from app.models import BlogPost, Product, Review, Message, GalleryImage, Farm, Chat
from django.contrib.auth.models import User


# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'is_superuser',
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
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


# BlogPost
class BlogPostSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)

    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
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

# Farm
class FarmSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='user', read_only=True)
    
    class Meta:
        model = Farm
        fields = [
            'id',
            'name',
            'location',
            'description',
            'user',
            'user_info',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

# Product
class ProductSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)
    farm_info = FarmSerializer(source='farm', read_only=True)

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
            'farm',
            'farm_info',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


# Review
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


# Message & Chat
class MessageSerializer(serializers.ModelSerializer):
    sender_info = UserSerializer(source='sender', read_only=True)
    class Meta:
        model = Message
        fields = [
            'id',
            'sender_info',
            'chat',
            'content',
            'read',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'sender_info']

class MessageChatSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'content',
            'created_at',
        ]
        read_only_fields = ['created_at']

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageChatSerializer(many=True, read_only=True)
    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)
    class Meta:
        model = Chat
        fields = [
            'id',
            'user1',
            'user2',
            'messages',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


# GalleryImage
class GalleryImageSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)
    class Meta:
        model = GalleryImage
        fields = [
            'id',
            'title',
            'image',
            'author',
            'author_info',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']