from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from kombu import Queue, Exchange
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.main.settings')

app = Celery('main')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.broker_connection_retry_on_startup = True

# Load task modules from all registered Django apps
app.autodiscover_tasks()

# Task and queue definition
app.conf.task_queues = (
    Queue('default', exchange=Exchange('default', type='direct'), routing_key='default'),
    Queue('short', exchange=Exchange('short', type='direct'), routing_key='short'),
    Queue('long', exchange=Exchange('long', type='direct'), routing_key='long'),
)
app.conf.task_default_queue = 'default'
app.conf.task_default_exchange = 'default'
app.conf.task_default_routing_key = 'default'