from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import Product
from app.serializer import ProductSerializer

class ProductViewSetTests(APITestCase):
    # GET /products/
    def test_list_products(self):
        response = self.client.get(self.product_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.product_data['name'])
    #POST /products/
    def test_create_product(self):
        valid_categories = [choice[0] for choice in Product.ProductCategories.choices]
        valid_category = valid_categories[0]
        new_product_data = {
            'name': self.fake.color_name() + " " + self.fake.word(),
            'description': self.fake.paragraph(nb_sentences=2),
            'price': round(self.fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=0.50, max_value=10.00), 1),
            'category': valid_category,
            'quantity': 25,
            'author': self.test_user.pk,
            'farm': self.farm.pk,
        }
        response = self.client.post(self.product_list_url, new_product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(response.data['name'], new_product_data['name'])
    #GET /products/{ID}/
    def test_retrieve_product(self):
        response = self.client.get(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data['price']), float(self.product_data['price']))
    #PUT /products/{ID}/
    def test_update_product(self):
        valid_categories = [choice[0] for choice in Product.ProductCategories.choices]
        valid_category = valid_categories[0]
        updated_data = {
            'name': self.fake.color_name() + " " + self.fake.word() + " Updated",
            'description': self.fake.paragraph(nb_sentences=2),
            'price': round(self.fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=0.50, max_value=10.00), 1),
            'category': valid_category,
            'quantity': self.product.quantity,
            'author': self.test_user.pk,
            'farm': self.farm.pk,
        }
        response = self.client.put(self.product_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(float(self.product.price), float(updated_data['price']))
    #PATCH /products/{ID}/
    def test_partial_update_product_price(self):
        """Test partial update using PATCH."""
        partial_data = {
            'price': round(1.01, 1)
        }
        response = self.client.patch(self.product_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(float(self.product.price), float(partial_data['price']))
    #DELETE /products/{ID}/
    def test_delete_product(self):
        response = self.client.delete(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)