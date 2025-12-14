from app.tests.test import APITestCase
from rest_framework import status
from django.urls import reverse
from app.models import FavoriteBlog, BlogPost

class FavoriteBlogViewSetTests(APITestCase):
    # GET /favorites/
    def test_list_favorite_blogs(self):
        response = self.client.get(self.favorite_blog_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.favorite_blog.id)

    # POST /favorites/
    def test_add_favorite_blog(self):
        new_blog = BlogPost.objects.create(
            title='New Test Blog',
            content='Yet another test blog',
            author=self.second_user,
            reads=0,
            category='farming_tips'
        )
        new_favorite_data = {
            'blog_post': new_blog.id
        }
        response = self.client.post(self.favorite_blog_list_url, new_favorite_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteBlog.objects.count(), 1)

    # GET /favorites/{ID}/
    def test_retrieve_favorite_blog(self):
        response = self.client.get(self.favorite_blog_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.favorite_blog.id)

    # DELETE /favorites/{ID}/
    def test_remove_favorite_blog(self):
        response = self.client.delete(self.favorite_blog_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FavoriteBlog.objects.count(), 0)

    def test_cannot_favorite_own_blog(self):
        own_blog = BlogPost.objects.create(
            title='Own Blog',
            content='This is my own blog',
            author=self.test_user,
            reads=0,
            category='farming_tips'
        )
        
        new_favorite_data = {
            'blog_post': own_blog.id
        }
        response = self.client.post(self.favorite_blog_list_url, new_favorite_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('You cannot favorite your own blog post', str(response.data))

    def test_toggle_favorite_action(self):
        toggle_blog = BlogPost.objects.create(
            title='Toggle Test Blog',
            content='This is a toggle test blog',
            author=self.second_user,
            reads=0,
            category='farming_tips'
        )
        
        toggle_url = reverse('favorite-blog-toggle', kwargs={'pk': toggle_blog.id})
        
        response = self.client.post(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('is_favorite'))
        self.assertEqual(FavoriteBlog.objects.count(), 1) 
        
        response = self.client.post(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data.get('is_favorite'))
        self.assertEqual(FavoriteBlog.objects.count(), 0)