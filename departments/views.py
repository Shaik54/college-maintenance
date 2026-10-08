from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Category, Location
from .serializers import CategorySerializer, LocationSerializer


class CategoryListView(generics.ListAPIView):

    queryset = Category.objects.filter(
        is_active=True
    )

    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class LocationListView(generics.ListAPIView):

    queryset = Location.objects.filter(
        is_active=True
    )

    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]