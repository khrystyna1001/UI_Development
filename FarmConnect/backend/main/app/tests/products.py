from tests import APITestCase
from rest_framework import status
from faker import Faker
from .models import Product
from .serializer import ProductSerializer

class ProductViewSetTests(APITestCase):

    def test_list_products(self):
        """Ensure we can list all products."""
        response = self.client.get(self.product_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.product_data['name'])

    def test_create_product(self):
        """Ensure we can create a new product with mock data."""
        new_product_data = {
            'name': self.fake.color_name() + " " + self.fake.word(),
            'description': self.fake.paragraph(nb_sentences=2),
            'price': round(self.fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=1.00, max_value=20.00), 2)
        }
        response = self.client.post(self.product_list_url, new_product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(response.data['name'], new_product_data['name'])

    def test_retrieve_product(self):
        """Ensure we can retrieve a single product by ID."""
        response = self.client.get(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['price'], str(self.product_data['price']))

    def test_update_product(self):
        """Ensure we can update an existing review using PUT."""
        updated_data = {
            'name': self.fake.color_name() + " " + self.fake.word(),
            'description': self.fake.paragraph(nb_sentences=2),
            'price': round(self.fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=1.00, max_value=20.00), 2)
        }
        response = self.client.put(self.review_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.price, 5)

    def test_delete_product(self):
        """Ensure we can delete a review."""
        response = self.client.delete(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)