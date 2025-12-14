from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from faker import Faker
from django.contrib.auth.models import User
from app.models import BlogPost, Product, Review, Message, GalleryImage, Farm, Chat
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.

class APITestCase(TestCase):
    """
    Base test case for setting up the API client and common data,
    including a Faker instance.
    """
    def setUp(self):
        self.client = APIClient()
        self.fake = Faker()

        # --- CREATE USER ---
        self.test_user = User.objects.create_user(
            username=self.fake.user_name(),
            password=self.fake.password(),
        )
        self.second_user = User.objects.create_user(
            username=self.fake.user_name(),
            password=self.fake.password(),
        )

        # --- INTIALIZE TOKENS ---
        self.token1 = RefreshToken.for_user(self.test_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token1.access}')

        self.token2 = RefreshToken.for_user(self.second_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token2.access}')

        # --- Farm Setup ---
        self.farm_data = {
            'name': self.fake.company(),
            'location': self.fake.city() + ", " + self.fake.country(),
            'description': self.fake.paragraph(nb_sentences=2),
            'user': self.test_user,
        }
        self.farm = Farm.objects.create(**self.farm_data)
        self.farm_list_url = reverse('farms-list')
        self.farm_detail_url = reverse('farms-detail', kwargs={'pk': self.farm.pk})

        # --- BlogPost Setup ---
        valid_categories = [choice[0] for choice in BlogPost.BlogPostCategories.choices]
        valid_category = valid_categories[0]
        self.blog_post_data = {
            'title': self.fake.text(max_nb_chars=80),
            'content': self.fake.text(max_nb_chars=100),
            'author': self.test_user,
            'reads': 0,
            'category': valid_category,
        }
        self.blog_post = BlogPost.objects.create(**self.blog_post_data)
        self.blog_list_url = reverse('blog-list')
        self.blog_detail_url = reverse('blog-detail', kwargs={'pk': self.blog_post.pk})

        # --- Product Setup ---
        valid_categories = [choice[0] for choice in Product.ProductCategories.choices]
        valid_category = valid_categories[0]
        self.product_data = {
            'name': self.fake.word(ext_word_list=['Organic Apples', 'Heirloom Tomatoes', 'Fresh Honey']),
            'description': self.fake.text(max_nb_chars=100),
            'price': round(self.fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=0.50, max_value=10.00), 1),
            'category': valid_category,
            'quantity': 50,
            'author': self.test_user,
        }
        self.product = Product.objects.create(**self.product_data)
        self.product.farms.add(self.farm)
        self.product_list_url = reverse('products-list')
        self.product_detail_url = reverse('products-detail', kwargs={'pk': self.product.pk})

        # --- Review Setup ---
        self.review_data = {
            'content': self.fake.text(max_nb_chars=50),
            'rating': self.fake.random_int(min=1, max=5),
            'author': self.second_user,
            'product': self.product,
        }
        self.review = Review.objects.create(**self.review_data)
        self.review_list_url = reverse('reviews-list')
        self.review_detail_url = reverse('reviews-detail', kwargs={'pk': self.review.pk})

        # --- Chat Setup ---
        self.chat_data = {
            'user1': self.test_user,
            'user2': self.second_user
        }

        self.chat = Chat.objects.create(**self.chat_data)
        self.chat_list_url = reverse('chats-list')
        self.chat_detail_url = reverse('chats-detail', kwargs={'pk': self.chat.pk})

        # --- Message Setup ---
        self.message_data = {
            'chat': self.chat,
            'sender': self.test_user,
            'content': self.fake.text(max_nb_chars=150),
            'read': False,
        }
        self.message = Message.objects.create(**self.message_data)
        self.message_list_url = reverse('messages-list')
        self.message_detail_url = reverse('messages-detail', kwargs={'pk': self.message.pk})

        # --- Gallery Setup ---
        self.image_file = SimpleUploadedFile(
            name='test_image.gif',
            content=b'\x47\x49\x46\x38\x39\x61\x06\x00\x06\x00\xf0\x00\x00\x00\x00\x00\x00\x00\x00\x21\xf9\x04\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x06\x00\x06\x00\x02\x02\x4c\x01\x00\x3b',
            content_type='image/gif'
        )
        self.gallery_data = {
            'title': self.fake.sentence(nb_words=3),
            'image': self.image_file,
        }
        self.gallery_image = GalleryImage.objects.create(**self.gallery_data)
        self.gallery_list_url = reverse('gallery-list')
        self.gallery_detail_url = reverse('gallery-detail', kwargs={'pk': self.gallery_image.pk})


    def tearDown(self):
        super().tearDown()
        if self.gallery_image.image:
            self.gallery_image.image.delete(save=False)