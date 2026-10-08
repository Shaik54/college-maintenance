from django.contrib import admin
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "category",
        "location",
        "priority",
        "status",
        "created_by",
        "assigned_to",
        "created_at",
    )

    list_filter = (
        "status",
        "priority",
        "category",
    )

    search_fields = (
        "title",
        "description",
    )