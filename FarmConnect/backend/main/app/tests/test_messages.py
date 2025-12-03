from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import Message
from app.serializer import MessageSerializer

class MessageViewSetTests(APITestCase):
    # GET /messages/
    def test_list_messages(self):
        response = self.client.get(self.message_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['content'], self.message_data['content'])
    # POST /messages/
    def test_create_message_success(self):
        new_message_data = {
            'chat': self.chat.pk,
            'sender': self.test_user.pk,
            'content': self.fake.text(max_nb_chars=150),
            'read': False,
        }
        response = self.client.post(self.message_list_url, new_message_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 2)
        self.assertEqual(response.data['content'], new_message_data['content'])
#     # POST /messages/ (Constraint Failure Test)
#     def test_create_message_self_fail(self):
#         bad_message_data = {
#             'sender': self.test_user.pk,
#             'receiver': self.test_user.pk, # Same user
#             'title': "Self message",
#             'content': self.fake.text(max_nb_chars=10),
#         }
#         response = self.client.post(self.message_list_url, bad_message_data, format='json')
#         # Expect 400 Bad Request due to model constraint violation
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(Message.objects.count(), 1)
    # GET /messages/{ID}/
    def test_retrieve_message(self):
        response = self.client.get(self.message_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['sender_info']['id'], self.test_user.pk)
        self.assertEqual(response.data['chat'], self.chat.pk)
    # PUT /messages/{ID}/
    def test_update_message(self):
        self.message.refresh_from_db()

        updated_data = {
            'chat': self.message.chat.pk,
            'sender': self.message.sender.pk,
            'content': "The content has been slightly updated.",
            'read': True,
        }
        response = self.client.put(self.message_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.message.refresh_from_db()
        self.assertTrue(self.message.read)
        self.assertEqual(self.message.content, updated_data['content'])
    # PATCH /messages/{ID}/
    def test_partial_update_message_read_status(self):
        partial_data = {
            'read': True
        }
        response = self.client.patch(self.message_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.message.refresh_from_db()
        self.assertTrue(self.message.read)
    # DELETE /messages/{ID}/
    def test_delete_message(self):
        response = self.client.delete(self.message_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Message.objects.count(), 0)