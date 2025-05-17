from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint for tasks."""

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_context(self):
        """Add request to serializer context."""
        context = super().get_serializer_context()
        return context

    def create(self, request, *args, **kwargs):
        """Handle file upload and task creation."""

        # Check if file exists in request
        if "file" not in request.FILES:
            return Response(
                {"error": "No file was provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Check file type (should be PDF)
        uploaded_file = request.FILES["file"]
        if not uploaded_file.name.lower().endswith(".pdf"):
            return Response(
                {"error": "Only PDF files are accepted"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            # Create serializer with file and data
            serializer = self.get_serializer(
                data={
                    "description": request.data.get(
                        "description", "PDF Compression Task"
                    ),
                    "original_file": uploaded_file,
                }
            )

            if serializer.is_valid():
                task = serializer.save()

                # TODO: Send file to the compressor service

                task.refresh_from_db()
                return Response(
                    self.get_serializer(task).data, status=status.HTTP_201_CREATED
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
