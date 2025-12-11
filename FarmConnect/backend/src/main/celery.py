from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.main.settings')

app = Celery('main')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_connection_retry_on_startup = True

# Load task modules from all registered Django apps
app.autodiscover_tasks()

# This makes sure the connection is closed properly when the worker shuts down
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')