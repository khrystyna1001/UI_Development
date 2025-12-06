from app.tests.test import APITestCase
from app.models import Chat
from app.serializer import ChatSerializer
from rest_framework import status
from faker import Faker
from django.contrib.auth.models import User

class ChatViewSetTests(APITestCase):
    # GET /chats/
    def test_list_chats(self):
        response = self.client.get(self.chat_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user1']['id'], self.chat_data['user1'].pk)
    # POST /chats/
    def test_create_chat(self):
        third_user = User.objects.create_user(
            username=self.fake.user_name(),
            password=self.fake.password()
        )
        new_chat_data = {
            'user1': self.test_user.pk,
            'user2': third_user.pk,
        }
        response = self.client.post(self.chat_list_url, new_chat_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Chat.objects.count(), 2)
    # GET /chats/{ID}/
    def test_retrieve_chat(self):
        response = self.client.get(self.chat_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user1']['id'], self.chat_data['user1'].pk)
    # PUT /chats/{ID}/
    def test_update_chat(self):
        self.chat.refresh_from_db()
        updated_data = {
            'user1': self.test_user.pk,
            'user2': self.second_user.pk,
        }

        response = self.client.put(self.chat_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.chat.refresh_from_db()
        self.assertEqual(self.chat.user1.pk, updated_data['user1'])
        self.assertEqual(self.chat.user2.pk, updated_data['user2'])
    # PATCH /chats/{ID}/
    def test_partial_update_chat_user1(self):
        self.chat.refresh_from_db()
        partial_data = {
            'user1': self.test_user.pk,
        }
        response = self.client.patch(self.chat_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.chat.user1.pk, partial_data['user1'])
    # DELETE /chats/{ID}/
    def test_delete_chat(self):
        response = self.client.delete(self.chat_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Chat.objects.count(), 0)