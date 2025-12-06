#!/bin/sh
export DJANGO_SETTINGS_MODULE='src.main.settings'
echo "Running database setup (migrations and superuser creation)..."
uv run python src/manage.py makemigrations
uv run python src/manage.py migrate --noinput
# echo "admin" | uv run python src/manage.py createsuperuser --username 236523 --email admin@example.com --noinput || true
echo "Setup complete. Executing server command..."

exec "$@"