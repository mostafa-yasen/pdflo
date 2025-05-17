import os
import sys

# Add the project root to the path so we can import from the backend package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Set up Django settings for tests
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "taskhub.settings")

import django

django.setup()
