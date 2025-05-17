import uuid

from django.db import models


class Task(models.Model):
    """Model representing a PDF compression task."""

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=255)
    original_file = models.FileField(upload_to="uploads/")
    compressed_file = models.FileField(upload_to="compressed/", null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    error_message = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.description} ({self.id})"

    @property
    def original_filename(self):
        return self.original_file.name.split("/")[-1]

    @property
    def compressed_filename(self):
        if self.compressed_file:
            return self.compressed_file.name.split("/")[-1]
        return None
