# Pdflo

![CI](https://github.com/mostafa-yasen/pdflo/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/mostafa-yasen/pdflo/branch/main/graph/badge.svg)](https://codecov.io/gh/mostafa-yasen/pdflo)

Pdflo is a single-page web app designed for managing PDF Tasks.

## Prerequisites

Ensure you have the following installed on your system:

- **Python**: 3.10
- **Poetry**: 1.7.1

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mostafa-yasen/pdflo.git
cd pdflo
```

2. Install dependencies:
```bash
poetry install
```

3. Run the development server:
```bash
cd backend
poetry run python manage.py migrate
poetry run python manage.py runserver
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration. On each push or pull request to the main branch, the following checks run:

1. **Linting**: Code quality checks with Ruff, MyPy, Black, and isort
2. **Testing**: Running automated tests with pytest with 80% minimum coverage requirement
   - Test coverage is tracked with pytest-cov and reported to Codecov
   - CI will fail if code coverage falls below 80%
3. **Building**: Validating the Django project and ensuring migrations are up-to-date

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
