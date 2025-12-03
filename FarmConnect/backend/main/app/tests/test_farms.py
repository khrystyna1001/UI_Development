from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import Farm
from django.urls import reverse

class FarmViewSetTests(APITestCase):
    # GET /farms/
    def test_list_farms(self):
        response = self.client.get(self.farm_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.farm_data['name'])
    # POST /farms/
    def test_create_farm(self):
        new_farm_data = {
            'name': self.fake.company() + " Inc.",
            'location': self.fake.city() + ", " + self.fake.country(),
            'description': self.fake.paragraph(nb_sentences=3),
            'user': self.test_user.pk,
        }
        response = self.client.post(self.farm_list_url, new_farm_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Farm.objects.count(), 2)
        self.assertEqual(response.data['name'], new_farm_data['name'])
    # GET /farms/{ID}/
    def test_retrieve_farm(self):
        response = self.client.get(self.farm_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['location'], self.farm_data['location'])
    # PUT /farms/{ID}/
    def test_update_farm(self):
        self.farm.refresh_from_db()

        updated_data = {
            'name': self.farm.name + " (HQ)",
            'location': 'New York, USA',
            'description': self.farm.description,
            'user': self.test_user.pk,
        }

        response = self.client.put(self.farm_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.farm.refresh_from_db()
        self.assertEqual(self.farm.location, 'New York, USA')
    # PATCH /farms/{ID}/
    def test_partial_update_farm_description(self):
        new_description = "The updated primary description of the farm."
        partial_data = {
            'description': new_description
        }
        response = self.client.patch(self.farm_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.farm.refresh_from_db()
        self.assertEqual(self.farm.description, new_description)
    # DELETE /farms/{ID}/
    def test_delete_farm(self):
        response = self.client.delete(self.farm_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Farm.objects.count(), 0)