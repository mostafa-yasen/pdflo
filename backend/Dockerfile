FROM python:3.10-slim

WORKDIR /app

RUN pip install poetry --index-url=https://pypi.org/simple

# Copy configuration files first
COPY pyproject.toml poetry.lock* /app/

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --without dev

# Make sure gunicorn is installed
# RUN pip install gunicorn

# Then copy the rest of the code
COPY . /app/

# Create directories for static files
RUN mkdir -p staticfiles static

RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Use full path to gunicorn or make sure it's in PATH
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "taskhub.wsgi:application"]
