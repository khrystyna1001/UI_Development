from django.contrib import admin
from .models import BlogPost, Product, Review, Farm, GalleryImage, Message, Chat

# Register your models here.

admin.site.register(BlogPost)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Farm)
admin.site.register(GalleryImage)
admin.site.register(Message)
admin.site.register(Chat)
