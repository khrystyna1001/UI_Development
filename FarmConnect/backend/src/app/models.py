from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError

# Create your models here.


# BlogPost
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=100, default="")

    author = models.ForeignKey(
            User,
            on_delete=models.SET_NULL,
            related_name='blogs',
            null=True,
            blank=True,
        )

    reads = models.IntegerField(default=0)

    class BlogPostCategories(models.TextChoices):
        GARDENING = "Gardening"
        RECIPES = "Recipes"
        FARMING = "Farming"

    category = models.CharField(
        max_length=100, 
        choices=BlogPostCategories, 
        default=BlogPostCategories.GARDENING
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class FavoriteBlog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    favorited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'blog_post') 

    def toggle_favorite(request, blog_id):
        blog = BlogPost.objects.get(id=blog_id)
        user = request.user

        if blog.author == user:
            return {'error': "You cannot favorite your own blog."}, 403

        favorite, created = FavoriteBlog.objects.get_or_create(user=user, blog_post=blog)
        
        if not created:
            favorite.delete()
            return {'success': 'Blog removed from favorites.'}
        else:
            return {'success': 'Blog added to favorites.'}

    def view_favorites(request):
        user = request.user
        
        favorited_blogs = BlogPost.objects.filter(favorite__user=user).order_by('-favorite__favorited_at')

        return {'blogs': [blog.title for blog in favorited_blogs]}

    def __str__(self):
        return f"{self.user.username} favorited {self.blog_post.title}"

# Farm
class Farm(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='farms',
        default=1,
    )
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

# Product
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)

    class ProductCategories(models.TextChoices):
        VEGETABLE = "Vegetable"
        EGGS = "Eggs"
        GOODS = "Goods"
        MEAT = "Meat"
        FRUIT = "Fruit"

    category = models.CharField(
        max_length=100, 
        choices=ProductCategories, 
        default=ProductCategories.GOODS
        )

    farms = models.ManyToManyField(
        Farm, 
        related_name='products',
        blank=True
    )

    author = models.ForeignKey(
            User,
            on_delete=models.SET_NULL,
            related_name='products',
            null=True,
            blank=True,
        )

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    def __str__(self):
        return self.name
        
# Review
class Review(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="submitted_reviews",
        null = True,
        blank = True,
    )

    content = models.TextField()
    rating = models.IntegerField(default=0, choices=[(i, i) for i in range(1, 6)])

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews',
        null=True,
        blank=True,
    )

    blog_post = models.ForeignKey(
        BlogPost,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(product__isnull=False) | models.Q(blog_post__isnull=False),
                name='review_must_have_product_or_blogpost'
            ),
        ]

    def __str__(self):
        if self.product:
            return f"Review by {self.author.username} for Product: {self.product.name}"
        elif self.blog_post:
            return f"Review by {self.author.username} for Blog: {self.blog_post.title}"
        return f"Review by {self.author.username}"

# Chat & Message 
class Chat(models.Model):
    user1 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='chats_as_user1', 
    )

    user2 = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='chats_as_user2',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name='messages',
        null=True,
    )
    
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages_in_chat',
    )
    content = models.CharField(max_length=200)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Message from {self.sender.username} in chat {self.chat_id}"

# GalleryImage
class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/', default="")
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='gallery_images',
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class Cart(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='cart',
        help_text='The user who owns this cart.'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def item_count(self):
        return self.items.count()

    def __str__(self):
        return f"Cart for {self.user.username} ({self.item_count} items)"

    def add_to_cart(request, product_id):
        product = Product.objects.get(id=product_id)
        user = request.user

        if product.owner == user:
            return {'error': "You cannot add your own product to the cart."}, 403
        
        try:
            cart_item = CartItem.objects.get(user=user, product=product)
            cart_item.quantity += 1
            cart_item.save()
        except CartItem.DoesNotExist:
            CartItem.objects.create(user=user, product=product, quantity=1)

        return {'success': 'Product added to cart.'}
    
    def remove_from_cart(request, product_id):
        user = request.user
        
        CartItem.objects.filter(user=user, product_id=product_id).delete()

        return {'success': 'Product removed from cart.'}

    def make_purchase(request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user).select_related('product')
        
        if not cart_items.exists():
            return {'error': 'Your cart is empty.'}, 400

        products_to_update = []
        
        try:
            for item in cart_items:
                product = item.product
                
                if product.owner == user:
                    raise Exception(f"Product ID {product.id} is owned by user and cannot be purchased.")

                if product.quantity < item.quantity:
                    raise Exception(f"Insufficient stock for {product.name}. Only {product.quantity} remaining.")

                product.quantity -= item.quantity
                products_to_update.append(product)

            for product in products_to_update:
                product.save()

            cart_items.delete()
            
            return {'success': 'Purchase complete!'}, 200

        except Exception as e:
            return {'error': f'Purchase failed: {str(e)}'}, 500


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items',
    )
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='cart_items',
    )
    quantity = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
    )
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.quantity}x {self.product.name} in cart (${self.total_price})"


class FavoriteBlog(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='favorite_blogs',
    )
    blog_post = models.ForeignKey(
        'BlogPost',
        on_delete=models.CASCADE,
        related_name='favorited_by',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def clean(self):
        if self.blog_post.author == self.user:
            raise ValidationError("You cannot favorite your own blog post.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} favorited {self.blog_post.title}"