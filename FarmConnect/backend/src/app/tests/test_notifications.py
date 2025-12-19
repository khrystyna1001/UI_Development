from app.tests.test import APITestCase
from rest_framework import status
from faker import Faker
from app.models import Notification
from app.serializer import NotificationSerializer

class NotificationViewSetTests(APITestCase):
    # GET /notifications/
    def test_list_notifications(self):
        response = self.client.get(self.notification_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['content'], self.notification_data['content'])

    # POST /notifications/
    def test_create_notification_success(self):
        new_notification_data = {
            'content': self.fake.text(max_nb_chars=200),
            'is_read': False,
        }
        response = self.client.post(self.notification_list_url, new_notification_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notification.objects.count(), 2)
        self.assertEqual(response.data['content'], new_notification_data['content'])

    # GET /notifications/{ID}/
    def test_retrieve_notification(self):
        response = self.client.get(self.notification_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], self.notification_data['content'])

    # PUT /notifications/{ID}/
    def test_update_notification(self):
        self.notification.refresh_from_db()
        
        updated_data = {
            'content': self.fake.text(max_nb_chars=200),
            'is_read': True,
        }
        response = self.client.put(self.notification_detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], updated_data['content'])
        self.assertEqual(response.data['is_read'], updated_data['is_read'])

    # PATCH /notifications/{ID}/
    def test_partial_update_notification(self):
        self.notification.refresh_from_db()
        
        partial_data = {
            'is_read': True,
        }
        response = self.client.patch(self.notification_detail_url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['is_read'], True)

    # DELETE /notifications/{ID}/
    def test_delete_notification(self):
        response = self.client.delete(self.notification_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Notification.objects.count(), 0)

    # POST /notifications/{ID}/mark_as_read/
    def test_mark_notification_as_read(self):
        self.notification.refresh_from_db()
        self.assertFalse(self.notification.is_read)
        
        response = self.client.post(f'{self.notification_detail_url}mark_as_read/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'Notification marked as read')
        
        self.notification.refresh_from_db()
        self.assertTrue(self.notification.is_read)

    # POST /notifications/mark_all_as_read/
    def test_mark_all_notifications_as_read(self):
        # Create another unread notification
        Notification.objects.create(
            recipient=self.test_user,
            content=self.fake.text(max_nb_chars=200),
            is_read=False
        )
        
        response = self.client.post('/app/notifications/mark_all_as_read/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'All notifications marked as read')
        
        # Verify all notifications are marked as read
        user_notifications = Notification.objects.filter(recipient=self.test_user)
        self.assertTrue(all(notification.is_read for notification in user_notifications))

    # Test queryset filtering - user can only see their own notifications
    def test_queryset_filtering(self):
        # Create notification for second user
        other_notification = Notification.objects.create(
            recipient=self.second_user,
            content=self.fake.text(max_nb_chars=200),
            is_read=False
        )
        
        response = self.client.get(self.notification_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.notification.id)
        
        # Verify other notification is not in response
        notification_ids = [n['id'] for n in response.data]
        self.assertNotIn(other_notification.id, notification_ids)

    # Test unauthorized access to other user's notification
    def test_unauthorized_notification_access(self):
        # Create notification for second user
        other_notification = Notification.objects.create(
            recipient=self.second_user,
            content=self.fake.text(max_nb_chars=200),
            is_read=False
        )
        
        # Try to access other user's notification
        other_notification_url = f'/app/notifications/{other_notification.id}/'
        response = self.client.get(other_notification_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Test ordering - newest first
    def test_notification_ordering(self):
        # Create a newer notification
        newer_notification = Notification.objects.create(
            recipient=self.test_user,
            content=self.fake.text(max_nb_chars=200),
            is_read=False
        )
        
        response = self.client.get(self.notification_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        # Newer notification should be first
        self.assertEqual(response.data[0]['id'], newer_notification.id)
        self.assertEqual(response.data[1]['id'], self.notification.id)
