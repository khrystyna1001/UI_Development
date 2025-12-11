from celery import shared_task
from django.core.cache import cache

@shared_task
def debug_task():
    cache.set('celery_test', 'Hello from Celery!', 60)
    value = cache.get('celery_test')
    print(f"Cache test: {value}")
    return "Task completed successfully!"

@shared_task
def add_numbers(x, y):
    return x + y