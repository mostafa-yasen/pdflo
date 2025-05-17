FROM python:3.10-slim

WORKDIR /app

RUN pip install poetry --index-url=https://pypi.org/simple

COPY pyproject.toml poetry.lock* /app/

RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --without dev

RUN apt-get update && apt-get install -y curl

COPY . /app/

RUN mkdir -p staticfiles media uploads static

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
