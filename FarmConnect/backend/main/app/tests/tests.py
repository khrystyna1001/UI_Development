from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from faker import Faker
from .models import BlogPost, Product, Review, Message, GalleryImage, Farm
from .serializer import BlogPostSerializer, ProductSerializer, ReviewSerializer

# Create your tests here.

class APITestCase(TestCase):
    """
    Base test case for setting up the API client and common data,
    including a Faker instance.
    """
    def setUp(self):
        # Initialize API Client and Faker
        self.client = APIClient()
        self.fake = Faker()

        # --- Product Setup ---
        self.product_data = {
            'name': self.fake.word(ext_word_list=['Organic Apples', 'Heirloom Tomatoes', 'Fresh Honey']),
            'description': self.fake.text(max_nb_chars=100),
            'price': round(self.fake.pyfloat(left_digits=1, right_digits=2, positive=True, min_value=0.50, max_value=10.00), 2)
        }
        self.product = Product.objects.create(**self.product_data)
        self.product_list_url = reverse('products-list')
        self.product_detail_url = reverse('products-detail', kwargs={'pk': self.product.pk})

        # --- BlogPost Setup ---
        self.blog_post_data = {
            'title': self.fake.sentence(nb_words=5),
            'summary': self.fake.paragraphs(nb=3, ext_word_list=None),
            'author': self.fake.name()
        }
        self.blog_post = BlogPost.objects.create(**self.blog_post_data)
        self.blog_list_url = reverse('blog-list')
        self.blog_detail_url = reverse('blog-detail', kwargs={'pk': self.blog_post.pk})

        # --- Review Setup ---
        self.review_data = {
            'name': self.fake.text(max_nb_chars=50),
            'rating': self.fake.random_int(min=1, max=5),
            'text': self.fake.sentence(),
        }
        self.review = Review.objects.create(**self.review_data)
        self.review_list_url = reverse('reviews-list')
        self.review_detail_url = reverse('reviews-detail', kwargs={'pk': self.review.pk})