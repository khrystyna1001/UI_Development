from celery import shared_task
from django.contrib.auth import get_user_model

User = get_user_model()

@shared_task
def send_email(user_pk):
    try:
        user = User.objects.get(pk=user_pk)
        print(f"Sending email to {user.email}")
        return f"Email sent to {user.email}"
    except User.DoesNotExist:
        return f"User with pk={user_pk} does not exist"