from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import action
from django.db import transaction

from app.models import BlogPost, Product, Farm, GalleryImage, Review, Message, User, Chat, FavoriteBlog, Cart, CartItem
from app.serializer import BlogPostSerializer, ProductSerializer, FarmSerializer, GalleryImageSerializer, ReviewSerializer, MessageSerializer, UserRegisterSerializer, UserSerializer, ChatSerializer, FavoriteBlogSerializer, CartSerializer, CartItemSerializer

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

    def get_queryset(self):
        return Message.objects.filter(
            Q(chat__user1=self.request.user) | 
            Q(chat__user2=self.request.user)
        ).select_related('chat', 'sender').order_by('-updated_at')

    def perform_create(self, serializer):
        chat_id = self.request.data.get('chat')
        chat = get_object_or_404(
            Chat.objects.filter(
                Q(user1=self.request.user) | Q(user2=self.request.user),
                id=chat_id
            )
        )
        serializer.save(sender=self.request.user, chat=chat)

class ChatViewSet(ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(Q(user1=user) | Q(user2=user)).order_by('-updated_at')

    @extend_schema(
        request={'user2': {'type': 'integer', 'description': 'ID of recipient user.'}},
        responses={
            status.HTTP_201_CREATED: ChatSerializer,
            status.HTTP_200_OK: ChatSerializer,
            status.HTTP_400_BAD_REQUEST: None,
            status.HTTP_404_NOT_FOUND: None,
        }
    )

    def create(self, request, *args, **kwargs):
        user1 = request.user
        user2_id = request.data.get('user2')

        if not user2_id:
            return Response(
                {'error': 'User2 ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user2 = User.objects.get(id=user2_id)
        except User.DoesNotExist:
            return Response(
                {'error': 'User2 not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if user1 == user2:
            return Response(
                {'error': 'You cannot chat with yourself'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        sorted_users = sorted([user1.pk, user2.pk])
        u1_pk, u2_pk = sorted_users[0], sorted_users[1]

        existing_chat = Chat.objects.filter(
            Q(user1_id=u1_pk) & Q(user2_id=u2_pk)
        ).first()
        
        if existing_chat:
            serializer = self.get_serializer(existing_chat)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        new_chat = Chat.objects.create(
            user1=User.objects.get(id=u1_pk),
            user2=User.objects.get(id=u2_pk)
        )

        serializer = self.get_serializer(new_chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GalleryViewSet(ModelViewSet):
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()

class FarmViewSet(ModelViewSet):
    serializer_class = FarmSerializer
    queryset = Farm.objects.all()

class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.prefetch_related('items__product').filter(user=self.request.user)

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if product.author == request.user:
            return Response(
                {"error": "You cannot add your own product to cart"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if product.quantity < quantity:
            return Response(
                {"error": "Not enough stock available"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            if cart_item.quantity > product.quantity:
                return Response(
                    {"error": "Adding this quantity would exceed available stock"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        cart = self.get_object()
        
        with transaction.atomic():
            for item in cart.items.all():
                if item.quantity > item.product.quantity:
                    return Response(
                        {"error": f"Not enough stock for {item.product.name}"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            for item in cart.items.all():
                item.product.quantity -= item.quantity
                item.product.save()
            
            cart.items.all().delete()
        
        return Response({"message": "Checkout successful"}, status=status.HTTP_200_OK)


class CartItemViewSet(ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def perform_destroy(self, instance):
        if instance.cart.user != self.request.user:
            logger.error("You don't have permission to delete this item.")
        instance.delete()


class FavoriteBlogViewSet(ModelViewSet):
    serializer_class = FavoriteBlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FavoriteBlog.objects.filter(user=self.request.user).select_related('blog_post')

    def create(self, request, *args, **kwargs):
        blog_post_id = request.data.get('blog_post')
        blog_post = get_object_or_404(BlogPost, id=blog_post_id)
        
        if blog_post.author == request.user:
            return Response(
                {"error": "You cannot favorite your own blog post"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        favorite, created = FavoriteBlog.objects.get_or_create(
            user=request.user,
            blog_post=blog_post
        )
        
        if not created:
            return Response(
                {"message": "Blog post already in favorites"}, 
                status=status.HTTP_200_OK
            )
            
        serializer = self.get_serializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        blog_post_id = kwargs.get('pk')
        favorite = get_object_or_404(
            FavoriteBlog, 
            user=request.user, 
            blog_post_id=blog_post_id
        )
        self.perform_destroy(favorite)
        return Response(status=status.HTTP_204_NO_CONTENT)


class MyDataView(generics.RetrieveAPIView):
    serializer_class = UserSerializer 

    def get_object(self):
        return self.request.user

class LogoutView(generics.CreateAPIView):
    serializer_class = UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

