from app.tests.test import APITestCase
from rest_framework import status
from app.models import Cart, CartItem, Product

class CartViewSetTests(APITestCase):
    # GET /cart/
    def test_list_cart(self):
        response = self.client.get(self.cart_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.cart.id)

    # GET /cart/{ID}/
    def test_retrieve_cart(self):
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.cart.id)

    # POST /cart/items/
    def test_add_item_to_cart(self):
        second_product = Product.objects.create(
            name='Test Product 2',
            description='Test Description 2',
            price=15.00,
            quantity=10,
        )
        second_product.farms.add(self.farm)

        
        new_item_data = {
            'product_id': second_product.id,
            'quantity': 2
        }
        response = self.client.post(self.cart_item_list_url, new_item_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CartItem.objects.count(), 2)

    # PATCH /cart/items/{ID}/
    def test_update_cart_item_quantity(self):
        updated_data = {
            'quantity': 5
        }
        response = self.client.patch(self.cart_item_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.cart_item.refresh_from_db()
        self.assertEqual(self.cart_item.quantity, 5)

    # DELETE /cart/items/{ID}/
    def test_remove_item_from_cart(self):
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CartItem.objects.count(), 0)

    def test_cart_total_calculation(self):
        CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=3
        )
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)