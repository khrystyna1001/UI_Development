from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import BlogPost
from app.serializer import BlogPostSerializer

class BlogViewSetTests(APITestCase):
    # GET /blogs/
    def test_list_blogs(self):
        response = self.client.get(self.blog_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.blog_post_data['title'])

    # POST /blogs/
    def test_create_blog_post(self):
        new_blog_data = {
            'title': self.fake.text(max_nb_chars=80),
            'content': self.fake.text(max_nb_chars=100),
            'category': 'New Category',
            'author': self.test_user.pk
        }
        response = self.client.post(self.blog_list_url, new_blog_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BlogPost.objects.count(), 2)
        self.assertEqual(response.data['title'], new_blog_data['title'])
        self.assertEqual(response.data['reads'], 0)

    # GET /blogs/{ID}/
    def test_retrieve_blog_post(self):
        response = self.client.get(self.blog_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.blog_post_data['title'])

    # PUT /blogs/{ID}/
    def test_update_blog_post(self):
        self.blog_post.refresh_from_db()
        updated_data = {
            'title': self.fake.text(max_nb_chars=80) + " UPDATED",
            'content': self.fake.text(max_nb_chars=100),
            'category': 'Updated Tips',
            'reads': self.blog_post.reads,
            'author': self.test_user.pk,
        }
        response = self.client.put(self.blog_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.blog_post.refresh_from_db()
        self.assertEqual(self.blog_post.title, updated_data['title'])

    # PATCH /blogs/{ID}/
    def test_partial_update_blog_title(self):
        new_title = "Only The Title Changed"
        partial_data = {
            'title': new_title
        }
        response = self.client.patch(self.blog_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.blog_post.refresh_from_db()
        self.assertEqual(self.blog_post.title, new_title)

    # DELETE /blogs/{ID}/
    def test_delete_blog_post(self):
        response = self.client.delete(self.blog_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BlogPost.objects.count(), 0)