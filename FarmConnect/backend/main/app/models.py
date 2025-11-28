from django.db import models
from django.contrib.auth.models import User

# Create your models here.

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
    category = models.CharField(max_length=100, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    category = models.CharField(max_length=100, default="")

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
        related_name='products',
        null=True,
        blank=True,
    )

    blog_post = models.ForeignKey(
        BlogPost,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='blogs'
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
        

class Message(models.Model):
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages',
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages',
    )

    title = models.CharField(max_length=100, null=True)
    content = models.CharField(max_length=200)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=~models.Q(sender=models.F('receiver')),
                name='sender_is_not_receiver'
            )
        ]

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"

class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/', default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Farm(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
        