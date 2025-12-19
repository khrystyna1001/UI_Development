from app.tests.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from app.models import FavoriteBlog, BlogPost

class FavoriteBlogViewSetTests(APITestCase):
    # GET /favorites/
    def test_list_favorite_blogs(self):
        response = self.client.get(self.favorite_blog_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.favorite_blog.id)

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

    # Test that user cannot favorite their own blog
    # def test_cannot_favorite_own_blog(self):
    #     own_blog = BlogPost.objects.create(
    #         title=self.fake.text(max_nb_chars=80),
    #         content=self.fake.text(max_nb_chars=100),
    #         author=self.test_user,
    #         reads=0,
    #     )
        
    #     # Pass the PK here!
    #     toggle_url = reverse('favorite-blog-toggle', kwargs={'pk': own_blog.id})
        
    #     response = self.client.post(toggle_url)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('You cannot favorite your own blog post', str(response.data))

    # TOGGLE
    def test_toggle_favorite_action(self):
        new_blog = BlogPost.objects.create(
            title="Toggle Test",
            content="Content",
            author=self.second_user,
            category=BlogPost.BlogPostCategories.choices[0][0]
        )
        
        toggle_url = reverse('favorite-blog-toggle', kwargs={'pk': new_blog.id})
        
        # First toggle: Create
        response = self.client.post(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('is_favorite'))
        
        # Second toggle: Delete
        response = self.client.post(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data.get('is_favorite'))