from tests import APITestCase
from rest_framework import status
from faker import Faker
from .models import Review
from .serializer import ReviewSerializer

class ReviewViewSetTests(APITestCase):
"""
Tests for the ReviewViewSet (CRUD operations).
"""

    def test_list_reviews(self):
        """Ensure we can list all reviews."""
        response = self.client.get(self.review_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_review(self):
        """Ensure we can create a new review."""
        new_review_data = {
            'name': self.fake.text(max_nb_chars=50),
            'rating': self.fake.random_int(min=1, max=5),
            'text': self.fake.text(max_nb_chars=50),
        }
        response = self.client.post(self.review_list_url, new_review_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 2)

    def test_update_review(self):
        """Ensure we can update an existing review using PUT."""
        updated_data = {
            'name': self.fake.text(max_nb_chars=50),
            'rating': 5,
            'text': self.fake.text(max_nb_chars=100),
        }
        response = self.client.put(self.review_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.review.refresh_from_db()
        self.assertEqual(self.review.rating, 5)

    def test_delete_review(self):
        """Ensure we can delete a review."""
        response = self.client.delete(self.review_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)