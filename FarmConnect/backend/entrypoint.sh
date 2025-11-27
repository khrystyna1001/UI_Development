#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

echo "Running database setup (migrations and superuser creation)..."
uv run python main/manage.py migrate --noinput
# echo "admin" | uv run python main/manage.py createsuperuser --username 236523 --email admin@example.com --noinput || true
echo "Setup complete. Executing server command..."

exec "$@"