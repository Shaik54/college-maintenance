from rest_framework import serializers
from .models import Complaint


class ComplaintSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="category.department.name",
        read_only=True
    )

    location_name = serializers.CharField(
        source="location.name",
        read_only=True
    )

    class Meta:
        model = Complaint

        fields = [
            "id",
            "title",
            "description",

            "category",
            "category_name",

            "department_name",

            "location",
            "location_name",

            "priority",
            "status",
            "created_by",
            "assigned_to",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_by",
            "assigned_to",
            "created_at",
            "updated_at",
            "category_name",
            "department_name",
            "location_name",
        ]