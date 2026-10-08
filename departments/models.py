from django.db import models


class Department(models.Model):

    name = models.CharField(max_length=100, unique=True)

    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Category(models.Model):

    name = models.CharField(max_length=100)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="categories"
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Location(models.Model):

    name = models.CharField(max_length=150)

    building = models.CharField(max_length=100)

    floor = models.CharField(max_length=50, blank=True)

    room_number = models.CharField(
        max_length=50,
        blank=True
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.building} - {self.name}"