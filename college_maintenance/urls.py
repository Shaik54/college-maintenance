from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # Django Admin
    path(
        "admin/",
        admin.site.urls
    ),

    # Complaint APIs
    path(
        "api/",
        include("complaints.urls")
    ),

    path(
    "api/departments/",
    include("departments.urls")
    ),

    # Authentication APIs
    path(
        "api/auth/login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "api/auth/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "api/auth/",
        include("accounts.urls")
    ),

    # Frontend pages + Dashboard APIs
    path(
        "",
        include("dashboard.urls")
    ),
]