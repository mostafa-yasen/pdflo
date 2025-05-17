from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model."""

    original_filename = serializers.ReadOnlyField()
    compressed_filename = serializers.ReadOnlyField()
    compressed_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "description",
            "status",
            "original_file",
            "original_filename",
            "compressed_file",
            "compressed_filename",
            "compressed_file_url",
            "created_at",
            "updated_at",
            "error_message",
        ]
        read_only_fields = [
            "id",
            "status",
            "compressed_file",
            "created_at",
            "updated_at",
            "error_message",
        ]

    def get_compressed_file_url(self, obj):
        """Generate URL for compressed file download."""
        if obj.compressed_file and obj.status == "completed":
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.compressed_file.url)
        return None
