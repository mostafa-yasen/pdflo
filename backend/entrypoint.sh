#!/bin/bash

echo "Running migrations..."
python manage.py migrate --no-input

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Starting Gunicorn server..."
gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 taskhub.wsgi:application
