from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import GalleryImage
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
import os

class GalleryImageViewSetTests(APITestCase):
    # GET /gallery/
    def test_list_gallery_images(self):
        response = self.client.get(self.gallery_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.gallery_data['title'])
    # POST /gallery/
    def test_create_gallery_image(self):
        new_image_file = SimpleUploadedFile(
            name='new_image.gif',
            content=b'\x47\x49\x46\x38\x39\x61\x06\x00\x06\x00\xf0\x00\x00\x00\x00\x00\x00\x00\x00\x21\xf9\x04\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x06\x00\x06\x00\x02\x02\x4c\x01\x00\x3b',
            content_type='image/gif'
        )
        new_gallery_data = {
            'title': 'Brand New Image',
            'image': new_image_file,
        }
        response = self.client.post(self.gallery_list_url, new_gallery_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GalleryImage.objects.count(), 2)

        new_image = GalleryImage.objects.get(pk=response.data['id'])
        new_image.image.delete(save=False)
    # GET /gallery/{ID}/
    def test_retrieve_gallery_image(self):
        response = self.client.get(self.gallery_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.gallery_data['title'])
    # PUT /gallery/{ID}/
    def test_update_gallery_image(self):
        self.gallery_image.refresh_from_db()
        updated_image_file = SimpleUploadedFile(
            name='updated_image.gif',
            content=b'\x47\x49\x46\x38\x39\x61\x06\x00\x06\x00\xf0\x00\x00\x00\x00\x00\x00\x00\x00\x21\xf9\x04\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x06\x00\x06\x00\x02\x02\x4c\x01\x00\x3b',
            content_type='image/gif'
        )
        updated_data = {
            'title': self.gallery_image.title + " Updated",
            'image': updated_image_file,
        }

        response = self.client.put(self.gallery_detail_url, updated_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.gallery_image.refresh_from_db()
        self.assertEqual(self.gallery_image.title, updated_data['title'])
    # PATCH /gallery/{ID}/
    def test_partial_update_gallery_title(self):
        new_title = "Title Updated via PATCH"
        partial_data = {
            'title': new_title
        }
        response = self.client.patch(self.gallery_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.gallery_image.refresh_from_db()
        self.assertEqual(self.gallery_image.title, new_title)
        self.assertTrue(bool(self.gallery_image.image))
    # DELETE /gallery/{ID}/
    def test_delete_gallery_image(self):
        response = self.client.delete(self.gallery_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(GalleryImage.objects.count(), 0)