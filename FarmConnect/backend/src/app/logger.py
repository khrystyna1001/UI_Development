import logging
from datetime import datetime
from django.db import transaction
from .models import LogEntry

class DatabaseLogHandler(logging.Handler):
    def emit(self, record):
        try:
            with transaction.atomic():
                log_entry = LogEntry(
                    level=record.levelname,
                    message=self.format(record),
                    module=record.module,
                    created_at=datetime.fromtimestamp(record.created)
                )
                log_entry.save()
        except Exception as e:
            print(f"Failed to save log to database: {e}")

def setup_logging():
    logger = logging.getLogger('farmconnect')
    logger.setLevel(logging.DEBUG)

    db_handler = DatabaseLogHandler()
    db_handler.setLevel(logging.INFO)

    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    db_handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(db_handler)

    return logger

logger = setup_logging()
