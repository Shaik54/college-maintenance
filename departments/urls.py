from django.urls import path

from .views import (
    CategoryListView,
    LocationListView
)


urlpatterns = [

    path(
        "categories/",
        CategoryListView.as_view(),
        name="categories"
    ),

    path(
        "locations/",
        LocationListView.as_view(),
        name="locations"
    ),

]