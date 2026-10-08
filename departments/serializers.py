from rest_framework import serializers
from .models import Category, Location


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = [
            "id",
            "name",
            "building",
            "floor",
            "room_number",
        ]