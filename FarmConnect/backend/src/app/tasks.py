from src.main.celery import app
import time
from django.contrib.auth.models import User
from app.models import Notification

@app.task(name='send_notification')
def send_notification(recipient_id: int, message: str):
    """
    Saves a notification to the database so it can be picked up 
    by the frontend polling mechanism.
    """
    try:
        recipient = User.objects.get(id=recipient_id)
        
        Notification.objects.create(
            recipient=recipient,
            content=message
        )
        
        return f"Notification record created for User {recipient.username}"
    except User.DoesNotExist:
        return f"Failed: User ID {recipient_id} does not exist."
    except Exception as e:
        return f"Error creating notification: {str(e)}"


@app.task(name='process_heavy_data')
def process_heavy_data(user_id: int, product_ids: list):
    """
    Handles time-consuming tasks. After finishing, it 
    creates a notification to let the user know it's done.
    """
    print(f"STARTING heavy process for User {user_id}")
    
    time.sleep(10) 
    
    send_notification.delay(
        recipient_id=user_id, 
        message=f"Your heavy data processing for {len(product_ids)} items is complete!"
    )
    
    return "Heavy data processing finished."