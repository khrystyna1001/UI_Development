from rest_framework import serializers
from app.models import BlogPost, Product, Review, Message, GalleryImage, Farm, Chat, Cart, CartItem, FavoriteBlog, Notification
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer

# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        read_only_fields = ('email',)

class UserRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True) 

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
        }
    
    def validate(self, data):
        data = super().validate(data)
        if data.get('password1') != data.get('password2'):
             raise serializers.ValidationError({"password2": "The two password fields didn't match."})
        return data

    def save(self, request):
        return super().save(request)


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
    products = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Product.objects.all(),
        required=False
    )
    
    class Meta:
        model = Farm
        fields = [
            'id',
            'name',
            'location',
            'description',
            'user',
            'user_info',
            'products',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        products_data = validated_data.pop('products', [])
        farm = Farm.objects.create(**validated_data)
        farm.products.set(products_data)
        return farm

    def update(self, instance, validated_data):
        products_data = validated_data.pop('products', None)
        if products_data is not None:
            instance.products.set(products_data)
        return super().update(instance, validated_data)

# Product
class ProductSerializer(serializers.ModelSerializer):
    author_info = UserSerializer(source='author', read_only=True)
    farms_info = FarmSerializer(source='farms', many=True, read_only=True)
    farms = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Farm.objects.all(),
        required=False
    )

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
            'farms',
            'farms_info',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        farms_data = validated_data.pop('farms', [])
        product = Product.objects.create(**validated_data)
        product.farms.set(farms_data)
        return product

    def update(self, instance, validated_data):
        farms_data = validated_data.pop('farms', None)
        if farms_data is not None:
            instance.farms.set(farms_data)
        return super().update(instance, validated_data)


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

# Cart
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'added_at', 'updated_at']
        read_only_fields = ['added_at', 'updated_at']
    
    def create(self, validated_data):
        cart = self.context['request'].user.cart
        product = validated_data['product']
        quantity = validated_data.get('quantity', 1)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
            
        return cart_item

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# FavoriteBlog
class FavoriteBlogSerializer(serializers.ModelSerializer):
    blog_post = BlogPostSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = FavoriteBlog
        fields = ['id', 'user', 'blog_post', 'created_at']
        read_only_fields = ['id', 'created_at']

# Notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'content', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']