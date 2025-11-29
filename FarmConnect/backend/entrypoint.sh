#!/bin/sh
echo "Running database setup (migrations and superuser creation)..."
uv run python main/manage.py makemigrations --noinput
uv run python main/manage.py migrate --noinput
# echo "admin" | uv run python main/manage.py createsuperuser --username 236523 --email admin@example.com --noinput || true
echo "Setup complete. Executing server command..."

exec "$@"