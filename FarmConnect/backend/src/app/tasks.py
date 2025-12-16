from src.main.celery import app
import time

@app.task(name='send_notification')
def send_notification(recipient_id: int, message: str):
    """
    Handles fast, user-facing tasks like sending an email,
    a push notification, or an in-app alert.
    """
    print(f"Processing notification for User ID {recipient_id}")
    time.sleep(0.5) 
    print(f"Notification SENT to User {recipient_id}: '{message}'")
    return f"Notification task complete for User {recipient_id}"


@app.task(name='process_heavy_data')
def process_heavy_data(file_url: str):
    """
    Handles time-consuming, backend-only tasks like video encoding,
    large file processing, or complex report generation.
    """
    print(f"STARTING heavy process for file: {file_url}")
    time.sleep(300) 
    print(f"COMPLETED heavy process for file: {file_url}")
    return "Heavy data processing finished."