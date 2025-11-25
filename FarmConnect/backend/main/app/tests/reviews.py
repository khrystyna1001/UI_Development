from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import Review, Product # Import Product for FK references
from app.serializer import ReviewSerializer

class ReviewViewSetTests(APITestCase):
    # GET /reviews/
    def test_list_reviews(self):
        response = self.client.get(self.review_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['product'], self.product.pk)
    # POST /reviews/
    def test_create_review(self):
        new_review_data = {
            'rating': self.fake.random_int(min=1, max=5),
            'content': self.fake.text(max_nb_chars=100),
            'author': self.test_user.pk,
            'product': self.product.pk,
        }
        response = self.client.post(self.review_list_url, new_review_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 2)
        self.assertEqual(response.data['product'], self.product.pk)
    # GET /reviews/{ID}/
    def test_retrieve_review(self):
        response = self.client.get(self.review_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rating'], self.review.rating)
    # PUT /reviews/{ID}/
    def test_update_review(self):
        self.review.refresh_from_db()
        new_rating = 5 if self.review.rating != 5 else 4
        updated_data = {
            'rating': new_rating,
            'content': self.fake.text(max_nb_chars=100) + " UPDATED",
            'author': self.review.author.pk,
            'product': self.review.product.pk,
            'blog_post': None,
        }

        response = self.client.put(self.review_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.review.refresh_from_db()
        self.assertEqual(self.review.rating, new_rating)
    # PATCH /reviews/{ID}/
    def test_partial_update_review_rating(self):
        new_rating = 5
        partial_data = {
            'rating': new_rating
        }
        response = self.client.patch(self.review_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.review.refresh_from_db()
        self.assertEqual(self.review.rating, new_rating)
    # DELETE /reviews/{ID}/
    def test_delete_review(self):
        response = self.client.delete(self.review_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)