from django.urls import path
from .views import RegisterView,CurrentUserView,MaintenanceStaffView


urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),
    path("me/", CurrentUserView.as_view(), name="current-user"),

    path(
    "staff/",
    MaintenanceStaffView.as_view(),
    name="maintenance-staff"
),
]