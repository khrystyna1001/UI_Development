from django.db import models
from django.contrib.auth.models import User

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

    farm = models.ForeignKey(
        Farm, 
        on_delete=models.SET_NULL, 
        related_name='products',
        null=True, 
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
        