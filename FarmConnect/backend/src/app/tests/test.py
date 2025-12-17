from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from faker import Faker
from django.contrib.auth.models import User
from app.models import BlogPost, Product, Review, Message, GalleryImage, Farm, Chat, CartItem, Cart, FavoriteBlog
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.

class APITestCase(TestCase):
    """
    Base test case for setting up the API client and common data,
    including a Faker instance.
    """
    def _register_and_login_user(self, user_data, password, is_main_user=True):
        response = self.client.post(self.signup_url, user_data, format='json')
        if response.status_code != 201:
            raise Exception(f"Failed to register user: {response.data}")
        
        login_response = self.client.post(
            self.token_obtain_pair_url,
            {'username': user_data['username'], 'password': password},
            format='json'
        )
        if login_response.status_code != 200:
            raise Exception(f"Failed to login user: {login_response.data}")
        
        tokens = login_response.data
        
        if is_main_user:
            self.access_token1 = tokens['access']
            self.refresh_token1 = tokens['refresh']
            self.test_user = User.objects.get(username=user_data['username'])
            self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token1}')
        else:
            self.access_token2 = tokens['access']
            self.refresh_token2 = tokens['refresh']
            return User.objects.get(username=user_data['username'])
        
        return tokens

    def setUp(self):
        self.client = APIClient()
        self.fake = Faker()

        self.signup_url = reverse('rest_register')
        self.token_obtain_pair_url = reverse('token_obtain_pair')

        # --- User 1 Credentials and Registration ---
        self.user1_password = self.fake.password()
        self.user1_data = {
            'username': self.fake.user_name(),
            'email': self.fake.email(),
            'password1': self.user1_password,
            'password2': self.user1_password,
        }
        
        self._register_and_login_user(self.user1_data, self.user1_password, is_main_user=True)
        
        # --- User 2 Credentials and Registration ---
        self.user2_password = self.fake.password()
        self.user2_data = {
            'username': self.fake.user_name(),
            'email': self.fake.email(),
            'password1': self.user2_password,
            'password2': self.user2_password,
        }
        
        self.second_user = self._register_and_login_user(self.user2_data, self.user2_password, is_main_user=False)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token1}')
        
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
            'author': self.second_user,
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

        # --- MyData Setup ---
        self.my_data = self.test_user
        self.my_data_url = reverse('my-data')

        # --- Cart Setup ---
        self.cart = Cart.objects.create(user=self.test_user)
        self.cart_item_data = {
            'cart': self.cart.id,
            'product': self.product.id, 
            'quantity': 1
        }
        self.cart_item = CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=1
        )
        self.cart_list_url = reverse('cart-list')
        self.cart_detail_url = reverse('cart-detail', kwargs={'pk': self.cart.id})
        self.cart_item_list_url = reverse('cart-item-list')
        self.cart_item_detail_url = reverse('cart-item-detail', kwargs={'pk': self.cart_item.pk})

        # --- Favorite Blog Setup ---
        self.favorite_blog_data = {
            'user': self.test_user,
            'blog_post': self.blog_post
        }
        self.favorite_blog = FavoriteBlog.objects.create(**self.favorite_blog_data)
        self.favorite_blog_list_url = reverse('favorite-blog-list')
        self.favorite_blog_detail_url = reverse('favorite-blog-detail', kwargs={'pk': self.favorite_blog.pk})

        # --- Logout Setup ---
        self.logout_url = reverse('logout')


    def tearDown(self):
        super().tearDown()
        if self.gallery_image.image:
            self.gallery_image.image.delete(save=False)